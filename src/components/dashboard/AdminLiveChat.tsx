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
  Clock,
  Sparkles,
  ShieldCheck
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
      if (event.type === 'NEW_MESSAGE' || event.type === 'SESSION_DELETED' || event.type === 'MESSAGES_READ') {
        loadSessions();
      }
    });

    const pollTimer = setInterval(loadSessions, 3000);

    return () => {
      unsub();
      clearInterval(pollTimer);
    };
  }, []);

  const handleSelectPerson = (session: ChatSession) => {
    // Send heartbeat so admin status is verified
    sendAdminHeartbeat();

    // Mark messages as read for admin
    markSessionAsRead(session.sessionId, 'admin');

    // Trigger opening the main website floating chat box for this visitor conversation
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

  const handleMarkAsRead = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
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
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#04140C] via-[#0B2B1B] to-[#04140C] border border-[#A3E635]/30 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#A3E635] text-[#0B2B1B] text-[10px] font-extrabold uppercase tracking-widest">
              Messages & Conversations
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-300">
              <Circle className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400 animate-pulse" />
              <span>Admin Live</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">Customer Inquiries ({sessions.length})</h2>
          <p className="text-xs text-emerald-200/80">
            Click any visitor below to open their conversation in the website floating chat box.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {totalUnread > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <Circle className="w-2 h-2 fill-red-400 text-red-400" />
              <span>{totalUnread} Unread {totalUnread === 1 ? 'Message' : 'Messages'}</span>
            </span>
          )}

          <button
            onClick={loadSessions}
            className="p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/10 text-emerald-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-[#04140C] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-emerald-600" />
          <input
            type="text"
            placeholder="Search visitor name or email..."
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
            <span>{filterUnread ? 'Unread Conversations' : 'All Conversations'}</span>
          </button>
        </div>
      </div>

      {/* SIMPLE MINIMAL CONVERSATION LIST */}
      <div className="bg-[#071910] border border-[#A3E635]/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#04140C] border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#A3E635]" />
            <span>Visitor Message Records ({filteredSessions.length})</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono">Live Sync Active</span>
        </div>

        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-emerald-400/60 font-mono">Loading conversations...</div>
          ) : filteredSessions.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-emerald-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-xs text-emerald-400/70 font-mono">
                {searchTerm || filterUnread ? 'No matching conversations found.' : 'No visitor messages logged yet.'}
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.sessionId}
                onClick={() => handleSelectPerson(session)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#1E5E3A]/20 transition-all cursor-pointer group"
              >
                {/* Person Info */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#0B2B1B] border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center font-black text-sm shadow-lg group-hover:border-[#A3E635] transition-colors">
                      {session.userName.charAt(0).toUpperCase()}
                    </div>
                    {session.unreadForAdmin > 0 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#071910] animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-white group-hover:text-[#A3E635] transition-colors">
                        {session.userName}
                      </h4>

                      {session.unreadForAdmin > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-extrabold">
                          {session.unreadForAdmin} New
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-emerald-500/80 flex items-center gap-1 ml-auto sm:ml-0">
                        <Clock className="w-3 h-3" />
                        {new Date(session.lastMessageTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>

                    {session.userEmail && (
                      <p className="text-xs text-emerald-300/80 flex items-center gap-1 truncate">
                        <Mail className="w-3 h-3 text-[#A3E635]" />
                        <span>{session.userEmail}</span>
                      </p>
                    )}

                    <p className="text-xs text-emerald-100/70 truncate pt-0.5">
                      {session.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Click Action Indicator */}
                <div className="flex items-center gap-2 shrink-0">
                  {session.unreadForAdmin > 0 && (
                    <button
                      onClick={(e) => handleMarkAsRead(e, session.sessionId)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 transition-colors cursor-pointer"
                      title="Mark as Read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModalSession(session);
                    }}
                    className="p-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 hover:bg-red-900 transition-colors cursor-pointer"
                    title="Delete Conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="px-3.5 py-2 rounded-xl bg-[#1E5E3A] group-hover:bg-[#A3E635] text-[#A3E635] group-hover:text-[#0B2B1B] font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-md">
                    <span>Open Chat</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
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
                <h3 className="font-bold text-lg text-white">Delete Conversation?</h3>
                <p className="text-xs text-red-200/80">InsForge Chat System</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-2">
              <p className="text-emerald-200/90 leading-relaxed">
                Deleting this conversation with <strong className="text-white">"{deleteModalSession.userName}"</strong> will remove its messages and associated chat data from InsForge.
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
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
