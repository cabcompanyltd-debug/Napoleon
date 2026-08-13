import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Shield, Circle, Minimize2, Sparkles, Trash2, LogOut, User } from 'lucide-react';
import {
  getOrCreateVisitorSession,
  saveVisitorUserInfo,
  getSessionMessages,
  sendChatMessage,
  markSessionAsRead,
  subscribeToChatUpdates,
  deleteChatSession,
  isAdminOnline,
  sendAdminHeartbeat,
  ChatMessage,
} from '../../lib/chatService';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Visitor Mode State
  const [visitorSessionId, setVisitorSessionId] = useState('');
  const [visitorMessages, setVisitorMessages] = useState<ChatMessage[]>([]);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [isVisitorRegistered, setIsVisitorRegistered] = useState(false);
  const [visitorUnreadCount, setVisitorUnreadCount] = useState(0);

  // Admin Mode State (When triggered from Admin Dashboard)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminActiveSessionId, setAdminActiveSessionId] = useState<string | null>(null);
  const [adminActiveUserName, setAdminActiveUserName] = useState('');
  const [adminActiveUserEmail, setAdminActiveUserEmail] = useState('');
  const [adminMessages, setAdminMessages] = useState<ChatMessage[]>([]);

  // Common State
  const [inputText, setInputText] = useState('');
  const [adminStatus, setAdminStatus] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Visitor Session
  useEffect(() => {
    const sess = getOrCreateVisitorSession();
    setVisitorSessionId(sess.sessionId);
    setVisitorName(sess.userName !== 'Guest Visitor' ? sess.userName : '');
    setVisitorEmail(sess.userEmail || '');
    if (sess.userName !== 'Guest Visitor' && sess.userEmail) {
      setIsVisitorRegistered(true);
    }

    const checkAdmin = () => {
      setAdminStatus(isAdminOnline());
    };
    checkAdmin();
    const adminTimer = setInterval(checkAdmin, 3000);

    const loadVisitorMsgs = async () => {
      const history = await getSessionMessages(sess.sessionId);
      setVisitorMessages(history);

      const unread = history.filter((m) => m.senderRole === 'admin' && !m.read).length;
      setVisitorUnreadCount(unread);
    };
    loadVisitorMsgs();

    // Listen for custom trigger from Admin Dashboard
    const handleOpenAdminChatSession = async (e: Event) => {
      const custom = e as CustomEvent;
      const { sessionId, userName, userEmail } = custom.detail || {};
      if (sessionId) {
        // Send heartbeat so system marks admin online
        sendAdminHeartbeat();

        setAdminActiveSessionId(sessionId);
        setAdminActiveUserName(userName || 'Visitor');
        setAdminActiveUserEmail(userEmail || '');
        setIsAdminMode(true);
        setIsOpen(true);

        const msgs = await getSessionMessages(sessionId);
        setAdminMessages(msgs);
        await markSessionAsRead(sessionId, 'admin');
      }
    };

    window.addEventListener('open-admin-chat-session', handleOpenAdminChatSession);

    const unsub = subscribeToChatUpdates(async (event) => {
      if (event.type === 'ADMIN_HEARTBEAT') {
        setAdminStatus(true);
      } else if (event.type === 'NEW_MESSAGE' && event.message) {
        const msg = event.message;

        // Visitor session update
        if (msg.sessionId === sess.sessionId) {
          setVisitorMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
          if (msg.senderRole === 'admin') {
            setVisitorUnreadCount((c) => c + 1);
          }
        }

        // Admin mode session update
        if (msg.sessionId === adminActiveSessionId) {
          setAdminMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
          markSessionAsRead(msg.sessionId, 'admin');
        }
      } else if (event.type === 'SESSION_DELETED' && event.sessionId) {
        if (event.sessionId === adminActiveSessionId) {
          setIsAdminMode(false);
          setAdminActiveSessionId(null);
          setAdminMessages([]);
        }
      }
    });

    const pollTimer = setInterval(async () => {
      if (sess.sessionId) {
        const history = await getSessionMessages(sess.sessionId);
        setVisitorMessages(history);
      }
      if (adminActiveSessionId) {
        const adminMsgs = await getSessionMessages(adminActiveSessionId);
        setAdminMessages(adminMsgs);
      }
    }, 4000);

    return () => {
      clearInterval(adminTimer);
      clearInterval(pollTimer);
      window.removeEventListener('open-admin-chat-session', handleOpenAdminChatSession);
      unsub();
    };
  }, [adminActiveSessionId]);

  // Load messages when admin active session changes
  useEffect(() => {
    if (!adminActiveSessionId) return;
    const loadAdminMsgs = async () => {
      const msgs = await getSessionMessages(adminActiveSessionId);
      setAdminMessages(msgs);
      await markSessionAsRead(adminActiveSessionId, 'admin');
    };
    loadAdminMsgs();
  }, [adminActiveSessionId]);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (!isAdminMode && visitorUnreadCount > 0 && visitorSessionId) {
        markSessionAsRead(visitorSessionId, 'user');
        setVisitorUnreadCount(0);
      }
    }
  }, [isOpen, visitorMessages, adminMessages, isAdminMode, visitorUnreadCount, visitorSessionId]);

  const handleVisitorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;
    saveVisitorUserInfo(visitorName.trim(), visitorEmail.trim());
    setIsVisitorRegistered(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText('');

    if (isAdminMode && adminActiveSessionId) {
      // Send as Admin
      sendAdminHeartbeat();
      const newMsg = await sendChatMessage(
        adminActiveSessionId,
        textToSend,
        'admin',
        'Napoleon Admin',
        'admin@napoleonsteadings.com'
      );
      setAdminMessages((prev) => [...prev.filter((m) => m.id !== newMsg.id), newMsg]);
    } else if (visitorSessionId) {
      // Send as Visitor
      const activeName = visitorName.trim() || 'Guest Visitor';
      const activeEmail = visitorEmail.trim() || undefined;

      const userMsg = await sendChatMessage(visitorSessionId, textToSend, 'user', activeName, activeEmail);
      setVisitorMessages((prev) => [...prev.filter((m) => m.id !== userMsg.id), userMsg]);

      // Offline bot reply if admin is offline
      const isOnline = isAdminOnline();
      if (!isOnline) {
        setTimeout(async () => {
          const offlineReply = await sendChatMessage(
            visitorSessionId,
            `Hello ${activeName}! 👋 Thank you for messaging Napoleon Steadings. Our support team is currently offline, but your message has been logged directly into our Admin Portal. We will reply to you as soon as an admin logs in!`,
            'admin',
            'Napoleon Support Bot',
            'support@napoleonsteadings.com'
          );
          setVisitorMessages((prev) => [...prev.filter((m) => m.id !== offlineReply.id), offlineReply]);
        }, 1000);
      }
    }
  };

  const handleConfirmDeleteSession = async () => {
    if (!adminActiveSessionId) return;
    const targetId = adminActiveSessionId;
    setShowDeleteModal(false);
    setIsAdminMode(false);
    setAdminActiveSessionId(null);
    setAdminMessages([]);

    await deleteChatSession(targetId);
  };

  const handleExitAdminMode = () => {
    setIsAdminMode(false);
    setAdminActiveSessionId(null);
    setAdminMessages([]);
  };

  const activeMessages = isAdminMode ? adminMessages : visitorMessages;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* FLOATING CHAT BOX WINDOW */}
      {isOpen && (
        <div className="pointer-events-auto w-[90vw] sm:w-[400px] h-[540px] max-h-[82vh] bg-[#071910] border border-[#A3E635]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#04140C] via-[#0B2B1B] to-[#04140C] border-b border-[#A3E635]/30 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm shadow-inner ${
                    isAdminMode
                      ? 'bg-[#1E5E3A] border-[#A3E635] text-[#A3E635]'
                      : 'bg-[#1E5E3A] border-[#A3E635]/40 text-[#A3E635]'
                  }`}
                >
                  {isAdminMode ? <Shield className="w-5 h-5 text-[#A3E635]" /> : <User className="w-5 h-5" />}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#071910] ${
                    isAdminMode ? 'bg-[#A3E635]' : adminStatus ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
              </div>

              <div>
                {isAdminMode ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#A3E635] text-[#0B2B1B] text-[10px] font-extrabold uppercase">
                        Admin Mode
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                    </div>
                    <h3 className="text-xs font-bold text-white truncate max-w-[180px] mt-0.5">
                      Chatting with {adminActiveUserName}
                    </h3>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Napoleon Support
                      <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Circle
                        className={`w-2 h-2 fill-current ${
                          adminStatus ? 'text-emerald-400 animate-pulse' : 'text-amber-400'
                        }`}
                      />
                      <span className={adminStatus ? 'text-emerald-300 font-medium' : 'text-amber-200/80'}>
                        {adminStatus ? 'Admin Live Online' : 'Leave a message (Support Offline)'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              {isAdminMode && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-400 hover:bg-red-900 transition-colors cursor-pointer"
                    title="Delete this chat session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleExitAdminMode}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white transition-colors cursor-pointer"
                    title="Exit Admin Chat"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                title="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VISITOR REGISTRATION STEP IF NOT REGISTERED */}
          {!isAdminMode && !isVisitorRegistered ? (
            <div className="flex-1 p-5 flex flex-col justify-center items-center text-center bg-[#071910]/80">
              <div className="w-12 h-12 rounded-full bg-[#1E5E3A]/40 border border-[#A3E635]/30 text-[#A3E635] flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Start Live Agriculture Chat</h4>
              <p className="text-xs text-emerald-200/80 mb-4 px-2">
                Have questions about our farms, produce orders, or investments? Introduce yourself to chat with our team.
              </p>

              <form onSubmit={handleVisitorRegister} className="w-full space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-700"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email (Optional)"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-700"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] font-bold text-xs border border-[#A3E635]/40 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Start Chatting
                </button>
              </form>
            </div>
          ) : (
            /* CONVERSATION MESSAGES LIST */
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#04140C]/50 text-xs">
              {activeMessages.length === 0 ? (
                <div className="text-center py-12 text-emerald-300/60 font-mono text-[11px]">
                  {isAdminMode
                    ? `No messages in this chat session yet. Type below to message ${adminActiveUserName}.`
                    : 'No messages yet. Type below to reach Napoleon Support!'}
                </div>
              ) : (
                activeMessages.map((m) => {
                  const isSentByMe = isAdminMode ? m.senderRole === 'admin' : m.senderRole === 'user';
                  return (
                    <div key={m.id} className={`flex flex-col ${isSentByMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] text-emerald-400/80 font-mono">
                          {isSentByMe ? (isAdminMode ? 'You (Admin)' : 'You') : m.senderName}
                        </span>
                        <span className="text-[9px] text-emerald-600">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed break-words shadow-sm ${
                          isSentByMe
                            ? 'bg-[#1E5E3A] text-white rounded-br-none border border-[#A3E635]/40'
                            : 'bg-[#0B2B1B] text-emerald-100 rounded-bl-none border border-emerald-500/30'
                        }`}
                      >
                        {m.message}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* FOOTER INPUT */}
          {(isAdminMode || isVisitorRegistered) && (
            <form onSubmit={handleSend} className="p-2.5 bg-[#04140C] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder={isAdminMode ? `Reply to ${adminActiveUserName}...` : 'Type your message...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-700"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-3.5 py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] disabled:opacity-40 text-[#A3E635] border border-[#A3E635]/40 transition-all active:scale-95 cursor-pointer flex items-center gap-1 font-bold text-xs"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* FLOATING CHAT LAUNCHER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#1E5E3A] via-[#0B2B1B] to-[#1E5E3A] border-2 border-[#A3E635] text-[#A3E635] shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Open Live Chat"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-[#A3E635]" />
          {!isAdminMode && visitorUnreadCount > 0 && (
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold border border-black animate-bounce">
              {visitorUnreadCount}
            </span>
          )}
        </div>

        <span className="font-bold text-xs tracking-wide text-white hidden sm:inline">
          {isAdminMode ? `Admin Chat (${adminActiveUserName})` : 'Live Chat'}
        </span>

        {adminStatus && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        )}
      </button>

      {/* CUSTOM DELETE CONFIRMATION MODAL INSIDE WIDGET */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 pointer-events-auto">
          <div className="bg-[#0A2216] border border-red-500/50 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative overflow-hidden text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-950 text-red-400 border border-red-500/40 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Delete Visitor Chat</h3>
                <p className="text-xs text-red-200/80">InsForge Chat Action</p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/10">
              Are you sure you want to permanently delete chat session with <strong className="text-white">"{adminActiveUserName}"</strong>? All messages in this conversation will be permanently removed.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteSession}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 transition-transform active:scale-95 cursor-pointer"
              >
                Yes, Delete Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
