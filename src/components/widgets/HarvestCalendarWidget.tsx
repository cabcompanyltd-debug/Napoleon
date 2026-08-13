import React, { useState } from 'react';
import { Calendar, Sprout, ArrowUpRight, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

interface CropHarvestSeason {
  id: string;
  cropName: string;
  category: string;
  plantingMonths: string;
  peakHarvestMonths: string;
  estYieldPerHectare: string;
  primaryLocation: string;
  activeStatus: 'Planting Season' | 'Growth Phase' | 'Peak Harvest' | 'Off-Season Processing';
  monthsActive: number[]; // 1 to 12
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const HARVEST_DATA: CropHarvestSeason[] = [
  {
    id: 'cassava',
    cropName: 'Industrial Cassava (High Starch)',
    category: 'Root Tuber & Starch',
    plantingMonths: 'Apr - Jun',
    peakHarvestMonths: 'Year-Round (Peak: May - Nov)',
    estYieldPerHectare: '28 - 35 Metric Tonnes',
    primaryLocation: 'Adidome & Sogakope Estates',
    activeStatus: 'Peak Harvest',
    monthsActive: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'chili',
    cropName: 'Scotch Bonnet & Birdseye Chili',
    category: 'Horticulture & Spice',
    plantingMonths: 'Oct - Nov (Irrigated)',
    peakHarvestMonths: 'Feb - Jul',
    estYieldPerHectare: '12 - 16 Metric Tonnes',
    primaryLocation: 'Sogakope Irrigation Sector',
    activeStatus: 'Peak Harvest',
    monthsActive: [2, 3, 4, 5, 6, 7],
  },
  {
    id: 'maize',
    cropName: 'Quality Protein Corn (Yellow/White)',
    category: 'Grains & Animal Feed',
    plantingMonths: 'Apr - May & Aug - Sep',
    peakHarvestMonths: 'Jul - Aug & Nov - Dec',
    estYieldPerHectare: '6 - 8 Metric Tonnes',
    primaryLocation: 'Ho Plateau Sector B',
    activeStatus: 'Growth Phase',
    monthsActive: [7, 8, 11, 12],
  },
  {
    id: 'sweet-potato',
    cropName: 'Orange-Fleshed Sweet Potato',
    category: 'Bio-Fortified Tuber',
    plantingMonths: 'May - Jun',
    peakHarvestMonths: 'Sep - Nov',
    estYieldPerHectare: '18 - 22 Metric Tonnes',
    primaryLocation: 'Central Tongu Alluvial Plain',
    activeStatus: 'Growth Phase',
    monthsActive: [9, 10, 11],
  },
  {
    id: 'plantain',
    cropName: 'Commercial Plantain & Banana',
    category: 'Tree Crop & Fruit',
    plantingMonths: 'May - Jul',
    peakHarvestMonths: 'Aug - Jan',
    estYieldPerHectare: '22 - 26 Metric Tonnes',
    primaryLocation: 'Ho Valley Sector',
    activeStatus: 'Peak Harvest',
    monthsActive: [1, 8, 9, 10, 11, 12],
  },
];

interface HarvestCalendarProps {
  onOpenQuoteModal?: () => void;
}

export const HarvestCalendarWidget: React.FC<HarvestCalendarProps> = ({ onOpenQuoteModal }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('cassava');

  const crop = HARVEST_DATA.find((c) => c.id === selectedCrop) || HARVEST_DATA[0];

  return (
    <div className="rounded-3xl bg-[#061A10] text-white p-6 sm:p-8 border border-[#1E5E3A]/80 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E5E3A]/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#A3E635] bg-[#1E5E3A]/60 px-3 py-1 rounded-full border border-[#A3E635]/30 mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Volta Region Harvest Schedule</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-white">
            Interactive Harvest Calendar & Yield Forecast
          </h3>
          <p className="text-xs text-emerald-200/80 mt-1">
            Plan commercial off-take agreements according to Volta Region harvest windows.
          </p>
        </div>

        {onOpenQuoteModal && (
          <button
            onClick={onOpenQuoteModal}
            className="px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-lg shrink-0"
          >
            <Scale className="w-4 h-4" />
            <span>Request Produce Quote</span>
          </button>
        )}
      </div>

      {/* Crop Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {HARVEST_DATA.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCrop(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              selectedCrop === c.id
                ? 'bg-[#A3E635] text-[#0B2B1B] font-extrabold shadow-md'
                : 'bg-black/40 text-emerald-200 border border-[#1E5E3A] hover:bg-[#1E5E3A]/50'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>{c.cropName.split('(')[0]}</span>
          </button>
        ))}
      </div>

      {/* Selected Crop Season Timeline */}
      <div className="p-5 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#A3E635]">
              {crop.category} • {crop.primaryLocation}
            </span>
            <h4 className="font-editorial text-xl font-bold text-white">{crop.cropName}</h4>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-extrabold border border-[#A3E635]/30 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Status: {crop.activeStatus}</span>
          </span>
        </div>

        {/* 12-Month Harvest Bar Visualizer */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-emerald-300 block">
            Annual Harvest Availability Matrix (Active Harvest Months Highlighted):
          </span>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 text-center">
            {MONTHS.map((month, idx) => {
              const monthNum = idx + 1;
              const isActive = crop.monthsActive.includes(monthNum);
              return (
                <div
                  key={month}
                  className={`p-2 rounded-xl border text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-[#A3E635] text-[#0B2B1B] font-black border-[#A3E635] shadow-md scale-105'
                      : 'bg-[#0B2B1B]/40 text-emerald-400/40 border-[#1E5E3A]/40'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold">{month}</div>
                  <div className="text-[9px] mt-0.5">{isActive ? 'HARVEST' : '—'}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specs breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3 rounded-xl bg-[#0B2B1B] border border-[#1E5E3A]">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">Planting Window</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{crop.plantingMonths}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0B2B1B] border border-[#1E5E3A]">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">Peak Harvest Window</span>
            <span className="text-xs font-bold text-[#A3E635] mt-0.5 block">{crop.peakHarvestMonths}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0B2B1B] border border-[#1E5E3A]">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">Est. Yield / Hectare</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{crop.estYieldPerHectare}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
