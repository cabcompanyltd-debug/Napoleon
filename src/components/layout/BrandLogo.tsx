import React, { useState } from 'react';

export const LOGO_DRIVE_ID = '1lZWOujri5qIT5UPkCdmitM0SXfve9DQ1';
export const FAVICON_DRIVE_ID = '1LiGSBoFUf9wX4yZ6FAjlQT-Y8UXiu5y6';

export const GOOGLE_DRIVE_LOGO_URL = `https://drive.google.com/uc?export=view&id=${LOGO_DRIVE_ID}`;
export const GOOGLE_DRIVE_LH3_LOGO_URL = `https://lh3.googleusercontent.com/d/${LOGO_DRIVE_ID}`;

export const GOOGLE_DRIVE_FAVICON_URL = `https://lh3.googleusercontent.com/d/${FAVICON_DRIVE_ID}`;

export const LOGO_URL = GOOGLE_DRIVE_LOGO_URL;
export const FAVICON_URL = GOOGLE_DRIVE_FAVICON_URL;

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  onClick
}) => {
  const [imgSrc, setImgSrc] = useState<string>(GOOGLE_DRIVE_LOGO_URL);

  const heightClasses = {
    sm: 'h-8 sm:h-10',
    md: 'h-12 sm:h-14 md:h-16',
    lg: 'h-14 sm:h-16 md:h-20',
    xl: 'h-20 sm:h-24 md:h-28'
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
        onError={() => {
          if (imgSrc !== GOOGLE_DRIVE_LH3_LOGO_URL) {
            setImgSrc(GOOGLE_DRIVE_LH3_LOGO_URL);
          }
        }}
        alt="Napoleon Steadings Ltd."
        className={`${heightClasses[size]} w-auto object-contain drop-shadow-md rounded-md`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

