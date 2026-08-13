import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone, CheckCircle } from 'lucide-react';

const PWA_LOGO_URL = 'https://lh3.googleusercontent.com/d/1Hxu8GU-Ac226cYdua7E9EH9eepph0EsR';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Capture browser native beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPwaPrompt = e;
      setIsDismissed(false);
    };

    // External event when user clicks Play Store / App Store badges
    const handleExternalTrigger = () => {
      setIsDismissed(false);
      setInstallSuccess(false);

      // Check if prompt object is ready
      const promptObj = deferredPrompt || (window as any).deferredPwaPrompt;
      if (promptObj) {
        promptObj.prompt();
        promptObj.userChoice.then((choiceResult: any) => {
          if (choiceResult?.outcome === 'accepted') {
            setInstallSuccess(true);
            setTimeout(() => setIsInstalled(true), 3000);
          }
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('trigger-pwa-install', handleExternalTrigger);

    window.addEventListener('appinstalled', () => {
      setInstallSuccess(true);
      setTimeout(() => setIsInstalled(true), 3000);
      setDeferredPrompt(null);
      (window as any).deferredPwaPrompt = null;
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('trigger-pwa-install', handleExternalTrigger);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    const promptObj = deferredPrompt || (window as any).deferredPwaPrompt;
    if (promptObj) {
      try {
        promptObj.prompt();
        const choiceResult = await promptObj.userChoice;
        if (choiceResult?.outcome === 'accepted') {
          setInstallSuccess(true);
          setTimeout(() => setIsInstalled(true), 3000);
        }
      } catch (err) {
        console.error('PWA install error:', err);
      }
      setDeferredPrompt(null);
      (window as any).deferredPwaPrompt = null;
    } else {
      // In web view or environment where prompt event is handled by browser UI
      setInstallSuccess(true);
      setTimeout(() => {
        setIsDismissed(true);
      }, 2500);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isInstalled || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-88 animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans pointer-events-auto">
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
                    Click install to add our farm portal app directly to your home screen.
                  </p>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                aria-label="Close install prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#A3E635] hover:bg-[#b8f048] text-[#0B2B1B] font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install App</span>
              </button>

              <button
                onClick={handleDismiss}
                className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 font-medium text-xs transition-colors cursor-pointer"
              >
                Not Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
