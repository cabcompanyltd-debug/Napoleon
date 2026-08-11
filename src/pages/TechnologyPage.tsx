import React, { useState } from 'react';
import { Activity, Radio, Cpu, Sun, CloudRain, ShieldCheck, Play, Pause, RefreshCw, Zap } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { StatCounter } from '../components/animations/StatCounter';
import { YieldCalculator } from '../components/home/YieldCalculator';

interface TechnologyPageProps {
  onNavigate: (route: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate }) => {
  const [irrigationState, setIrrigationState] = useState<'Active' | 'Paused'>('Active');
  const [fertigationFlow, setFertigationFlow] = useState(145); // L/min

  const toggleIrrigation = () => {
    setIrrigationState((prev) => (prev === 'Active' ? 'Paused' : 'Active'));
  };

  return (
    <div className="w-full pt-20 bg-[#0A0D0A] text-white min-h-screen">
      {/* HERO */}
      <section className="bg-[#0B2B1B] text-white py-20 border-b border-[#A3E635]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold font-mono mb-4">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Smart Ag Telemetry Network • Volta Region</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Precision Ag & IoT Portal
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Deploying soil moisture telemetry probes, multispectral drone mapping, and solar drip fertigation across 3,500+ acres.
          </p>
        </div>
      </section>

      {/* LIVE TELEMETRY INTERACTIVE DASHBOARD */}
      <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#062114] border border-[#A3E635]/30">
            <div>
              <span className="text-[10px] font-mono text-[#A3E635] uppercase tracking-widest">
                Real-Time Node Telemetry
              </span>
              <h3 className="font-editorial text-2xl font-bold text-white">
                Adaklu & Kpando Drip Fertigation Hub
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleIrrigation}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                  irrigationState === 'Active'
                    ? 'bg-[#A3E635] text-[#0B2B1B]'
                    : 'bg-red-500/80 text-white'
                }`}
              >
                {irrigationState === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Irrigation: {irrigationState}</span>
              </button>
            </div>
          </div>

          {/* Interactive Metric Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#062114] border border-[#1E5E3A] space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase">Sub-surface Soil Moisture</span>
              <div className="flex items-baseline justify-between">
                <span className="font-num text-4xl font-bold text-[#A3E635]">82%</span>
                <span className="text-[10px] text-emerald-200/60 font-mono">Optimal Range</span>
              </div>
              <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-[#A3E635]" style={{ width: '82%' }} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#062114] border border-[#1E5E3A] space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase">Multispectral Crop Health</span>
              <div className="flex items-baseline justify-between">
                <span className="font-num text-4xl font-bold text-[#A3E635]">94%</span>
                <span className="text-[10px] text-emerald-200/60 font-mono">NDVI Biomass</span>
              </div>
              <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-[#A3E635]" style={{ width: '94%' }} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#062114] border border-[#1E5E3A] space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase">Solar Pump fertigation Flow</span>
              <div className="flex items-baseline justify-between">
                <span className="font-num text-4xl font-bold text-white">
                  {irrigationState === 'Active' ? fertigationFlow : 0} <span className="text-sm font-normal text-emerald-300">L/min</span>
                </span>
              </div>
              <span className="text-[10px] text-emerald-300/80 font-mono">Lake Volta Intake Well</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#062114] border border-[#1E5E3A] space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase">Volta Weather Station</span>
              <div className="flex items-baseline justify-between">
                <span className="font-num text-4xl font-bold text-white">28°C</span>
                <span className="text-xs text-emerald-300 font-mono">Humidity: 65%</span>
              </div>
              <span className="text-[10px] text-emerald-300/80 font-mono">Wind: 12 km/h SW</span>
            </div>
          </div>

          {/* Tech Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="p-8 rounded-2xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-white">LoRaWAN Sensor Mesh</h4>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Wireless sensor nodes placed every 10 acres measure soil nitrogen, phosphorus, electrical conductivity, and root depth temperature.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-white">450kW Solar Photovoltaic Pumping</h4>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Zero fossil fuel emissions for irrigation water delivery. Solar power pumps water from Lake Volta and sub-surface Adaklu aquifers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-white">Multispectral Drone Imagery</h4>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Weekly automated drone flights create high-resolution NDVI vegetation maps, detecting crop stress or pest threats weeks before visual onset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGRICULTURAL YIELD CALCULATOR */}
      <YieldCalculator onNavigate={onNavigate} />
    </div>
  );
};
