import React from 'react';
import { MapPin, ArrowLeft, CheckCircle2, Shield, Droplets } from 'lucide-react';
import { FARMS_DATA } from '../data/companyData';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { ImageReveal } from '../components/animations/ImageReveal';

interface FarmDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const FarmDetailPage: React.FC<FarmDetailPageProps> = ({ slug, onNavigate }) => {
  const farm = FARMS_DATA.find((f) => f.slug === slug) || FARMS_DATA[0];

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/operations/farms')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3E635] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Farms</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block mb-2">
            {farm.farmType} • {farm.status}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white">{farm.name}</h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200 mt-2">
            <MapPin className="w-4 h-4 text-[#A3E635]" />
            <span>{farm.location}, {farm.region}</span>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl overflow-hidden aspect-16/10 shadow-2xl border border-[#1E5E3A]/20">
                <img src={farm.heroImage} alt={farm.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] mb-3">Estate Overview</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{farm.description}</p>
              </div>

              <div>
                <h3 className="font-editorial text-xl font-bold text-[#0B2B1B] mb-3">On-Site Infrastructure</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {farm.infrastructure.map((inf, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-[#1E5E3A]/15 text-xs text-[#0B2B1B] font-medium flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1E5E3A] shrink-0" />
                      <span>{inf}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="p-6 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-lg space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-[#1E5E3A]">Estate Specifications</h4>
                <div className="space-y-3 text-xs divide-y divide-slate-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-1 sm:gap-2">
                    <span className="text-slate-500 font-semibold">Total Acreage:</span>
                    <span className="font-bold text-[#0B2B1B]">{farm.sizeAcres} Acres</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-1 sm:gap-2">
                    <span className="text-slate-500 font-semibold">District:</span>
                    <span className="font-bold text-[#0B2B1B]">{farm.district}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-1 sm:gap-2">
                    <span className="text-slate-500 font-semibold">Water Source:</span>
                    <span className="font-bold text-[#0B2B1B]">{farm.irrigationSource}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-1 sm:gap-2">
                    <span className="text-slate-500 font-semibold">Primary Output:</span>
                    <span className="font-bold text-[#1E5E3A]">{farm.mainCrops.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-[#1E5E3A] mb-3">Geographic Map Position</h4>
                <InteractiveMap
                  initialCenter={farm.coordinates}
                  initialZoom={12}
                  heightClass="h-[300px]"
                  showAllFarms={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
