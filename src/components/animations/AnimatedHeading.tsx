import React from 'react';
import { motion } from 'motion/react';

interface AnimatedHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  highlightWord?: string;
  highlightClass?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0,
  highlightWord,
  highlightClass = 'text-[#A3E635]'
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 100
      }
    }
  };

  return (
    <Component className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        className="inline-wrap"
      >
        {words.map((word, idx) => {
          const isHighlighted = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
          return (
            <motion.span
              key={idx}
              variants={child}
              className={`inline-block mr-[0.25em] ${isHighlighted ? highlightClass : ''}`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
};
