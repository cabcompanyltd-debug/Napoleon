import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, User, Circle, CheckCheck, Clock, RefreshCw, Mail, Sparkles, Filter, Search } from 'lucide-react';
import {
  getAllChatSessions,
  getSessionMessages,
  sendChatMessage,
  markSessionAsRead,
  subscribeToChatUpdates,
  sendAdminHeartbeat,
  ChatSession,
  ChatMessage,
} from '../../lib/chatService';

export const AdminLiveChat: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [filterUnread, setFilterUnread] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Send admin presence heartbeat periodically
  useEffect(() => {
    sendAdminHeartbeat();
    const heartbeatTimer = setInterval(sendAdminHeartbeat, 5000);
    return () => clearInterval(heartbeatTimer);
  }, []);

  const loadSessions = async () => {
    const list = await getAllChatSessions();
    setSessions(list);
    setIsLoading(false);

    if (list.length > 0 && !selectedSessionId) {
      setSelectedSessionId(list[0].sessionId);
    }
  };

  useEffect(() => {
    loadSessions();

    const unsub = subscribeToChatUpdates((event) => {
      if (event.type === 'NEW_MESSAGE' && event.message) {
        setSessions((prev) => {
          const updated = [...prev];
          const idx = updated.findIndex((s) => s.sessionId === event.message!.sessionId);
          if (idx >= 0) {
            updated[idx].lastMessage = event.message!.message;
            updated[idx].lastMessageTime = event.message!.timestamp;
            if (event.message!.senderRole === 'user') {
              updated[idx].unreadForAdmin += 1;
            }
          } else {
            // New session
            updated.unshift({
              sessionId: event.message!.sessionId,
              userName: event.message!.senderName || 'Visitor',
              userEmail: event.message!.senderEmail || '',
              lastMessage: event.message!.message,
              lastMessageTime: event.message!.timestamp,
              unreadForAdmin: event.message!.senderRole === 'user' ? 1 : 0,
              unreadForUser: 0,
              status: 'active',
            });
          }
          return updated.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
        });

        if (event.message.sessionId === selectedSessionId) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === event.message!.id)) return prev;
            return [...prev, event.message!];
          });
        }
      }
    });

    const pollTimer = setInterval(loadSessions, 4000);

    return () => {
      unsub();
      clearInterval(pollTimer);
    };
  }, [selectedSessionId]);

  // Load messages when selected session changes
  useEffect(() => {
    if (!selectedSessionId) return;

    const loadMsgs = async () => {
      const msgs = await getSessionMessages(selectedSessionId);
      setMessages(msgs);
      await markSessionAsRead(selectedSessionId, 'admin');

      // Clear unread count locally
      setSessions((prev) =>
        prev.map((s) => (s.sessionId === selectedSessionId ? { ...s, unreadForAdmin: 0 } : s))
      );
    };
    loadMsgs();
  }, [selectedSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSessionId) return;

    const textToSend = replyText;
    setReplyText('');

    const newMsg = await sendChatMessage(
      selectedSessionId,
      textToSend,
      'admin',
      'Napoleon Admin',
      'admin@napoleonsteadings.com'
    );

    setMessages((prev) => [...prev.filter((m) => m.id !== newMsg.id), newMsg]);

    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === selectedSessionId
          ? { ...s, lastMessage: newMsg.message, lastMessageTime: newMsg.timestamp }
          : s
      )
    );
  };

  const selectedSession = sessions.find((s) => s.sessionId === selectedSessionId);

  const filteredSessions = sessions.filter((s) => {
    if (filterUnread && s.unreadForAdmin === 0) return false;
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      return (
        s.userName.toLowerCase().includes(query) ||
        (s.userEmail && s.userEmail.toLowerCase().includes(query)) ||
        s.lastMessage.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#071910] border border-[#A3E635]/25 rounded-2xl overflow-hidden shadow-2xl text-white min-h-[600px] flex flex-col md:flex-row">
      {/* Sidebar: Session List */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-[#04140C] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#A3E635]" />
              <span>Visitor Live Chats</span>
            </h3>

            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
              <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 animate-pulse" />
              <span>You: Online</span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-emerald-600" />
              <input
                type="text"
                placeholder="Search visitor or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-800"
              />
            </div>
            <button
              onClick={() => setFilterUnread(!filterUnread)}
              className={`p-1.5 rounded-xl border transition-colors ${
                filterUnread
                  ? 'bg-[#1E5E3A] border-[#A3E635] text-[#A3E635]'
                  : 'bg-black/30 border-white/10 text-emerald-400 hover:text-white'
              }`}
              title={filterUnread ? 'Showing Unread Only' : 'Filter Unread'}
            >
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-emerald-400/60 font-mono">Loading sessions...</div>
          ) : filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-xs text-emerald-400/60 font-mono">
              {searchTerm || filterUnread ? 'No matching chats found.' : 'No active chats yet.'}
            </div>
          ) : (
            filteredSessions.map((s) => {
              const isSelected = s.sessionId === selectedSessionId;
              return (
                <button
                  key={s.sessionId}
                  onClick={() => setSelectedSessionId(s.sessionId)}
                  className={`w-full text-left p-3.5 transition-all flex items-start gap-3 hover:bg-white/5 ${
                    isSelected ? 'bg-[#1E5E3A]/40 border-l-4 border-[#A3E635]' : ''
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0B2B1B] border border-[#A3E635]/30 text-[#A3E635] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {s.userName.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs text-white truncate">{s.userName}</span>
                      <span className="text-[10px] text-emerald-500 shrink-0">
                        {new Date(s.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {s.userEmail && <p className="text-[10px] text-emerald-400/70 truncate">{s.userEmail}</p>}

                    <p className="text-xs text-emerald-200/60 truncate mt-1">{s.lastMessage}</p>
                  </div>

                  {s.unreadForAdmin > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold shrink-0">
                      {s.unreadForAdmin}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Conversation View */}
      <div className="flex-1 flex flex-col bg-[#071910]">
        {selectedSession ? (
          <>
            {/* Session Header */}
            <div className="p-4 bg-[#04140C] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center font-bold text-sm">
                  {selectedSession.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    {selectedSession.userName}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                      ID: {selectedSession.sessionId.substring(0, 10)}
                    </span>
                  </h4>
                  {selectedSession.userEmail ? (
                    <div className="flex items-center gap-1 text-xs text-emerald-300">
                      <Mail className="w-3 h-3 text-[#A3E635]" />
                      <span>{selectedSession.userEmail}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-emerald-500">Guest Visitor</span>
                  )}
                </div>
              </div>

              <button
                onClick={loadSessions}
                className="p-2 rounded-xl bg-black/40 hover:bg-white/10 text-emerald-300 border border-white/10 transition-colors"
                title="Refresh conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#04140C]/30 text-xs">
              {messages.map((m) => {
                const isAdmin = m.senderRole === 'admin';
                return (
                  <div key={m.id} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-mono text-emerald-400/80">
                        {isAdmin ? 'You (Admin)' : m.senderName}
                      </span>
                      <span className="text-[9px] text-emerald-600">
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed break-words shadow-sm ${
                        isAdmin
                          ? 'bg-[#1E5E3A] text-white rounded-br-none border border-[#A3E635]/40'
                          : 'bg-[#0B2B1B] text-emerald-100 rounded-bl-none border border-emerald-500/30'
                      }`}
                    >
                      {m.message}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Bar */}
            <form onSubmit={handleSendReply} className="p-3 bg-[#04140C] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Reply to ${selectedSession.userName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-700"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] disabled:opacity-40 text-[#A3E635] font-bold text-xs border border-[#A3E635]/40 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Reply</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center text-emerald-400/60 font-mono text-xs">
            Select a visitor conversation from the left sidebar to start live chatting.
          </div>
        )}
      </div>
    </div>
  );
};
