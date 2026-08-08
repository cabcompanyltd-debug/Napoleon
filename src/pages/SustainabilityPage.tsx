import React from 'react';
import { Leaf, Droplets, Sun, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { ImageReveal } from '../components/animations/ImageReveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const SustainabilityPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Environmental Stewardship
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Sustainability & Soil Conservation
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Preserving Volta Region ecosystems through solar fertigation, zero-burning land clearance, and smallholder empowerment.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-lg space-y-4">
              <Droplets className="w-8 h-8 text-[#1E5E3A]" />
              <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B]">45% Water Saved/Yr</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sub-surface drip fertigation delivers micro-doses directly to root zones, eliminating evaporation loss typical of flood irrigation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-lg space-y-4">
              <Sun className="w-8 h-8 text-[#1E5E3A]" />
              <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B]">Zero-Fossil Water Pumping</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our 450kW solar array powers water extraction from Lake Volta and Adaklu wells without diesel carbon emissions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-lg space-y-4">
              <Users className="w-8 h-8 text-[#1E5E3A]" />
              <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B]">420+ Outgrowers Empowered</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Equipping local farming families with certified seeds, tractor tillage, and guaranteed market off-take agreements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
