import React, { useState } from 'react';

export const NEW_LOGO_URL = 'https://82qu5ey7.us-east.insforge.app/788db57f-1cc3-4575-a74f-fc44c1a2ec6d';
export const NEW_FAVICON_URL = 'https://82qu5ey7.us-east.insforge.app/52bdc0b2-33f7-42d3-a870-868ed6e6ff62';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  onClick
}) => {
  const [imgSrc, setImgSrc] = useState<string>(NEW_LOGO_URL);

  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12 md:h-14',
    lg: 'h-14 sm:h-16 md:h-20'
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      if (window.location.pathname === '/') {
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`inline-flex items-center gap-2 select-none py-1 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      title="Napoleon Steadings Ltd. - Click to reload home"
    >
      <img
        src={imgSrc}
        onError={() => setImgSrc('/logo.png')}
        alt="Napoleon Steadings Ltd."
        className={`${heightClasses[size]} w-auto object-contain drop-shadow-md`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
