import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Phone, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '233201073087';
const DISPLAY_PHONE = '+233 20 107 3087';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickMessages = [
    'Hello Napoleon Steadings! I would like to place a commercial produce order.',
    'I want to inquire about contract farming and outgrower partnerships.',
    'I am interested in investor opportunities and export shipments.',
  ];

  const handleSendWhatsApp = (messageText: string) => {
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-sans">
      {/* Expanded Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#04140C]/95 backdrop-blur-xl border border-[#A3E635]/50 p-5 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-emerald-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close WhatsApp chat popup"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 border-b border-emerald-900/60 pb-3.5 mb-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                Commercial Hotline
                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse"></span>
              </h4>
              <p className="text-[11px] text-emerald-300/80 flex items-center gap-1 mt-0.5 font-mono">
                <Phone className="w-3 h-3 text-[#A3E635]" />
                <span>{DISPLAY_PHONE}</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-emerald-100/90 mb-3 leading-relaxed">
            Need urgent produce quotes or corporate inquiry? Message our Volta Region sales team directly on WhatsApp.
          </p>

          {/* Quick Messages */}
          <div className="space-y-2 mb-3.5">
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
              onClick={() => customMsg.trim() && handleSendWhatsApp(customMsg)}
              className="p-2 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-bold transition-all shrink-0 cursor-pointer shadow-md"
              aria-label="Send custom WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/20"
        title="Chat on WhatsApp (+233 20 107 3087)"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="font-extrabold text-xs sm:text-sm tracking-wide">
          WhatsApp Sales ({DISPLAY_PHONE})
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A3E635] border-2 border-[#0B2B1B]"></span>
      </button>
    </div>
  );
};
