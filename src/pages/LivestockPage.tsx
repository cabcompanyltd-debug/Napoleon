import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageReveal } from '../components/animations/ImageReveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const LivestockPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Agriculture Division
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Pastured Livestock & Poultry
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Ethical pastured cattle breeding, layer hens, broilers, and bio-energy recovery at South Tongu Ranch.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-editorial text-3xl font-bold text-[#0B2B1B]">
                Rotational Pasture & Organic Bio-Power
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Situated in South Tongu, our livestock ranch combines pastured rotational grazing for Sanga and White Fulani cattle with climate-ventilated poultry pens. Organic farm manure is fed into a central biogas digester, powering on-site feed processing.
              </p>
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#0B2B1B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" />
                  <span>Free-Range Pasture Hen Eggs & Grain-Fed Broilers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" />
                  <span>On-Site Veterinary Testing & Bio-Security Protocol</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ImageReveal
                src="https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=1200"
                alt="Pastured Cattle Livestock"
                aspectRatio="aspect-4/3"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
