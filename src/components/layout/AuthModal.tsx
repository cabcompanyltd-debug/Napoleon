import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, LayoutDashboard, LogIn, LogOut, Lock, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserProfile, mockLoginAsAdmin, logoutUser, signInWithInsForge } from '../../lib/insforge';
import { BrandLogo } from './BrandLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onNavigate?: (route: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser, onNavigate }) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickAdminLogin = () => {
    setIsLoading(true);
    setAuthError(null);
    setTimeout(() => {
      mockLoginAsAdmin();
      setIsLoading(false);
      onClose();
      if (onNavigate) {
        onNavigate('/dashboard');
      }
    }, 300);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setAuthError('Please enter email and password.');
      return;
    }

    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      // Always authenticate as 'admin' role
      const res = await signInWithInsForge(emailInput, passwordInput, 'admin');
      if (res.error) {
        setAuthError(res.error);
      } else {
        setAuthSuccess('Admin signed in successfully!');
        setTimeout(() => {
          setIsLoading(false);
          onClose();
          if (onNavigate) {
            onNavigate('/dashboard');
          }
        }, 600);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Title Header */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 inline-flex items-center justify-center">
              <BrandLogo size="md" />
            </div>

            <h3 className="font-editorial text-2xl font-bold text-white">
              InsForge Sign In & Portal
            </h3>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-xs leading-relaxed">
              Access the executive dashboard, publish articles & manage agricultural inquiries.
            </p>
          </div>

          {currentUser ? (
            /* Logged In View */
            <div className="mt-6 space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-[#0F3520] border border-[#1E5E3A] space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#1E5E3A] border-2 border-[#A3E635] flex items-center justify-center text-[#A3E635] font-bold text-xl mx-auto shadow-inner">
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{currentUser.fullName || 'Administrator'}</h4>
                  <p className="text-xs text-emerald-300 font-mono">{currentUser.email}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#A3E635] bg-[#1E5E3A]/80 px-3 py-1 rounded-full border border-[#A3E635]/30">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
                  <span>Administrator Privilege</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigate) onNavigate('/dashboard');
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Executive Dashboard</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Admin Sign In Form View */
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#A3E635] flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#A3E635]" />
                  <span>Admin Sign In</span>
                </h4>
              </div>

              {/* Fast One-Click Admin Access */}
              <button
                type="button"
                onClick={handleQuickAdminLogin}
                disabled={isLoading}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#A3E635] to-[#84CC16] hover:from-[#84CC16] hover:to-[#65A30D] text-[#0B2B1B] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg border border-white/40 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <ShieldAlert className="w-4 h-4 text-[#0B2B1B]" />
                <span>⚡ Fast Admin Access</span>
              </button>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-[#1E5E3A] w-full"></div>
                <span className="bg-[#091D12] px-3 text-[10px] uppercase font-bold text-emerald-300/60 tracking-wider absolute">
                  or enter credentials
                </span>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="p-3 rounded-xl bg-[#A3E635]/20 border border-[#A3E635]/50 text-[#A3E635] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{authSuccess}</span>
                </div>
              )}

              {/* Admin Sign In Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-emerald-200/90 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="admin@napoleonsteadings.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-emerald-200/90 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] border border-[#A3E635]/40 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
