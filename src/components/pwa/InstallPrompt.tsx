import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X, Check, Smartphone, Sparkles } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if user previously dismissed prompt in this session
    if (sessionStorage.getItem('napoleon_pwa_dismissed') === 'true') {
      setIsDismissed(true);
    }

    // Detect iOS
    const ua = window.navigator.userAgent;
    const isIosDevice = /iPhone|iPad|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Capture standard PWA install prompt (Chrome/Android/Edge/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track when app is installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIosGuide(!showIosGuide);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('napoleon_pwa_dismissed', 'true');
  };

  // Don't render if already installed or dismissed or no prompt available and not iOS
  if (isInstalled || isDismissed || (!deferredPrompt && !isIOS)) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#04140C]/95 backdrop-blur-md border border-[#A3E635]/40 text-white rounded-2xl p-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center shrink-0 shadow-inner">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                Napoleon Ag App
                <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
              </h4>
              <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-snug">
                Install our app for a faster, offline-ready experience on your device.
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-400 hover:text-white transition-colors shrink-0"
            aria-label="Close install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2 px-3.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] font-bold text-xs border border-[#A3E635]/40 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isIOS ? 'Install Instructions' : 'Install App'}</span>
          </button>

          <button
            onClick={handleDismiss}
            className="py-2 px-3 rounded-xl bg-black/40 hover:bg-black/60 text-emerald-300 font-medium text-xs border border-white/10 transition-colors"
          >
            Not Now
          </button>
        </div>

        {/* iOS Instruction Panel */}
        {isIOS && showIosGuide && (
          <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-emerald-100/90 space-y-1.5 bg-black/40 p-2.5 rounded-xl">
            <p className="font-bold text-[#A3E635] flex items-center gap-1">
              <span>To install on iPhone / iPad:</span>
            </p>
            <ol className="list-decimal pl-4 space-y-1 text-emerald-200">
              <li className="flex items-center gap-1.5">
                <span>Tap Share</span>
                <Share className="w-3.5 h-3.5 text-blue-400 inline" />
              </li>
              <li className="flex items-center gap-1.5">
                <span>Select</span>
                <span className="font-semibold text-white">"Add to Home Screen"</span>
                <PlusSquare className="w-3.5 h-3.5 text-emerald-300 inline" />
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
