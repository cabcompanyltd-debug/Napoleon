import React, { useState } from 'react';
import { CloudSun, Droplets, Thermometer, Wind, Sprout, MapPin, RefreshCw, Sun, CloudRain } from 'lucide-react';

interface FarmWeatherStation {
  id: string;
  location: string;
  district: string;
  siteName: string;
  tempC: number;
  condition: string;
  humidity: number;
  rainfallMm: number;
  windKmH: number;
  soilMoisturePct: number;
  soilTempC: number;
  irrigationStatus: string;
}

const VOLTA_STATIONS: FarmWeatherStation[] = [
  {
    id: 'adidome-central',
    location: 'Adidome',
    district: 'Central Tongu',
    siteName: 'Adidome Industrial Cassava Estate',
    tempC: 31,
    condition: 'Optimal Growing Sun',
    humidity: 68,
    rainfallMm: 4.2,
    windKmH: 12,
    soilMoisturePct: 42,
    soilTempC: 27,
    irrigationStatus: 'Solar Drip Active (Sector 3)',
  },
  {
    id: 'sogakope-south',
    location: 'Sogakope',
    district: 'South Tongu',
    siteName: 'Sogakope Irrigation Chili Field',
    tempC: 33,
    condition: 'Warm Riverine Breeze',
    humidity: 72,
    rainfallMm: 0.0,
    windKmH: 15,
    soilMoisturePct: 48,
    soilTempC: 28,
    irrigationStatus: 'River Pumping Active (Sector 1 & 2)',
  },
  {
    id: 'ho-plateau',
    location: 'Ho Valley',
    district: 'Ho Municipal',
    siteName: 'Ho Plateau Maize & Horticulture Sector',
    tempC: 28,
    condition: 'Scattered Plateau Clouds',
    humidity: 78,
    rainfallMm: 12.5,
    windKmH: 9,
    soilMoisturePct: 56,
    soilTempC: 25,
    irrigationStatus: 'Natural Rainfall Inflow',
  },
];

export const VoltaWeatherWidget: React.FC = () => {
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const station = VOLTA_STATIONS[selectedStationIndex];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white p-6 sm:p-8 border border-[#1E5E3A]/80 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10 border-b border-[#1E5E3A]/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#A3E635] bg-[#1E5E3A]/60 px-3 py-1 rounded-full border border-[#A3E635]/30 mb-2">
            <CloudSun className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Farm Gate Microclimate Stations</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-white">
            Volta Region Live Farm Weather & Soil Telemetry
          </h3>
          <p className="text-xs text-emerald-200/80 mt-1">
            Real-time IoT weather monitoring across Napoleon Steadings farm sites.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] border border-[#A3E635]/40 text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-md"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh IoT Feed</span>
        </button>
      </div>

      {/* Station Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {VOLTA_STATIONS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setSelectedStationIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              selectedStationIndex === idx
                ? 'bg-[#A3E635] text-[#0B2B1B] shadow-lg font-extrabold scale-[1.02]'
                : 'bg-black/40 text-emerald-200 border border-[#1E5E3A] hover:bg-[#1E5E3A]/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{s.location} ({s.district})</span>
          </button>
        ))}
      </div>

      {/* Main Weather Card Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Main Temperature Hero */}
        <div className="p-5 rounded-2xl bg-black/50 border border-[#1E5E3A] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/80">
              {station.siteName}
            </span>
            <div className="flex items-center gap-3 mt-3">
              <div className="text-5xl font-black font-editorial text-white">
                {station.tempC}°<span className="text-2xl text-[#A3E635]">C</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#A3E635] block">{station.condition}</span>
                <span className="text-[11px] text-emerald-200/80 block">Soil Temp: {station.soilTempC}°C</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-300 font-mono">
            Status: <strong className="text-white font-sans">{station.irrigationStatus}</strong>
          </div>
        </div>

        {/* Atmosphere Telemetry Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-[#1E5E3A]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>Humidity</span>
            </div>
            <div className="text-xl font-bold text-white">{station.humidity}%</div>
            <p className="text-[10px] text-emerald-400/80">Relative moisture</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-[#1E5E3A]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>Rainfall</span>
            </div>
            <div className="text-xl font-bold text-white">{station.rainfallMm} <span className="text-xs font-normal">mm</span></div>
            <p className="text-[10px] text-emerald-400/80">Last 24 hours</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-[#1E5E3A]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <Wind className="w-4 h-4 text-teal-300" />
              <span>Wind Speed</span>
            </div>
            <div className="text-xl font-bold text-white">{station.windKmH} <span className="text-xs font-normal">km/h</span></div>
            <p className="text-[10px] text-emerald-400/80">Volta river breeze</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-[#1E5E3A]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#A3E635]">
              <Sprout className="w-4 h-4 text-[#A3E635]" />
              <span>Soil Moisture</span>
            </div>
            <div className="text-xl font-bold text-[#A3E635]">{station.soilMoisturePct}%</div>
            <p className="text-[10px] text-emerald-400/80">Root zone moisture</p>
          </div>
        </div>

        {/* Farm Gate Summary Notice */}
        <div className="p-5 rounded-2xl bg-[#0F3520]/80 border border-[#1E5E3A] flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-[#A3E635] uppercase tracking-wider">
              Agronomic Conditions Assessment
            </h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Volta Basin soil telemetry indicates prime conditions for high-starch root expansion and chili flowering across all active sectors.
            </p>
          </div>

          <div className="pt-3 border-t border-emerald-800/60 text-[11px] text-emerald-300/90 flex items-center justify-between">
            <span>FDA Standards: Compliant</span>
            <span className="text-[#A3E635] font-bold">100% Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
