import React, { useState } from 'react';
import { Truck, Ship, ShieldCheck, Globe, MapPin, CheckCircle2, FileCheck2, Anchor, ArrowRight } from 'lucide-react';
import { QuoteCalculatorModal } from '../components/commerce/QuoteCalculatorModal';

interface PageProps {
  onNavigate: (route: string) => void;
}

export const ExportLogisticsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const exportSpecs = [
    { title: 'FOB Tema Export Port', desc: 'Direct container hauling from Volta Region estates to Tema Port within 4 hours.' },
    { title: 'Phytosanitary Certification', desc: 'Plant Protection & Regulatory Services Directorate (PPRSD) export clearance on every lot.' },
    { title: 'Refrigerated Cold Chain', desc: 'Temperature & humidity controlled containers for fresh chili and perishables.' },
    { title: 'FDA Ghana Compliance', desc: 'Certified heavy-metal and aflatoxin testing laboratory documentation.' },
  ];

  return (
    <div className="min-h-screen bg-[#04140C] text-white pt-24 pb-20 font-sans">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-[#061A10] via-[#04140C] to-[#04140C] border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold uppercase tracking-widest">
            <Anchor className="w-4 h-4" />
            <span>Global Supply Chain & Freight Compliance</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white">
            Export & International Logistics Framework
          </h1>
          <p className="text-base text-emerald-200/90 max-w-3xl leading-relaxed">
            Connecting Volta Region farm gate harvests directly to European Union, North American, and ECOWAS regional trade destinations with seamless phytosanitary clearance and cold chain integrity.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <Ship className="w-4 h-4" />
              <span>Calculate Container Export Rates</span>
            </button>
          </div>
        </div>
      </section>

      {/* Export Capabilities Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exportSpecs.map((spec, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-3 hover:border-[#A3E635]/60 transition-all">
              <CheckCircle2 className="w-8 h-8 text-[#A3E635]" />
              <h3 className="font-editorial text-lg font-bold text-white">{spec.title}</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed">{spec.desc}</p>
            </div>
          ))}
        </div>

        {/* Shipping Route Diagram */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B2B1B] via-[#071910] to-[#0B2B1B] border-2 border-[#1E5E3A] space-y-6">
          <h2 className="font-editorial text-2xl font-bold text-white">Direct Farm-to-Port Transit Pipeline</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            <div className="p-5 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#A3E635]">Stage 1: Farm Gate</span>
              <h4 className="font-bold text-white">Adidome / Sogakope / Ho Estates</h4>
              <p className="text-xs text-emerald-200/80">Harvest, washing, moisture testing & palletization within 12 hours.</p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#A3E635]">Stage 2: Highway Transit</span>
              <h4 className="font-bold text-white">GPS Monitored Fleet Transit</h4>
              <p className="text-xs text-emerald-200/80">4-hour sealed container transit along the Eastern Corridor directly to Tema.</p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#A3E635]">Stage 3: Port Clearance</span>
              <h4 className="font-bold text-white">Tema Port Terminal (FOB / CIF)</h4>
              <p className="text-xs text-emerald-200/80">Phytosanitary inspection, custom seals & ocean liner loading.</p>
            </div>
          </div>
        </div>
      </section>

      <QuoteCalculatorModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
};
