import React, { useState } from 'react';
import { MapPin, Filter, ArrowRight, Layers, Compass, Building2 } from 'lucide-react';
import { FARMS_DATA } from '../data/companyData';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { Reveal } from '../components/animations/Reveal';

interface FarmsPageProps {
  onNavigate: (route: string) => void;
}

export const FarmsPage: React.FC<FarmsPageProps> = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const farmTypes = ['All', 'Commercial Crop', 'Horticulture & Greenhouse', 'Livestock & Poultry', 'Agro-Processing & Logistics'];

  const filteredFarms = selectedType === 'All'
    ? FARMS_DATA
    : FARMS_DATA.filter((f) => f.farmType === selectedType);

  return (
    <div className="w-full pt-20 bg-[#061A10] text-white">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-20 border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-4 border border-[#A3E635]/30">
            <Compass className="w-4 h-4" />
            <span>Operational Holdings Directory</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Our Primary Farm Estates
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Interactive map and profiles of Napoleon Steadings Ltd. operational holdings across Volta Region, Ghana.
          </p>
        </div>
      </section>

      {/* REAL LEAFLET MAP SECTION */}
      <section className="bg-[#04120B] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 text-white">
            <h3 className="font-editorial text-xl font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#A3E635]" />
              <span>Interactive Regional Map (Volta Region)</span>
            </h3>
            <span className="text-xs text-[#A3E635] font-mono bg-[#1E5E3A]/40 px-3 py-1 rounded-full border border-[#A3E635]/30">
              5 Active Sites Geolocated
            </span>
          </div>
          <InteractiveMap heightClass="h-[500px]" showAllFarms={true} />
        </div>
      </section>

      {/* FARMS DIRECTORY CARDS WITH FILTER */}
      <section className="bg-gradient-to-b from-[#F5F8F4] via-[#FFFFFF] to-[#F5F8F4] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E5E3A]">
              <Filter className="w-4 h-4" />
              <span>Filter By Sector:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {farmTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedType === type
                      ? 'bg-[#1E5E3A] text-[#A3E635] shadow-lg shadow-[#1E5E3A]/30 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFarms.map((farm) => (
              <Reveal key={farm.id} variant="fadeUp">
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#1E5E3A]/20 shadow-xl flex flex-col h-full hover:-translate-y-2 transition-all">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={farm.heroImage}
                      alt={farm.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B2B1B]/90 text-[#A3E635] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#A3E635]/30">
                      {farm.farmType}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#1E5E3A]" />
                        <span>{farm.location}</span>
                      </div>
                      <h3 className="font-editorial text-xl font-bold text-[#0B2B1B] group-hover:text-[#1E5E3A] transition-colors">
                        {farm.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                        {farm.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex justify-between text-slate-700">
                        <span className="font-semibold">Farmland Size:</span>
                        <span className="font-bold text-[#1E5E3A]">{farm.sizeAcres} Acres</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span className="font-semibold">Primary Output:</span>
                        <span className="font-medium text-slate-900">{farm.mainCrops.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(`/operations/farms/${farm.slug}`)}
                      className="w-full py-3.5 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors mt-2 shadow-md"
                    >
                      <span>View Estate Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
