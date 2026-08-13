import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X, Sparkles, Monitor, Info } from 'lucide-react';

const PWA_LOGO_URL = 'https://lh3.googleusercontent.com/d/1Hxu8GU-Ac226cYdua7E9EH9eepph0EsR';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

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

    // Detect device environment
    const ua = window.navigator.userAgent;
    const isIosDevice = /iPhone|iPad|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Capture browser install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPwaPrompt = e;
    };

    const handleExternalTrigger = () => {
      setIsDismissed(false);
      setShowGuide(true);
      const promptObj = deferredPrompt || (window as any).deferredPwaPrompt;
      if (promptObj) {
        promptObj.prompt();
        promptObj.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
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
      const choiceResult = await promptObj.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      (window as any).deferredPwaPrompt = null;
    } else {
      setShowGuide(!showGuide);
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
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#04140C]/95 backdrop-blur-md border border-[#A3E635]/40 text-white rounded-2xl p-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#A3E635]/40 bg-[#0B2B1B] p-1 shrink-0 shadow-lg">
              <img
                src={PWA_LOGO_URL}
                alt="NS LTD App Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                NS LTD Official App
                <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
              </h4>
              <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-snug">
                Install our official Web App for fast, offline-ready access on your home screen.
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

        {/* Action Button */}
        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] font-bold text-xs border border-[#A3E635]/40 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{deferredPrompt || (window as any).deferredPwaPrompt ? 'Install App' : 'How To Install'}</span>
          </button>

          <button
            onClick={handleDismiss}
            className="py-2.5 px-3 rounded-xl bg-black/40 hover:bg-black/60 text-emerald-300 font-medium text-xs border border-white/10 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>

        {/* Step-by-Step Installation Guide Panel */}
        {showGuide && (
          <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-emerald-100/90 space-y-2 bg-black/50 p-3 rounded-xl">
            {isIOS ? (
              <>
                <p className="font-bold text-[#A3E635] flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>iOS Safari Install Steps:</span>
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-emerald-200">
                  <li className="flex items-center gap-1.5">
                    <span>Tap Safari Share button</span>
                    <Share className="w-3.5 h-3.5 text-blue-400 inline" />
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>Scroll down and select</span>
                    <strong className="text-white">"Add to Home Screen"</strong>
                    <PlusSquare className="w-3.5 h-3.5 text-emerald-300 inline" />
                  </li>
                </ol>
              </>
            ) : (
              <>
                <p className="font-bold text-[#A3E635] flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Android & Desktop Install Steps:</span>
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-emerald-200">
                  <li>Open browser menu (3 dots <strong className="text-white font-mono">⋮</strong> or install icon in address bar).</li>
                  <li>Click <strong className="text-white">"Install NS LTD"</strong> or <strong className="text-white">"Add to Home Screen"</strong>.</li>
                </ol>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
