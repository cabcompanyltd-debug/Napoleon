import React from 'react';
import { motion } from 'motion/react';

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-16/10',
  className = '',
  delay = 0,
  duration = 0.8
}) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#0B2B1B]/10 ${aspectRatio} ${className}`}>
      <motion.div
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
        whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="w-full h-full relative"
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: duration * 1.2,
            delay,
            ease: 'easeOut'
          }}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};
