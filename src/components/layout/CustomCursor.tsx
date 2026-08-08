import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-interactive');
      const imageTarget = target.closest('.group, img, .cursor-view');

      if (imageTarget && !interactive) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (interactive) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full bg-[#A3E635] text-[#0B2B1B] font-bold text-[10px] tracking-wider shadow-lg mix-blend-difference"
      animate={{
        x: position.x - (isHovered ? 24 : 6),
        y: position.y - (isHovered ? 24 : 6),
        width: isHovered ? (cursorText ? 52 : 36) : 12,
        height: isHovered ? (cursorText ? 52 : 36) : 12,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
    >
      {cursorText}
    </motion.div>
  );
};
