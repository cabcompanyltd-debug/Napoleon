import React from 'react';
import { ArrowRight, CheckCircle2, Tractor, ShieldCheck, Wheat, Sprout, Calendar, Droplet, BarChart3 } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { ImageReveal } from '../components/animations/ImageReveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const CropsPage: React.FC<Props> = ({ onNavigate }) => {
  const cropItems = [
    {
      name: 'Yellow Commercial Maize',
      yield: '3.8 MT / Acre',
      cycle: '110 Days',
      usage: 'Commercial Milling, Poultry Feed & Export',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'High-Protein Soybean',
      yield: '2.4 MT / Acre',
      cycle: '95 Days',
      usage: 'Protein Extraction & Soy Meal Feed',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'High-Starch Yellow Cassava',
      yield: '14.5 MT / Acre',
      cycle: '10 Months',
      usage: 'Industrial Starch & Gluten-Free Flour',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="w-full pt-20 bg-[#061A10] text-white">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] py-20 border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-4 border border-[#A3E635]/30">
            <Wheat className="w-4 h-4" />
            <span>Agriculture Division</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Commercial Crop Farming
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Mechanized grain and tuber cultivation across 2,000+ acres in Adaklu Plains, Volta Region, Ghana.
          </p>
        </div>
      </section>

      {/* DETAILED OVERVIEW */}
      <section className="bg-gradient-to-b from-[#F5F8F4] via-[#FFFFFF] to-[#F5F8F4] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E5E3A] block">
                Adaklu Plains Hub
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0B2B1B]">
                Staple Grain & Tuber Operations
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our flagship commercial crop operations utilize modern tractor mechanization, seed planters, and combine harvesters. Primary yields include yellow and white maize grain, soybeans, yellow cassava, and sesame.
              </p>
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#0B2B1B]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A] shrink-0" />
                  <span className="font-semibold">12,000 Metric Ton Automated Silo Storage Complex</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A] shrink-0" />
                  <span className="font-semibold">Sub-Surface Telemetry Probes & Drip Irrigation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A] shrink-0" />
                  <span className="font-semibold">Aflatoxin-Free Certified Hybrid Seed Stocks</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <ImageReveal
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
                alt="Commercial Crop Field"
                aspectRatio="aspect-4/3"
              />
            </div>
          </div>

          {/* Crop Cards */}
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] mb-8">
              Key Cultivated Crop Profiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cropItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-[#1E5E3A]/20 shadow-xl flex flex-col h-full">
                  <img src={item.image} alt={item.name} className="h-48 w-full object-cover" referrerPolicy="no-referrer" />
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-editorial text-xl font-bold text-[#0B2B1B]">{item.name}</h4>
                      <p className="text-xs text-slate-600 mt-2">{item.usage}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold text-[#1E5E3A]">
                      <div className="bg-[#1E5E3A]/10 p-2 rounded-xl">
                        <span className="block text-[10px] text-slate-500 font-normal">Yield</span>
                        <span>{item.yield}</span>
                      </div>
                      <div className="bg-[#1E5E3A]/10 p-2 rounded-xl">
                        <span className="block text-[10px] text-slate-500 font-normal">Cycle</span>
                        <span>{item.cycle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#061A10] via-[#0B2B1B] to-[#1E5E3A] text-white border border-[#A3E635]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-editorial text-2xl font-bold text-white">Need Bulk Commercial Grain Supply?</h3>
              <p className="text-xs text-emerald-100/80 mt-1">Inspected maize, soybean, and cassava flour shipments available for commercial mills.</p>
            </div>
            <button
              onClick={() => onNavigate('/products')}
              className="px-8 py-4 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shrink-0 shadow-xl"
            >
              <span>View Product Catalog</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
