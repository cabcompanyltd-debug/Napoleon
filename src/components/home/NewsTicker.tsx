import React, { useState } from 'react';
import { Radio, Sun, TrendingUp, Megaphone, ArrowUpRight, Pause, Play, ChevronRight, MapPin } from 'lucide-react';

interface NewsTickerProps {
  onNavigate: (route: string) => void;
}

interface TickerItem {
  id: string;
  type: 'weather' | 'market' | 'announcement';
  icon: React.ReactNode;
  label: string;
  content: string;
  badge?: string;
  link?: string;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: 'weather-1',
    type: 'weather',
    icon: <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
    label: 'VOLTA WEATHER',
    content: 'Ho & Adaklu Plains: 29°C Clear Sky • Humidity 68% • Wind 12 km/h SSW • Optimal Spraying Window Active',
    badge: 'LIVE TELEMETRY'
  },
  {
    id: 'market-1',
    type: 'market',
    icon: <TrendingUp className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />,
    label: 'VOLTA COMMODITY INDEX',
    content: 'Yellow Maize: GHS 420/50kg (↑2.4%) • Soybeans: GHS 680/50kg (↑1.8%) • High-Grade Cassava Flour: GHS 3,200/Ton • Pineapples: GHS 8.50/kg',
    badge: 'COMMODITY SPOT'
  },
  {
    id: 'announcement-1',
    type: 'announcement',
    icon: <Megaphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
    label: 'OUTGROWER SCHEME',
    content: 'Napoleon Steadings expands Volta Basin Outgrower Scheme to 500 smallholder households in Kpando District.',
    badge: 'ANNOUNCEMENT',
    link: '/partnerships'
  },
  {
    id: 'announcement-2',
    type: 'announcement',
    icon: <Megaphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
    label: 'PROCESSING HUB',
    content: 'Hohoe High-Grade Cassava Starch & Flour Depot officially reaches full 50-ton daily processing throughput.',
    badge: 'MILESTONE',
    link: '/agriculture/processing'
  },
  {
    id: 'market-2',
    type: 'market',
    icon: <TrendingUp className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />,
    label: 'EXPORT TRADE',
    content: 'Smooth Cayenne Pineapple export shipment dispatched to Rotterdam from Tema Port Logistics Terminal.',
    badge: 'TRADE DISPATCH',
    link: '/products'
  }
];

export const NewsTicker: React.FC<NewsTickerProps> = ({ onNavigate }) => {
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isEffectivePaused = isManualPaused || isHovered;

  const togglePause = () => {
    if (isManualPaused) {
      setIsManualPaused(false);
      setIsHovered(false);
    } else {
      setIsManualPaused(true);
    }
  };

  return (
    <div className="w-full bg-[#04140C] border-b border-[#A3E635]/25 text-white py-2.5 px-3 sm:px-6 relative overflow-hidden select-none z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Live Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-[#0B2B1B] border border-[#A3E635]/40 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold text-[#A3E635] shadow-sm">
          <Radio className={`w-3 h-3 text-[#A3E635] ${isEffectivePaused ? 'opacity-40' : 'animate-pulse'}`} />
          <span className="hidden sm:inline">{isEffectivePaused ? 'TICKER PAUSED' : 'AGRI-NEWS TICKER'}</span>
          <span className="sm:hidden">{isEffectivePaused ? 'PAUSED' : 'LIVE'}</span>
        </div>

        {/* Scrolling Marquee Container */}
        <div 
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient Edge Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#04140C] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#04140C] to-transparent z-10 pointer-events-none" />

          <div 
            className="flex items-center gap-8 whitespace-nowrap text-xs"
            style={{
              display: 'inline-flex',
              animation: 'marquee 38s linear infinite',
              animationPlayState: isEffectivePaused ? 'paused' : 'running'
            }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="inline-flex items-center gap-2 text-emerald-100/90 font-medium group cursor-pointer hover:text-white transition-colors"
                onClick={() => item.link && onNavigate(item.link)}
              >
                {item.icon}
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#A3E635] px-1.5 py-0.5 rounded bg-[#1E5E3A]/60 border border-[#A3E635]/20">
                  {item.label}
                </span>
                <span className="text-xs">{item.content}</span>
                {item.link && (
                  <ArrowUpRight className="w-3 h-3 text-[#A3E635] opacity-70 group-hover:opacity-100 transition-opacity" />
                )}
                <span className="text-emerald-800 ml-4 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={togglePause}
          aria-label={isManualPaused ? 'Resume news ticker' : 'Pause news ticker'}
          className="shrink-0 p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#0B2B1B] hover:bg-[#1E5E3A] border border-[#A3E635]/30 text-emerald-300 hover:text-[#A3E635] transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          title={isManualPaused ? 'Play news ticker' : 'Pause news ticker'}
        >
          {isManualPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-[#A3E635] text-[#A3E635]" />
              <span className="hidden md:inline text-[10px] font-mono font-bold text-[#A3E635]">PLAY</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden md:inline text-[10px] font-mono font-bold text-emerald-300">PAUSE</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
