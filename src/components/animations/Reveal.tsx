import React, { useEffect, useState } from 'react';
import { motion, UseInViewOptions } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  variant?: 'fade' | 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scale' | 'zoom' | 'clip';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
  once = true
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getVariants = () => {
    switch (variant) {
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 }
        };
      case 'fadeDown':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 }
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 }
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.92 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 1.08 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'clip':
        return {
          hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
          visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};
