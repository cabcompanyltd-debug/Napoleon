import React from 'react';
import { Sprout } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const iconContainerSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl',
    lg: 'w-12 h-12 rounded-2xl'
  };

  const sproutIconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-7 h-7'
  };

  const titleSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base md:text-lg',
    lg: 'text-lg sm:text-xl md:text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Test Logo Emblem Badge */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div className={`${iconContainerSizes[size]} bg-gradient-to-br from-[#1E5E3A] via-[#0B2B1B] to-[#062114] border border-[#A3E635]/60 flex items-center justify-center shadow-lg shadow-[#062114]/50 group-hover:border-[#A3E635] group-hover:scale-105 transition-all duration-300`}>
          <Sprout className={`${sproutIconSizes[size]} text-[#A3E635]`} />
        </div>
        {/* Floating Test Badge */}
        <span className="absolute -top-1.5 -right-2 bg-[#A3E635] text-[#062114] text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full border border-[#062114] shadow-md">
          TEST
        </span>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`font-editorial font-bold tracking-tight text-white ${titleSizes[size]}`}>
            NAPOLEON STEADINGS
          </span>
          <span className="text-[9px] font-extrabold text-[#A3E635] uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner">
            TEST LOGO
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-emerald-200/80 font-semibold tracking-wider uppercase mt-0.5">
            AGRICULTURAL ENTERPRISE • VOLTA
          </span>
        )}
      </div>
    </div>
  );
};
