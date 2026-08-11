import React, { useState, useEffect } from 'react';

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
  const [logoSrc, setLogoSrc] = useState<string>(NEW_LOGO_URL);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = NEW_LOGO_URL;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Process pixels: convert white and near-white pixels to transparent alpha
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (r > 215 && g > 215 && b > 215) {
            const minChan = Math.min(r, g, b);
            if (minChan > 238) {
              data[i + 3] = 0; // Pure white -> 100% transparent
            } else {
              // Antialiased edge fading
              data[i + 3] = Math.max(0, Math.floor((238 - minChan) * 11));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const transparentDataUrl = canvas.toDataURL('image/png');
        if (isMounted) {
          setLogoSrc(transparentDataUrl);
        }
      } catch (err) {
        console.warn('Logo background processing fallback:', err);
      }
    };

    return () => {
      isMounted = false;
    };
  }, []);

  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12 md:h-14',
    lg: 'h-14 sm:h-16 md:h-20'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      // Default: reload page / go to home
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
      {/* NO WHITE CONTAINER BOX - Clean transparent logo directly */}
      <img
        src={logoSrc}
        alt="Napoleon Steadings Ltd."
        className={`${heightClasses[size]} w-auto object-contain drop-shadow-md`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
