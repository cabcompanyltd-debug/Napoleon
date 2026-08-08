import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  className = ''
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className={`flex flex-col ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="font-num text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#A3E635]"
      >
        {prefix}{count.toLocaleString()}{suffix}
      </motion.div>
      <div className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-100/80">
        {label}
      </div>
    </div>
  );
};
