import React from 'react';
import { ArrowRight, Sprout, Tractor, Factory, Leaf } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { AnimatedHeading } from '../components/animations/AnimatedHeading';

interface AgricultureProps {
  onNavigate: (route: string) => void;
}

export const AgricultureOverview: React.FC<AgricultureProps> = ({ onNavigate }) => {
  const divisions = [
    {
      title: 'Commercial Crop Farming',
      route: '/agriculture/crops',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      desc: 'Large-scale mechanized cultivation of maize, soybeans, cassava, and sesame with center-pivot solar fertigation.'
    },
    {
      title: 'Pastured Livestock & Poultry',
      route: '/agriculture/livestock',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800',
      desc: 'Ethical pastured cattle breeding, layer hens, broilers, Boer goats, and farm waste biogas recovery.'
    },
    {
      title: 'Horticulture & Greenhouses',
      route: '/agriculture/horticulture',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
      desc: 'Export-grade Smooth Cayenne pineapples, greenhouse tomatoes, and bell peppers grown under shade nets.'
    },
    {
      title: 'Agro-Processing & Milling',
      route: '/agriculture/processing',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800',
      desc: 'High-grade industrial cassava flour milling, optical grain sorting, and temperature-controlled storage.'
    }
  ];

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fadeUp">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
              Agricultural Division
            </span>
            <AnimatedHeading
              text="Our Core Farming & Production Sectors"
              className="font-editorial text-4xl sm:text-6xl font-bold text-white max-w-4xl"
            />
            <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
              Integrating modern machinery, solar water pumping, and sustainable soil stewardship across Volta Region, Ghana.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {divisions.map((div, idx) => (
              <Reveal key={idx} variant="fadeUp" delay={idx * 0.1}>
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#1E5E3A]/15 shadow-xl flex flex-col h-full hover:-translate-y-1.5 transition-all">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] group-hover:text-[#1E5E3A] transition-colors">
                        {div.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {div.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate(div.route)}
                      className="px-6 py-3 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors self-start shadow-md"
                    >
                      <span>Explore Sector</span>
                      <ArrowRight className="w-4 h-4 text-[#A3E635]" />
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
