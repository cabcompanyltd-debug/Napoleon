import React, { useState } from 'react';
import { Calculator, Sprout, TrendingUp, DollarSign, Droplets, ArrowRight } from 'lucide-react';
import { Reveal } from '../animations/Reveal';

interface CropOption {
  id: string;
  name: string;
  yieldPerAcreMT: number;
  revenuePerMTGHS: number;
  waterSavedM3: number;
  image: string;
}

const CROPS: CropOption[] = [
  {
    id: 'maize',
    name: 'Yellow Commercial Maize',
    yieldPerAcreMT: 3.8,
    revenuePerMTGHS: 3400,
    waterSavedM3: 120,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'soybean',
    name: 'High-Protein Soybean',
    yieldPerAcreMT: 2.4,
    revenuePerMTGHS: 5200,
    waterSavedM3: 95,
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cassava',
    name: 'High-Starch Yellow Cassava',
    yieldPerAcreMT: 14.5,
    revenuePerMTGHS: 1150,
    waterSavedM3: 180,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pineapple',
    name: 'Smooth Cayenne Pineapple',
    yieldPerAcreMT: 22.0,
    revenuePerMTGHS: 2800,
    waterSavedM3: 240,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=400'
  }
];

export const YieldCalculator: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('maize');
  const [acres, setAcres] = useState<number>(50);

  const selectedCrop = CROPS.find(c => c.id === selectedCropId) || CROPS[0];
  const projectedMT = Math.round(acres * selectedCrop.yieldPerAcreMT);
  const totalRevenueGHS = Math.round(projectedMT * selectedCrop.revenuePerMTGHS);
  const totalWaterSaved = Math.round(acres * selectedCrop.waterSavedM3);

  return (
    <div className="w-full relative py-20 bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white overflow-hidden border-y border-[#1E5E3A]/40">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal variant="fadeDown">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A]/60 backdrop-blur-md border border-[#A3E635]/30 text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-4">
              <Calculator className="w-4 h-4" />
              <span>Interactive Yield & ROI Estimator</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Project Your Harvest & Returns
            </h2>
            <p className="mt-4 text-sm sm:text-base text-emerald-100/80">
              Calculate expected metric tons, estimated gross revenue, and water conservation benefits achieved through Napoleon Steadings' precision mechanization and drip irrigation.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-[#0B2B1B]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#1E5E3A]/40 shadow-2xl space-y-6">
            <div>
              <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-3">
                1. Select Target Crop
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CROPS.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCropId(crop.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                      selectedCropId === crop.id
                        ? 'bg-[#1E5E3A] border-[#A3E635] text-white shadow-lg shadow-[#A3E635]/20 scale-[1.02]'
                        : 'bg-[#061A10]/60 border-[#1E5E3A]/30 text-emerald-100/70 hover:bg-[#1E5E3A]/40'
                    }`}
                  >
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-16 object-cover rounded-xl mb-2"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-bold leading-tight">{crop.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  2. Farm Acreage Size
                </label>
                <span className="text-lg font-extrabold text-[#A3E635] font-num">
                  {acres} Acres
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={acres}
                onChange={(e) => setAcres(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-[#061A10] rounded-lg appearance-none cursor-pointer accent-[#A3E635]"
              />
              <div className="flex justify-between text-[11px] text-emerald-300/60 mt-1 font-mono">
                <span>10 Acres (Smallholder)</span>
                <span>250 Acres (Commercial)</span>
                <span>500 Acres (Enterprise)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#061A10]/80 border border-[#1E5E3A]/30 flex items-center gap-3">
              <Sprout className="w-5 h-5 text-[#A3E635] shrink-0" />
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Estimates based on Volta Region Adaklu/Kpando soil trials using certified seed stocks, solar fertigation, and mechanization services.
              </p>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1E5E3A] to-[#0B2B1B] p-8 rounded-3xl border border-[#A3E635]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <TrendingUp className="w-36 h-36 text-white" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635]">
                Projected Output Overview
              </span>
              <h3 className="font-editorial text-2xl font-bold text-white mt-1">
                {selectedCrop.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0B2B1B]/60 border border-[#A3E635]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#A3E635]/20 text-[#A3E635]">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-200 uppercase font-bold block">Estimated Harvest</span>
                    <span className="text-xs text-emerald-100/70">Metric Tons</span>
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#A3E635] font-num">
                  {projectedMT.toLocaleString()} MT
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B2B1B]/60 border border-[#A3E635]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#A3E635]/20 text-[#A3E635]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-200 uppercase font-bold block">Gross Market Value</span>
                    <span className="text-xs text-emerald-100/70">Est. Price (GHS)</span>
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-num">
                  GHS {totalRevenueGHS.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B2B1B]/60 border border-[#A3E635]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#A3E635]/20 text-[#A3E635]">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-200 uppercase font-bold block">Water Conservation</span>
                    <span className="text-xs text-emerald-100/70">Sub-surface Drip</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-emerald-300 font-num">
                  {totalWaterSaved.toLocaleString()} m³ Saved
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/partnerships')}
              className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl"
            >
              <span>Enroll Acreage into Outgrower Scheme</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
