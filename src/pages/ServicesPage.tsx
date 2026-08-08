import React from 'react';
import { Tractor, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';
import { Reveal } from '../components/animations/Reveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const ServicesPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Commercial Services
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Agricultural Services & Equipment Leasing
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Providing mechanized land clearing, tractor tillage, drone crop spraying, and cold-chain transport for commercial farms across Ghana.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES_DATA.map((srv) => (
              <Reveal key={srv.id} variant="fadeUp">
                <div className="p-8 rounded-3xl bg-white border border-[#1E5E3A]/15 shadow-xl space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center">
                    <Tractor className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B]">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{srv.shortDesc}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E5E3A]">Capabilities: {srv.capabilities.slice(0, 2).join(', ')}</span>
                    <button
                      onClick={() => onNavigate('/contact')}
                      className="px-4 py-2 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <span>Inquire Service</span>
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
