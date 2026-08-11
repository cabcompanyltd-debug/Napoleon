import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserCheck, ShieldAlert, LayoutDashboard, Shield, LogIn, Sparkles, LogOut, Lock, Mail, User as UserIcon } from 'lucide-react';
import { UserProfile, mockLoginAsAdmin, mockLoginAsUser, logoutUser, setStoredAuthUser } from '../../lib/insforge';
import logoImg from '../../assets/logo.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onNavigate?: (route: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser, onNavigate }) => {
  const [authMode, setAuthMode] = useState<'quick' | 'form'>('quick');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user'>('admin');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickAdminLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const admin = mockLoginAsAdmin();
      setIsLoading(false);
      onClose();
      if (onNavigate) {
        onNavigate('/dashboard');
      }
    }, 300);
  };

  const handleQuickUserLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      mockLoginAsUser();
      setIsLoading(false);
      onClose();
      if (onNavigate) {
        onNavigate('/');
      }
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setIsLoading(true);
    setTimeout(() => {
      const user: UserProfile = {
        id: `${selectedRole}-${Date.now()}`,
        email: emailInput.trim(),
        fullName: nameInput.trim() || (selectedRole === 'admin' ? 'System Administrator' : 'Steadings Member'),
        role: selectedRole,
        createdAt: new Date().toISOString(),
      };
      setStoredAuthUser(user);
      setIsLoading(false);
      onClose();
      if (selectedRole === 'admin' && onNavigate) {
        onNavigate('/dashboard');
      } else if (onNavigate) {
        onNavigate('/');
      }
    }, 300);
  };

  const handleSignOut = () => {
    logoutUser();
    onClose();
    if (onNavigate) {
      onNavigate('/');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#091D12] text-white border border-[#A3E635]/30 shadow-2xl p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Title */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 inline-flex items-center justify-center">
              <img
                src="/logo.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = logoImg;
                }}
                alt="Napoleon Steadings"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-md"
              />
            </div>

            <h3 className="font-editorial text-2xl font-bold text-white">
              {currentUser ? 'Napoleon Steadings Account' : 'InsForge Sign In & Portal'}
            </h3>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-xs">
              {currentUser
                ? `Logged in as ${currentUser.fullName} (${currentUser.role.toUpperCase()})`
                : 'Access the admin dashboard, create posts & manage agricultural inquiries.'}
            </p>
          </div>

          {currentUser ? (
            /* Logged In View */
            <div className="mt-6 space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-[#0F3520] border border-[#1E5E3A] space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#1E5E3A] border-2 border-[#A3E635] flex items-center justify-center text-[#A3E635] font-bold text-xl mx-auto shadow-inner">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{currentUser.fullName}</h4>
                  <p className="text-xs text-emerald-300 font-mono">{currentUser.email}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#A3E635] bg-[#1E5E3A]/80 px-3 py-1 rounded-full border border-[#A3E635]/30">
                  {currentUser.role === 'admin' ? <ShieldAlert className="w-3.5 h-3.5 text-amber-300" /> : <UserCheck className="w-3.5 h-3.5" />}
                  <span>{currentUser.role === 'admin' ? 'Administrator Privilege' : 'Standard Member'}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      onClose();
                      if (onNavigate) onNavigate('/dashboard');
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Admin Dashboard</span>
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Sign In Options */
            <div className="mt-6 space-y-5">
              {/* Quick One-Click Login Options */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block text-center">
                  ⚡ Fast One-Click Access
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleQuickAdminLogin}
                    disabled={isLoading}
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-[#A3E635] to-[#84CC16] hover:from-[#84CC16] hover:to-[#65A30D] text-[#0B2B1B] font-extrabold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg border border-white/40 transition-all hover:scale-[1.02]"
                  >
                    <ShieldAlert className="w-5 h-5 text-[#0B2B1B]" />
                    <span className="text-xs">Login as Admin</span>
                    <span className="text-[9px] opacity-80 font-mono">Full Controls & Redirection</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickUserLogin}
                    disabled={isLoading}
                    className="p-3.5 rounded-2xl bg-[#1E5E3A] hover:bg-[#184B2E] text-white font-extrabold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg border border-[#A3E635]/40 transition-all hover:scale-[1.02]"
                  >
                    <UserCheck className="w-5 h-5 text-[#A3E635]" />
                    <span className="text-xs">Login as Member</span>
                    <span className="text-[9px] text-emerald-200/80 font-mono">Standard Access</span>
                  </button>
                </div>
              </div>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-[#1E5E3A] w-full"></div>
                <span className="bg-[#091D12] px-3 text-[10px] uppercase font-bold text-emerald-300/60 tracking-wider absolute">
                  or custom sign in
                </span>
              </div>

              {/* Form Mode */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* Role Switch */}
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-[#1E5E3A]">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === 'admin'
                        ? 'bg-[#A3E635] text-[#0B2B1B] shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('user')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === 'user'
                        ? 'bg-[#1E5E3A] text-[#A3E635] shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>User</span>
                  </button>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder={selectedRole === 'admin' ? 'admin@napoleonsteadings.com' : 'user@napoleonsteadings.com'}
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Full Name (optional)"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'Signing In...' : `Sign In & Redirect`}</span>
                </button>
              </form>

              <div className="p-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-[10px] text-emerald-100/80 leading-relaxed text-center">
                <span className="font-bold text-[#A3E635]">InsForge Backend Integration:</span> Admin users are automatically routed to the management dashboard.
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
