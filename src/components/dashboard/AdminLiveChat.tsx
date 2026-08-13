import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  CheckCheck,
  Circle,
  Mail,
  User,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Clock,
  AlertCircle
} from 'lucide-react';
import {
  getAllChatSessions,
  markSessionAsRead,
  deleteChatSession,
  subscribeToChatUpdates,
  sendAdminHeartbeat,
  ChatSession,
} from '../../lib/chatService';

export const AdminLiveChat: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalSession, setDeleteModalSession] = useState<ChatSession | null>(null);

  // Keep admin presence heartbeat active
  useEffect(() => {
    sendAdminHeartbeat();
    const heartbeatTimer = setInterval(sendAdminHeartbeat, 5000);
    return () => clearInterval(heartbeatTimer);
  }, []);

  const loadSessions = async () => {
    const list = await getAllChatSessions();
    setSessions(list);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSessions();

    const unsub = subscribeToChatUpdates((event) => {
      if (event.type === 'NEW_MESSAGE' || event.type === 'SESSION_DELETED') {
        loadSessions();
      }
    });

    const pollTimer = setInterval(loadSessions, 4000);

    return () => {
      unsub();
      clearInterval(pollTimer);
    };
  }, []);

  const handleOpenChatBox = (session: ChatSession) => {
    // Send heartbeat so admin status is verified
    sendAdminHeartbeat();

    // Mark as read
    markSessionAsRead(session.sessionId, 'admin');

    // Trigger floating chat box at the bottom-right
    window.dispatchEvent(
      new CustomEvent('open-admin-chat-session', {
        detail: {
          sessionId: session.sessionId,
          userName: session.userName,
          userEmail: session.userEmail,
        },
      })
    );
  };

  const handleMarkAsRead = async (sessionId: string) => {
    await markSessionAsRead(sessionId, 'admin');
    setSessions((prev) =>
      prev.map((s) => (s.sessionId === sessionId ? { ...s, unreadForAdmin: 0 } : s))
    );
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalSession) return;
    const targetId = deleteModalSession.sessionId;
    setDeleteModalSession(null);

    await deleteChatSession(targetId);
    await loadSessions();
  };

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

  const totalUnread = sessions.reduce((acc, curr) => acc + curr.unreadForAdmin, 0);

  return (
    <div className="space-y-6 text-white font-sans">
      {/* HEADER METRICS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#04140C] border border-[#A3E635]/30 flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400">Total Conversations</span>
            <h3 className="text-2xl font-black text-white">{sessions.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A]/40 border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#04140C] border border-[#A3E635]/30 flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400">Unread Visitor Messages</span>
            <h3 className="text-2xl font-black text-white">{totalUnread}</h3>
          </div>
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${totalUnread > 0 ? 'bg-red-950/80 border-red-500 text-red-400 animate-pulse' : 'bg-[#1E5E3A]/40 border-[#A3E635]/40 text-[#A3E635]'}`}>
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#04140C] border border-[#A3E635]/30 flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400">Your Live Status</span>
            <div className="flex items-center gap-2 pt-1">
              <Circle className="w-3 h-3 fill-emerald-400 text-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-emerald-300">Admin Online</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A]/40 border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-[#04140C] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-emerald-600" />
          <input
            type="text"
            placeholder="Search visitor name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-[#A3E635] text-white text-xs outline-none placeholder:text-emerald-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setFilterUnread(!filterUnread)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              filterUnread
                ? 'bg-[#1E5E3A] border-[#A3E635] text-[#A3E635]'
                : 'bg-black/30 border-white/10 text-emerald-300 hover:text-white'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>{filterUnread ? 'Showing Unread Only' : 'All Conversations'}</span>
          </button>

          <button
            onClick={loadSessions}
            className="p-2 rounded-xl bg-black/40 hover:bg-white/10 border border-white/10 text-emerald-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VISITOR CONVERSATIONS LIST */}
      <div className="bg-[#071910] border border-[#A3E635]/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#04140C] border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#A3E635]" />
            <span>Visitor Message Records ({filteredSessions.length})</span>
          </h3>
          <p className="text-xs text-emerald-300/80 hidden sm:block">
            Click <strong className="text-[#A3E635]">"Chat with Visitor"</strong> to open the live bottom-right chat box for any person.
          </p>
        </div>

        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-emerald-400/60 font-mono">Loading visitor chats...</div>
          ) : filteredSessions.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-emerald-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-xs text-emerald-400/70 font-mono">
                {searchTerm || filterUnread ? 'No matching visitor messages found.' : 'No active visitor conversations logged yet.'}
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.sessionId}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-all group"
              >
                {/* Visitor Info & Message Snippet */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#0B2B1B] border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center font-black text-sm shrink-0 shadow-lg">
                    {session.userName.charAt(0).toUpperCase()}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-white">{session.userName}</h4>
                      {session.unreadForAdmin > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-extrabold animate-bounce">
                          {session.unreadForAdmin} Unread
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-emerald-500/80 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(session.lastMessageTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>

                    {session.userEmail ? (
                      <p className="text-xs text-emerald-300/80 flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-[#A3E635]" />
                        <span>{session.userEmail}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-emerald-600 italic">Guest Visitor (No email registered)</p>
                    )}

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-emerald-100/90 leading-relaxed mt-2 max-w-2xl break-words">
                      "{session.lastMessage}"
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenChatBox(session)}
                    className="px-4 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#b8f048] text-[#0B2B1B] font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Chat with Visitor</span>
                  </button>

                  {session.unreadForAdmin > 0 && (
                    <button
                      onClick={() => handleMarkAsRead(session.sessionId)}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 transition-colors cursor-pointer"
                      title="Mark as Read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteModalSession(session)}
                    className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 hover:bg-red-900/80 transition-colors cursor-pointer"
                    title="Delete Conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalSession && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
          <div className="bg-[#0A2216] border border-red-500/50 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden ring-1 ring-red-500/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-950 text-red-400 border border-red-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Delete Visitor Chat</h3>
                <p className="text-xs text-red-200/80">InsForge Chat Removal</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-2">
              <p className="text-emerald-200/90 leading-relaxed">
                Are you sure you want to permanently delete chat session for <strong className="text-white">"{deleteModalSession.userName}"</strong>?
              </p>
              <p className="text-[11px] text-red-300/80 italic">
                All messages in this session will be permanently removed from InsForge.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalSession(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 transition-transform active:scale-95 cursor-pointer"
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
