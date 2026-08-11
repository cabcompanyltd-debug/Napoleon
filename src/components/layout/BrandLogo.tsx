import React, { useState } from 'react';

export const DRIVE_FILE_ID = '1lZWOujri5qIT5UPkCdmitM0SXfve9DQ1';
export const GOOGLE_DRIVE_LOGO_URL = `https://drive.google.com/uc?export=view&id=${DRIVE_FILE_ID}`;
export const GOOGLE_DRIVE_LH3_URL = `https://lh3.googleusercontent.com/d/${DRIVE_FILE_ID}`;

export const LOGO_URL = GOOGLE_DRIVE_LOGO_URL;
export const FAVICON_URL = GOOGLE_DRIVE_LH3_URL;

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
          if (imgSrc !== GOOGLE_DRIVE_LH3_URL) {
            setImgSrc(GOOGLE_DRIVE_LH3_URL);
          }
        }}
        alt="Napoleon Steadings Ltd."
        className={`${heightClasses[size]} w-auto object-contain drop-shadow-md rounded-md`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

