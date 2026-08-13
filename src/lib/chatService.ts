import { insforge } from './insforge';

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderRole: 'user' | 'admin';
  senderName: string;
  senderEmail?: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatSession {
  sessionId: string;
  userName: string;
  userEmail?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadForAdmin: number;
  unreadForUser: number;
  status: 'active' | 'resolved';
  userOnline?: boolean;
}

const STORAGE_KEYS = {
  CHAT_SESSION_ID: 'napoleon_chat_session_id',
  CHAT_USER_INFO: 'napoleon_chat_user_info',
  LOCAL_MESSAGES: 'napoleon_chat_messages_v2',
  LOCAL_SESSIONS: 'napoleon_chat_sessions_v2',
  ADMIN_HEARTBEAT: 'napoleon_admin_heartbeat',
};

// Create a BroadcastChannel for instant multi-tab sync
let chatChannel: BroadcastChannel | null = null;
try {
  chatChannel = new BroadcastChannel('napoleon_live_chat');
} catch (e) {
  // Fallback if BroadcastChannel not supported
}

export const getOrCreateVisitorSession = (): { sessionId: string; userName: string; userEmail: string } => {
  let sessionId = localStorage.getItem(STORAGE_KEYS.CHAT_SESSION_ID);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    localStorage.setItem(STORAGE_KEYS.CHAT_SESSION_ID, sessionId);
  }

  let userInfoStr = localStorage.getItem(STORAGE_KEYS.CHAT_USER_INFO);
  let userName = 'Guest Visitor';
  let userEmail = '';

  if (userInfoStr) {
    try {
      const parsed = JSON.parse(userInfoStr);
      userName = parsed.userName || userName;
      userEmail = parsed.userEmail || userEmail;
    } catch {}
  }

  return { sessionId, userName, userEmail };
};

export const saveVisitorUserInfo = (userName: string, userEmail: string) => {
  localStorage.setItem(STORAGE_KEYS.CHAT_USER_INFO, JSON.stringify({ userName, userEmail }));
};

// Admin presence heartbeat
export const sendAdminHeartbeat = () => {
  const now = Date.now();
  localStorage.setItem(STORAGE_KEYS.ADMIN_HEARTBEAT, now.toString());
  if (chatChannel) {
    chatChannel.postMessage({ type: 'ADMIN_HEARTBEAT', timestamp: now });
  }
};

export const isAdminOnline = (): boolean => {
  const lastHeartbeat = localStorage.getItem(STORAGE_KEYS.ADMIN_HEARTBEAT);
  if (!lastHeartbeat) return false;
  const elapsed = Date.now() - parseInt(lastHeartbeat, 10);
  return elapsed < 12000; // Active within last 12 seconds
};

// Helper to get local fallback messages
const getLocalMessages = (): ChatMessage[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCAL_MESSAGES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalMessages = (messages: ChatMessage[]) => {
  localStorage.setItem(STORAGE_KEYS.LOCAL_MESSAGES, JSON.stringify(messages));
};

// Fetch messages for a specific session
export const getSessionMessages = async (sessionId: string): Promise<ChatMessage[]> => {
  try {
    const { data, error } = await insforge.database
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped: ChatMessage[] = data.map((item: any) => ({
        id: item.id,
        sessionId: item.session_id,
        senderRole: item.sender_role,
        senderName: item.sender_name,
        senderEmail: item.sender_email,
        message: item.message,
        timestamp: item.created_at || item.timestamp,
        read: item.read || false,
      }));
      // Sync local cache
      const allLocal = getLocalMessages().filter((m) => m.sessionId !== sessionId);
      saveLocalMessages([...allLocal, ...mapped]);
      return mapped;
    }
  } catch (err) {
    console.warn('InsForge fetch chat_messages failed, using local cache:', err);
  }

  // Fallback to local
  return getLocalMessages().filter((m) => m.sessionId === sessionId);
};

// Fetch all active chat sessions for Admin
export const getAllChatSessions = async (): Promise<ChatSession[]> => {
  let allMessages: ChatMessage[] = [];

  try {
    const { data, error } = await insforge.database
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      allMessages = data.map((item: any) => ({
        id: item.id,
        sessionId: item.session_id,
        senderRole: item.sender_role,
        senderName: item.sender_name,
        senderEmail: item.sender_email,
        message: item.message,
        timestamp: item.created_at || item.timestamp,
        read: item.read || false,
      }));
      saveLocalMessages(allMessages);
    } else {
      allMessages = getLocalMessages();
    }
  } catch {
    allMessages = getLocalMessages();
  }

  // Group by session ID
  const sessionMap = new Map<string, ChatSession>();

  allMessages.forEach((msg) => {
    let session = sessionMap.get(msg.sessionId);
    if (!session) {
      session = {
        sessionId: msg.sessionId,
        userName: msg.senderRole === 'user' ? msg.senderName : 'Visitor',
        userEmail: msg.senderEmail || '',
        lastMessage: msg.message,
        lastMessageTime: msg.timestamp,
        unreadForAdmin: 0,
        unreadForUser: 0,
        status: 'active',
      };
      sessionMap.set(msg.sessionId, session);
    }

    if (msg.senderRole === 'user' && msg.senderName && msg.senderName !== 'Guest Visitor') {
      session.userName = msg.senderName;
    }
    if (msg.senderEmail) {
      session.userEmail = msg.senderEmail;
    }

    session.lastMessage = msg.message;
    session.lastMessageTime = msg.timestamp;

    if (!msg.read) {
      if (msg.senderRole === 'user') {
        session.unreadForAdmin += 1;
      } else {
        session.unreadForUser += 1;
      }
    }
  });

  return Array.from(sessionMap.values()).sort(
    (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
  );
};

// Send a chat message
export const sendChatMessage = async (
  sessionId: string,
  messageText: string,
  senderRole: 'user' | 'admin',
  senderName: string,
  senderEmail?: string
): Promise<ChatMessage> => {
  const newMsg: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    sessionId,
    senderRole,
    senderName,
    senderEmail,
    message: messageText.trim(),
    timestamp: new Date().toISOString(),
    read: false,
  };

  // 1. Save to Local Cache
  const currentLocal = getLocalMessages();
  saveLocalMessages([...currentLocal, newMsg]);

  // 2. Broadcast multi-tab event
  if (chatChannel) {
    chatChannel.postMessage({ type: 'NEW_MESSAGE', message: newMsg });
  }
  window.dispatchEvent(new CustomEvent('napoleon-new-chat-message', { detail: newMsg }));

  // 3. Try InsForge database insert
  try {
    await insforge.database.from('chat_messages').upsert([{
      id: newMsg.id,
      session_id: newMsg.sessionId,
      sender_role: newMsg.senderRole,
      sender_name: newMsg.senderName,
      sender_email: newMsg.senderEmail,
      message: newMsg.message,
      read: newMsg.read,
      created_at: newMsg.timestamp,
    }]);
  } catch (err) {
    console.warn('InsForge save chat_message failed, saved locally:', err);
  }

  return newMsg;
};

// Mark session messages as read
export const markSessionAsRead = async (sessionId: string, roleReading: 'admin' | 'user') => {
  const local = getLocalMessages();
  const updated = local.map((m) => {
    if (m.sessionId === sessionId && m.senderRole !== roleReading) {
      return { ...m, read: true };
    }
    return m;
  });
  saveLocalMessages(updated);

  try {
    const roleToMark = roleReading === 'admin' ? 'user' : 'admin';
    await insforge.database
      .from('chat_messages')
      .update({ read: true })
      .eq('session_id', sessionId)
      .eq('sender_role', roleToMark);
  } catch {}

  if (chatChannel) {
    chatChannel.postMessage({ type: 'MESSAGES_READ', sessionId, roleReading });
  }
};

// Subscribe to chat updates
export const subscribeToChatUpdates = (callback: (data: { type: string; message?: ChatMessage }) => void) => {
  const handleBroadcast = (event: MessageEvent) => {
    if (event.data) {
      callback(event.data);
    }
  };

  const handleCustomEvent = (event: Event) => {
    const custom = event as CustomEvent;
    if (custom.detail) {
      callback({ type: 'NEW_MESSAGE', message: custom.detail });
    }
  };

  if (chatChannel) {
    chatChannel.addEventListener('message', handleBroadcast);
  }
  window.addEventListener('napoleon-new-chat-message', handleCustomEvent);

  return () => {
    if (chatChannel) {
      chatChannel.removeEventListener('message', handleBroadcast);
    }
    window.removeEventListener('napoleon-new-chat-message', handleCustomEvent);
  };
};
