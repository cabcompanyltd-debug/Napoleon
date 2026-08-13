import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';

const PWA_LOGO_URL = 'https://lh3.googleusercontent.com/d/1Hxu8GU-Ac226cYdua7E9EH9eepph0EsR';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check session dismissal
    if (sessionStorage.getItem('napoleon_pwa_dismissed') === 'true') {
      setIsDismissed(true);
    }

    // Capture browser beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPwaPrompt = e;
      setIsDismissed(false);
    };

    const handleExternalTrigger = () => {
      setIsDismissed(false);
      const promptObj = deferredPrompt || (window as any).deferredPwaPrompt;
      if (promptObj) {
        promptObj.prompt();
        promptObj.userChoice.then((choiceResult: any) => {
          if (choiceResult?.outcome === 'accepted') {
            setIsInstalled(true);
          }
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('trigger-pwa-install', handleExternalTrigger);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
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
      promptObj.prompt();
      try {
        const choiceResult = await promptObj.userChoice;
        if (choiceResult?.outcome === 'accepted') {
          setIsInstalled(true);
        }
      } catch (err) {
        console.error('PWA install prompt error:', err);
      }
      setDeferredPrompt(null);
      (window as any).deferredPwaPrompt = null;
    } else {
      // Direct notification if browser in iframe hasn't captured beforeinstallprompt yet
      alert('Click "Install" in your browser address bar or menu to add Napoleon Steadings App to your Home Screen.');
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('napoleon_pwa_dismissed', 'true');
  };

  if (isInstalled || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-88 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#04140C]/95 backdrop-blur-md border border-[#A3E635]/50 text-white rounded-2xl p-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#A3E635]/40 bg-[#0B2B1B] p-1 shrink-0 shadow-lg">
              <img
                src={PWA_LOGO_URL}
                alt="NS LTD App Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                Install NS LTD App
                <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
              </h4>
              <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-snug">
                Install our official app on your device home screen for fast access.
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-400 hover:text-white transition-colors shrink-0 cursor-pointer"
            aria-label="Close install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#A3E635] hover:bg-[#b8f048] text-[#0B2B1B] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
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
      </div>
    </div>
  );
};
