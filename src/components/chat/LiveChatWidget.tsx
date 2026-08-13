import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Shield, Circle, CheckCheck, Minimize2, Sparkles, Mail } from 'lucide-react';
import {
  getOrCreateVisitorSession,
  saveVisitorUserInfo,
  getSessionMessages,
  sendChatMessage,
  markSessionAsRead,
  subscribeToChatUpdates,
  isAdminOnline,
  ChatMessage,
} from '../../lib/chatService';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [adminStatus, setAdminStatus] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sessionId, setSessionId] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session & load initial messages
  useEffect(() => {
    const sess = getOrCreateVisitorSession();
    setSessionId(sess.sessionId);
    setUserName(sess.userName !== 'Guest Visitor' ? sess.userName : '');
    setUserEmail(sess.userEmail || '');
    if (sess.userName !== 'Guest Visitor' && sess.userEmail) {
      setIsRegistered(true);
    }

    const checkAdmin = () => {
      setAdminStatus(isAdminOnline());
    };
    checkAdmin();
    const adminTimer = setInterval(checkAdmin, 3000);

    const loadMsgs = async () => {
      const history = await getSessionMessages(sess.sessionId);
      setMessages(history);

      // Count unread for user
      const unread = history.filter((m) => m.senderRole === 'admin' && !m.read).length;
      setUnreadCount(unread);
    };
    loadMsgs();

    const unsub = subscribeToChatUpdates(async (event) => {
      if (event.type === 'ADMIN_HEARTBEAT') {
        setAdminStatus(true);
      } else if (event.type === 'NEW_MESSAGE' && event.message) {
        if (event.message.sessionId === sess.sessionId) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === event.message!.id)) return prev;
            return [...prev, event.message!];
          });
          if (event.message.senderRole === 'admin') {
            setUnreadCount((c) => c + 1);
          }
        }
      }
    });

    // Interval poll backup for background sync
    const pollTimer = setInterval(async () => {
      const history = await getSessionMessages(sess.sessionId);
      setMessages(history);
    }, 4000);

    return () => {
      clearInterval(adminTimer);
      clearInterval(pollTimer);
      unsub();
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (unreadCount > 0 && sessionId) {
        markSessionAsRead(sessionId, 'user');
        setUnreadCount(0);
      }
    }
  }, [messages, isOpen, unreadCount, sessionId]);

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    saveVisitorUserInfo(userName.trim(), userEmail.trim());
    setIsRegistered(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionId) return;

    const currentText = inputText;
    setInputText('');

    const activeName = userName.trim() || 'Guest Visitor';
    const activeEmail = userEmail.trim() || undefined;

    // Send message from user
    const userMsg = await sendChatMessage(sessionId, currentText, 'user', activeName, activeEmail);
    setMessages((prev) => [...prev.filter((m) => m.id !== userMsg.id), userMsg]);

    // Check if admin is offline, send automated system acknowledgement if first message or offline
    const isOnline = isAdminOnline();
    if (!isOnline) {
      setTimeout(async () => {
        const offlineReply = await sendChatMessage(
          sessionId,
          `Hello ${activeName}! 👋 Thank you for messaging Napoleon Steadings. Our support admins are currently offline, but your message has been logged directly into our Admin Portal. We will reply to you as soon as an admin logs in!`,
          'admin',
          'Napoleon Support Bot',
          'support@napoleonsteadings.com'
        );
        setMessages((prev) => [...prev.filter((m) => m.id !== offlineReply.id), offlineReply]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Floating Chat Box Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[90vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#071910] border border-[#A3E635]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#04140C] via-[#0B2B1B] to-[#04140C] border-b border-[#A3E635]/20 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#1E5E3A] border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635] shadow-inner">
                  <Shield className="w-5 h-5" />
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#071910] ${
                    adminStatus ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  title={adminStatus ? 'Admin Online' : 'Admin Away'}
                />
              </div>
              <div>
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
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title="Minimize chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Registration step if no name */}
          {!isRegistered ? (
            <div className="flex-1 p-5 flex flex-col justify-center items-center text-center bg-[#071910]/80">
              <div className="w-12 h-12 rounded-full bg-[#1E5E3A]/40 border border-[#A3E635]/30 text-[#A3E635] flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Start Live Agriculture Chat</h4>
              <p className="text-xs text-emerald-200/80 mb-4 px-2">
                Have questions about our farms, produce orders, or investments? Introduce yourself to chat with our team.
              </p>

              <form onSubmit={handleStartChat} className="w-full space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-700"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email (Optional)"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-700"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] font-bold text-xs border border-[#A3E635]/40 transition-all shadow-md active:scale-95"
                >
                  Start Chatting
                </button>
              </form>
            </div>
          ) : (
            /* Messages list */
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#04140C]/50 text-xs">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-emerald-300/60 font-mono text-[11px]">
                  No messages yet. Type below to reach Napoleon Support!
                </div>
              ) : (
                messages.map((m) => {
                  const isUser = m.senderRole === 'user';
                  return (
                    <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] text-emerald-400/80 font-mono">
                          {isUser ? 'You' : m.senderName}
                        </span>
                        <span className="text-[9px] text-emerald-600">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div
                        className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-words shadow-sm ${
                          isUser
                            ? 'bg-[#1E5E3A] text-white rounded-br-none border border-[#A3E635]/30'
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

          {/* Footer Input */}
          {isRegistered && (
            <form onSubmit={handleSend} className="p-2.5 bg-[#04140C] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-700"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] disabled:opacity-40 text-[#A3E635] border border-[#A3E635]/40 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Floating Chat Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#1E5E3A] via-[#0B2B1B] to-[#1E5E3A] border-2 border-[#A3E635] text-[#A3E635] shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Open Napoleon Live Chat"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-[#A3E635]" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold border border-black animate-bounce">
              {unreadCount}
            </span>
          )}
        </div>

        <span className="font-bold text-xs tracking-wide text-white hidden sm:inline">
          Live Chat
        </span>

        {adminStatus && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        )}
      </button>
    </div>
  );
};
