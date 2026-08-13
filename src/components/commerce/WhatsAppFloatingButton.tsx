import React, { useState, useEffect } from 'react';
import { X, Send, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '233201073087';
const DISPLAY_PHONE = '+233 20 107 3087';

// Official authentic WhatsApp SVG icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.808 0-3.513-.485-4.992-1.332l-.358-.205-3.71.973.99-3.618-.225-.358c-.928-1.476-1.418-3.197-1.418-4.966 0-5.187 4.22-9.407 9.408-9.407 2.513 0 4.875.98 6.652 2.758 1.777 1.778 2.756 4.139 2.756 6.65 0 5.188-4.22 9.407-9.403 9.407M12.051 0C5.402 0 0 5.402 0 12.051c0 2.121.553 4.188 1.605 6.013L0 24l6.103-1.601a12.02 12.02 0 0 0 5.948 1.571h.005c6.649 0 12.051-5.403 12.051-12.052 0-3.218-1.253-6.242-3.53-8.519C18.298 1.122 15.272 0 12.051 0z" />
  </svg>
);

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [isWebChatOpen, setIsWebChatOpen] = useState(false);

  useEffect(() => {
    const handleChatOpenChange = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail) {
        setIsWebChatOpen(!!custom.detail.isOpen);
      }
    };

    window.addEventListener('napoleon-chat-open-change', handleChatOpenChange);
    return () => {
      window.removeEventListener('napoleon-chat-open-change', handleChatOpenChange);
    };
  }, []);

  if (isWebChatOpen) {
    return null;
  }

  const quickMessages = [
    'Hello Napoleon Steadings! I would like to place a commercial produce order.',
    'I want to inquire about contract farming and outgrower partnerships.',
    'I am interested in investor opportunities and export shipments.',
  ];

  const handleSendWhatsApp = (messageText?: string) => {
    const text = messageText || 'Hello Napoleon Steadings! I would like to make an inquiry.';
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-22 right-6 z-50 flex flex-col items-end font-sans pointer-events-auto">
      {/* Expanded Quick Message Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-3xl bg-[#04140C]/95 backdrop-blur-xl border border-[#A3E635]/50 p-5 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-emerald-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close WhatsApp chat options"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 border-b border-emerald-900/60 pb-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-lg shrink-0">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                WhatsApp Hotline
                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse"></span>
              </h4>
              <p className="text-[11px] text-emerald-300/80 font-mono mt-0.5">
                {DISPLAY_PHONE}
              </p>
            </div>
          </div>

          <p className="text-xs text-emerald-100/90 mb-3 leading-relaxed">
            Select a quick topic or message our Volta Region sales team directly on WhatsApp:
          </p>

          {/* Quick Messages */}
          <div className="space-y-2 mb-3">
            {quickMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleSendWhatsApp(msg)}
                className="w-full text-left p-2.5 rounded-xl bg-[#0F3520]/80 hover:bg-[#1E5E3A] border border-[#1E5E3A] hover:border-[#A3E635]/60 text-xs text-emerald-100 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="line-clamp-2">{msg}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A3E635] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
              </button>
            ))}
          </div>

          {/* Custom Message Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customMsg.trim()) {
                  handleSendWhatsApp(customMsg);
                }
              }}
              className="flex-1 bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-400/50 focus:outline-none"
            />
            <button
              onClick={() => handleSendWhatsApp(customMsg.trim())}
              className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold transition-all shrink-0 cursor-pointer shadow-md"
              aria-label="Send custom WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button - Icon Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/30"
        title="Chat on WhatsApp (+233 20 107 3087)"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#A3E635] border-2 border-[#0B2B1B] animate-pulse"></span>

        {/* Hover Tooltip on desktop */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-black/90 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10">
          WhatsApp Chat
        </span>
      </button>
    </div>
  );
};
