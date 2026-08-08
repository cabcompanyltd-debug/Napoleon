import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageReveal } from '../components/animations/ImageReveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const AgroProcessingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Agriculture Division
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Agro-Processing & Milling
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            High-grade industrial cassava flour milling, optical grain sorting, and custom packaging at Hohoe Depot.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-editorial text-3xl font-bold text-[#0B2B1B]">
                Value Addition & Post-Harvest Security
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                By processing raw cassava tubers within 24 hours of harvest into High-Grade Cassava Flour (HQCF) and starch, we preserve natural whiteness and gluten-free baking properties while eliminating post-harvest losses.
              </p>
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#0B2B1B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" />
                  <span>Optical Grain Sorting & Dehydration Line</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" />
                  <span>Multi-layer Industrial Packaging for Export</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ImageReveal
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200"
                alt="Agro Processing Operations"
                aspectRatio="aspect-4/3"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
