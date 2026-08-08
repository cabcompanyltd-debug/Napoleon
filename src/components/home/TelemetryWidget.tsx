import React, { useState, useEffect } from 'react';
import { Activity, CloudSun, Thermometer, Droplet, Sun, ShieldCheck, Cpu } from 'lucide-react';

export const TelemetryWidget: React.FC = () => {
  const [soilMoisture, setSoilMoisture] = useState(38);
  const [temp, setTemp] = useState(29);
  const [solarKw, setSolarKw] = useState(412);

  // Slight jitter for live feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setSoilMoisture((prev) => Math.min(45, Math.max(32, prev + (Math.random() - 0.5) * 1.5)));
      setTemp((prev) => Math.min(32, Math.max(27, prev + (Math.random() - 0.5) * 0.4)));
      setSolarKw((prev) => Math.min(450, Math.max(390, prev + (Math.random() - 0.5) * 5)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#04120B] text-white border-y border-[#1E5E3A]/40 py-3.5 px-4 sm:px-8 shadow-inner overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        {/* Live Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A3E635]"></span>
          </span>
          <span className="font-bold text-[#A3E635] tracking-wider uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> Volta IoT Sensor Network Live
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 text-emerald-200/90">
          <div className="flex items-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5 text-[#A3E635]" />
            <span className="text-emerald-400/70">Ho Region:</span>
            <span className="font-bold text-white font-num">{temp.toFixed(1)}°C Sunny</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-emerald-400/70">Adaklu Soil Moisture:</span>
            <span className="font-bold text-white font-num">{soilMoisture.toFixed(1)}% Optimal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-emerald-400/70">Solar Power Output:</span>
            <span className="font-bold text-white font-num">{solarKw.toFixed(0)} kW</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
            <span className="text-emerald-400/70">Hohoe Silo Storage:</span>
            <span className="font-bold text-white font-num">12,000 MT Capacity (88% Full)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
