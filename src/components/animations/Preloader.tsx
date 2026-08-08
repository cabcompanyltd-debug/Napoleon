import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout } from 'lucide-react';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B2B1B] text-[#F9F8F3]"
        >
          <div className="relative flex flex-col items-center max-w-md px-6 text-center">
            {/* Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-[#1E5E3A]/40 border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635] mb-6 shadow-xl shadow-black/40"
            >
              <Sprout className="w-9 h-9 stroke-[1.75]" />
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-editorial text-2xl sm:text-3xl font-semibold tracking-wide text-white uppercase"
            >
              Napoleon Steadings Ltd.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.3 }}
              className="text-xs uppercase tracking-[0.25em] text-[#A3E635] mt-2 font-medium"
            >
              Volta Region • Ghana
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-48 sm:w-64 h-1 bg-emerald-950/80 rounded-full overflow-hidden mt-8 border border-emerald-800/40">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1E5E3A] via-[#A3E635] to-[#A3E635]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <span className="font-num text-[11px] text-emerald-300/70 mt-3 tracking-widest font-mono">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
