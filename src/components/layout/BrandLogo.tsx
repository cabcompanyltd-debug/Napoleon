import React from 'react';
import logoImg from '../../assets/logo.png';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = ''
}) => {
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14 md:h-16',
    lg: 'h-16 sm:h-20 md:h-24'
  };

  return (
    <div className={`flex items-center gap-2 select-none py-1 ${className}`}>
      <div className="bg-white/95 p-1.5 sm:p-2 rounded-xl shadow-md border border-[#A3E635]/40 flex items-center justify-center transition-transform hover:scale-[1.02]">
        <img
          src={logoImg}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (!target.src.endsWith('/logo.png')) {
              target.src = '/logo.png';
            }
          }}
          alt="Napoleon Steadings Ltd."
          className={`${heightClasses[size]} w-auto object-contain`}
        />
      </div>
    </div>
  );
};
