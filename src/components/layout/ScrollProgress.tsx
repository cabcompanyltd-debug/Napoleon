import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScroll = docHeight - windowHeight;
      if (totalScroll > 0) {
        setScrollPercent((scrollTop / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-black/10">
      <motion.div
        className="h-full bg-gradient-to-r from-[#1E5E3A] via-[#A3E635] to-[#A3E635]"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
};
