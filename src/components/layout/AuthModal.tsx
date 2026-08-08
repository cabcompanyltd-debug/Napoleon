import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, User, CheckCircle2, Shield, Sprout, ShieldAlert, UserCheck, LayoutDashboard } from 'lucide-react';
import { signInWithGoogle, logoutUser, saveUserProfileWithRole, getUserRole } from '../../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import logoImg from '../../assets/logo.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FirebaseUser | null;
  onNavigate?: (route: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user'>('user');
  const [currentRole, setCurrentRole] = useState<'admin' | 'user'>('user');

  useEffect(() => {
    if (currentUser) {
      getUserRole(currentUser.uid).then((r) => setCurrentRole(r));
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const user = await signInWithGoogle();
      if (user) {
        await saveUserProfileWithRole(user, selectedRole);
        onClose();
        if (onNavigate) onNavigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      if (err?.code === 'auth/popup-blocked' || err?.message?.includes('popup-blocked')) {
        setErrorMsg('Pop-up sign-in was blocked by your browser. We attempted a redirect sign-in, or you can open the app in a new browser tab.');
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Sign-in window was closed before completing. Please try again.');
      } else {
        setErrorMsg('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleToggleForLoggedIn = async (role: 'admin' | 'user') => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      await saveUserProfileWithRole(currentUser, role);
      setCurrentRole(role);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      onClose();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#091D12] text-white border border-[#A3E635]/30 shadow-2xl p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-white/30 mb-3 inline-flex items-center justify-center">
              <img src={logoImg} alt="Napoleon Steadings" className="h-10 w-auto object-contain" />
            </div>

            <h3 className="font-editorial text-2xl font-bold text-white">
              {currentUser ? 'User Account Portal' : 'Napoleon Steadings Access'}
            </h3>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-xs">
              {currentUser
                ? 'Manage your author account, admin permissions & publisher desk'
                : 'Choose your access role below and sign in with your Google account.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs text-center space-y-2">
              <p>{errorMsg}</p>
              <button
                onClick={() => window.open(window.location.href, '_blank')}
                className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] transition-colors"
              >
                Open App in New Tab ↗
              </button>
            </div>
          )}

          {/* Content */}
          {currentUser ? (
            <div className="mt-6 flex flex-col items-center space-y-4">
              <div className="relative">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-20 h-20 rounded-2xl border-2 border-[#A3E635] object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-[#1E5E3A] border-2 border-[#A3E635] flex items-center justify-center text-white text-2xl font-bold">
                    {currentUser.email?.[0].toUpperCase() || 'U'}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 p-1 bg-[#A3E635] text-[#0B2B1B] rounded-full shadow">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="text-center space-y-1">
                <h4 className="font-bold text-lg text-white">
                  {currentUser.displayName || 'Authenticated User'}
                </h4>
                <p className="text-xs text-emerald-300 font-mono">{currentUser.email}</p>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#A3E635] bg-[#1E5E3A]/60 px-3 py-1 rounded-full border border-[#A3E635]/30 mt-2">
                  {currentRole === 'admin' ? <ShieldAlert className="w-3.5 h-3.5 text-amber-300" /> : <UserCheck className="w-3.5 h-3.5" />}
                  <span>Active Role: {currentRole === 'admin' ? 'System Administrator' : 'Author / User'}</span>
                </div>
              </div>

              {/* Role Toggle for logged-in user */}
              <div className="w-full space-y-2 pt-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block text-center">
                  Switch Account Privilege Level
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-[#1E5E3A]">
                  <button
                    type="button"
                    onClick={() => handleRoleToggleForLoggedIn('user')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      currentRole === 'user'
                        ? 'bg-[#1E5E3A] text-[#A3E635] shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Author / Contributor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleToggleForLoggedIn('admin')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      currentRole === 'admin'
                        ? 'bg-[#A3E635] text-[#0B2B1B] shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Admin Executive
                  </button>
                </div>
              </div>

              <div className="w-full space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigate) onNavigate('/dashboard');
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open {currentRole === 'admin' ? 'Admin' : 'Creator'} Dashboard</span>
                </button>

                <button
                  onClick={handleSignOut}
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 font-bold text-xs transition-colors"
                >
                  {isLoading ? 'Signing Out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {/* Role Selection Prior to Sign-in */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block text-center">
                  Choose Account Access Privilege *
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('user')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedRole === 'user'
                        ? 'bg-[#1E5E3A] border-[#A3E635] ring-2 ring-[#A3E635]/40 text-white'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/30'
                    }`}
                  >
                    <UserCheck className={`w-5 h-5 mb-1 ${selectedRole === 'user' ? 'text-[#A3E635]' : ''}`} />
                    <span className="font-bold text-xs block text-white">Standard User</span>
                    <span className="text-[10px] text-emerald-200/70 block leading-tight mt-0.5">Publish articles, read news & like posts</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedRole === 'admin'
                        ? 'bg-[#A3E635] border-white text-[#0B2B1B] ring-2 ring-white/50'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/30'
                    }`}
                  >
                    <ShieldAlert className={`w-5 h-5 mb-1 ${selectedRole === 'admin' ? 'text-[#0B2B1B]' : ''}`} />
                    <span className={`font-extrabold text-xs block ${selectedRole === 'admin' ? 'text-[#0B2B1B]' : 'text-white'}`}>Admin Role</span>
                    <span className={`text-[10px] block leading-tight mt-0.5 ${selectedRole === 'admin' ? 'text-[#0B2B1B]/80' : 'text-emerald-200/70'}`}>Full access to contact inquiries & post management</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm flex items-center justify-center gap-3 transition-colors shadow-xl group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isLoading ? 'Connecting Google Account...' : `Sign In as ${selectedRole === 'admin' ? 'Admin Executive' : 'Author / User'}`}</span>
              </button>

              <div className="p-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-[11px] text-emerald-100/90 leading-relaxed text-center">
                <span className="font-bold text-[#A3E635]">Firebase Authentication & Firestore Sync:</span> Your selected role is saved securely to your profile.
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
