import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone, CheckCircle, ShieldCheck, Star } from 'lucide-react';

const PWA_LOGO_URL = 'https://lh3.googleusercontent.com/d/1Hxu8GU-Ac226cYdua7E9EH9eepph0EsR';

// Google Play Icon
const GooglePlayIcon = () => (
  <svg className="w-5 h-5 text-[#A3E635]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.28 0 .54.08.77.22l12.5 8.5c.5.34.73.93.57 1.5-.11.4-.41.71-.8.86l-13.04 7.2c-.16.09-.34.14-.52.14-.83 0-1.48-.67-1.48-1.5z" />
  </svg>
);

// Apple Icon
const AppleIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.1c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.61.71-1.15 1.86-.99 2.97 1.08.08 2.16-.57 2.82-1.37z" />
  </svg>
);

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // Store modal state: null if closed, or { storeType: 'play' | 'apple' | 'general' }
  const [storeModal, setStoreModal] = useState<{ storeType: 'play' | 'apple' | 'general' } | null>(null);

  useEffect(() => {
    // Check if running in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPwaPrompt = e;
    };

    // Store badge click handler
    const handleOpenStoreModal = (e: any) => {
      const storeType = e?.detail?.storeType || 'general';
      setStoreModal({ storeType });
      setIsDismissed(true); // hide bottom banner when modal is opened to avoid duplication
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('open-store-pwa-modal', handleOpenStoreModal as EventListener);

    window.addEventListener('appinstalled', () => {
      setInstallSuccess(true);
      setStoreModal(null);
      setTimeout(() => setIsInstalled(true), 3000);
      setDeferredPrompt(null);
      (window as any).deferredPwaPrompt = null;
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('open-store-pwa-modal', handleOpenStoreModal as EventListener);
    };
  }, []);

  // Invoked ONLY when user clicks "Install App Now" inside the modal popup or banner
  const handleProceedToInstall = async () => {
    const promptObj = deferredPrompt || (window as any).deferredPwaPrompt;
    setStoreModal(null);

    if (promptObj) {
      try {
        promptObj.prompt();
        const choiceResult = await promptObj.userChoice;
        if (choiceResult?.outcome === 'accepted') {
          setInstallSuccess(true);
          setTimeout(() => setIsInstalled(true), 3000);
        }
      } catch (err) {
        console.error('PWA install prompt error:', err);
      }
      setDeferredPrompt(null);
      (window as any).deferredPwaPrompt = null;
    } else {
      // In web preview environments where browser handles PWA direct download
      setInstallSuccess(true);
      setTimeout(() => {
        setIsDismissed(true);
      }, 3000);
    }
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* STORE APP PREVIEW MODAL POPUP (Opened when clicking Play Store / App Store badges) */}
      {storeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans pointer-events-auto">
          <div className="bg-[#04140C] border border-[#A3E635]/60 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-white ring-1 ring-white/10">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#A3E635]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Platform Tag */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-[#A3E635]/40 text-xs font-bold">
                {storeModal.storeType === 'play' ? (
                  <>
                    <GooglePlayIcon />
                    <span className="text-[#A3E635]">Google Play Edition</span>
                  </>
                ) : storeModal.storeType === 'apple' ? (
                  <>
                    <AppleIcon />
                    <span className="text-white">Apple App Store Edition</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 text-[#A3E635]" />
                    <span className="text-[#A3E635]">Official Mobile App</span>
                  </>
                )}
              </div>

              <button
                onClick={() => setStoreModal(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* App Card Info */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#A3E635]/50 bg-[#0B2B1B] p-1.5 shrink-0 shadow-xl">
                <img
                  src={PWA_LOGO_URL}
                  alt="NS LTD Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-lg font-bold text-white leading-tight">
                  Napoleon Steadings Ltd.
                </h3>
                <p className="text-xs text-emerald-300 font-medium">
                  AgriTech & Farm Commerce Portal
                </p>
                <div className="flex items-center gap-3 text-[11px] text-emerald-200/80 pt-0.5">
                  <span className="flex items-center gap-1 text-[#A3E635] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#A3E635]" /> 5.0 Rating
                  </span>
                  <span>•</span>
                  <span>Free PWA</span>
                </div>
              </div>
            </div>

            {/* Description & Features */}
            <div className="space-y-2.5 text-xs text-emerald-100/90 leading-relaxed">
              <p>
                Install the official <strong className="text-white">Napoleon Steadings App</strong> on your device for fast access to live Volta Region farm gate prices, harvest quotes, and batch traceability.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-semibold text-emerald-200">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0F3520]/80 border border-[#1E5E3A]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Instant Home Access</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0F3520]/80 border border-[#1E5E3A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Verified & Safe</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedToInstall}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#A3E635] hover:bg-[#b8f048] text-[#0B2B1B] font-extrabold text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#A3E635]/20 active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Install App Now</span>
              </button>

              <button
                onClick={() => setStoreModal(null)}
                className="w-full py-2.5 text-center text-xs text-emerald-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BOTTOM BANNER (Shows on site land, easily dismissable) */}
      {!isDismissed && !storeModal && (
        <div className="fixed bottom-22 left-4 sm:left-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-88 animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans pointer-events-auto">
          <div className="bg-[#04140C]/95 backdrop-blur-xl border border-[#A3E635]/60 text-white rounded-2xl p-4.5 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            {/* Glow backdrop effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A3E635]/10 rounded-full blur-2xl pointer-events-none" />

            {installSuccess ? (
              <div className="py-2 text-center space-y-2 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-[#A3E635] text-[#0B2B1B] mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-white">App Installing!</h4>
                <p className="text-xs text-emerald-200/90">
                  Napoleon Steadings is being added to your device Home Screen.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#A3E635]/50 bg-[#0B2B1B] p-1 shrink-0 shadow-lg relative">
                      <img
                        src={PWA_LOGO_URL}
                        alt="NS LTD App Logo"
                        className="w-full h-full object-contain rounded-xl"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0B2B1B]">
                        <Smartphone className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
                        Install NS LTD App
                        <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                      </h4>
                      <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-snug">
                        Add our farm portal app directly to your home screen.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDismissed(true)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                    aria-label="Close install prompt"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={handleProceedToInstall}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#A3E635] hover:bg-[#b8f048] text-[#0B2B1B] font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install App</span>
                  </button>

                  <button
                    onClick={() => setIsDismissed(true)}
                    className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Not Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
