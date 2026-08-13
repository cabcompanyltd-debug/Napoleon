import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Landmark, ShieldCheck, DollarSign, Download, Users, Leaf, Globe2, ArrowRight, FileText, CheckCircle2, Award, Building2 } from 'lucide-react';
import { QuoteCalculatorModal } from '../components/commerce/QuoteCalculatorModal';

interface PageProps {
  onNavigate: (route: string) => void;
}

export const InvestorRelationsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [pitchName, setPitchName] = useState('');
  const [pitchEmail, setPitchEmail] = useState('');
  const [pitchOrg, setPitchOrg] = useState('');
  const [pitchSent, setPitchSent] = useState(false);

  const esgMetrics = [
    { label: 'Sustainable Hectares Managed', value: '4,500+ Ha', desc: 'Volta Region farm estates & outgrower land' },
    { label: 'Rural Employment Created', value: '1,200+ Jobs', desc: '68% female workforce in farming & processing' },
    { label: 'Annual Carbon Offset', value: '18,500 MT', desc: 'CO2 equivalent sequestered via regenerative agroforestry' },
    { label: 'Water Conservation', value: '42% Reduction', desc: 'Achieved through IoT precision solar drip irrigation' },
  ];

  const investmentPillars = [
    {
      title: 'Commercial Scale Agro-Processing',
      desc: 'Expanding high-starch cassava flour (HQCF), ethanol, and refined chili processing facilities in Adidome and Sogakope to capture high-margin West African industrial demand.',
      icon: Building2,
      returnEst: '18% - 24% IRR Target',
    },
    {
      title: 'Outgrower & Land Lease Partnerships',
      desc: 'Securing long-term 25+ year agricultural land leases and empowering 3,000+ local smallholders with guaranteed off-take pricing.',
      icon: Users,
      returnEst: 'High Social Impact & Fixed Land Appreciation',
    },
    {
      title: 'Export Infrastructure & Cold Chain',
      desc: 'Building temperature-controlled refrigerated logistics connecting Volta Region harvest hubs directly to Tema Export Port for EU and North American markets.',
      icon: Globe2,
      returnEst: 'Hard Currency USD Revenue Stream',
    },
  ];

  const handleRequestPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchEmail) return;
    setPitchSent(true);
  };

  return (
    <div className="min-h-screen bg-[#04140C] text-white pt-24 pb-20 font-sans">
      {/* Hero Header */}
      <section className="relative py-16 bg-gradient-to-b from-[#061A10] via-[#04140C] to-[#04140C] border-b border-[#1E5E3A]/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold uppercase tracking-widest">
              <Landmark className="w-4 h-4" />
              <span>Investor Relations & Executive Growth Prospectus</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold leading-tight text-white">
              Capitalizing on West Africa's Agricultural Transformation
            </h1>
            <p className="text-base text-emerald-200/90 leading-relaxed">
              Napoleon Steadings Ltd combines institutional-grade land management, commercial agro-processing, and regenerative farming practices to yield resilient financial returns and sustainable community impact.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#prospectus-form"
                className="px-6 py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Request Investor Prospectus</span>
              </a>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-black/40 hover:bg-white/10 text-white font-bold text-xs border border-[#1E5E3A] hover:border-[#A3E635] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <DollarSign className="w-4 h-4 text-[#A3E635]" />
                <span>Commercial Produce Quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ESG Impact Metrics */}
      <section className="py-16 bg-[#071910] border-b border-[#1E5E3A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-[#A3E635] tracking-widest">ESG & Sustainability Key Performance Indicators</span>
            <h2 className="font-editorial text-3xl font-bold text-white">Measurable Environmental & Social Footprint</h2>
            <p className="text-xs text-emerald-200/80">Every dollar invested drives climate resilience, food security, and rural empowerment in Ghana.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {esgMetrics.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-2 relative group hover:border-[#A3E635]/60 transition-all">
                <span className="text-3xl font-black font-editorial text-[#A3E635] block">{m.value}</span>
                <h3 className="font-bold text-sm text-white">{m.label}</h3>
                <p className="text-xs text-emerald-200/70">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Investment Opportunities */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#A3E635]">Growth Vector Highlights</span>
          <h2 className="font-editorial text-3xl font-bold text-white">Institutional Investment Pillars</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investmentPillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div key={idx} className="p-8 rounded-3xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-5 flex flex-col justify-between hover:border-[#A3E635]/60 transition-all shadow-xl">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center border border-[#A3E635]/40 shadow-lg">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-4 border-t border-[#1E5E3A] text-xs font-bold text-[#A3E635] flex items-center justify-between">
                  <span>Target Return:</span>
                  <span className="font-mono">{p.returnEst}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Section */}
        <div id="prospectus-form" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B2B1B] to-[#071910] border-2 border-[#A3E635]/40 shadow-2xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="font-editorial text-2xl font-bold text-white">Request Executive Financial Prospectus</h3>
            <p className="text-xs text-emerald-200/80">
              Complete the inquiry form below to receive the confidential 2026-2030 Executive Pitch Deck and financial model audited by our commercial investment team.
            </p>
          </div>

          {pitchSent ? (
            <div className="p-6 rounded-2xl bg-[#1E5E3A]/60 border border-[#A3E635] text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#A3E635] mx-auto" />
              <h4 className="font-editorial text-xl font-bold text-white">Prospectus Request Received</h4>
              <p className="text-xs text-emerald-100">
                Our Chief Financial Officer will review your request and transmit the investor memorandum to <strong>{pitchEmail}</strong> within 12 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestPitch} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={pitchName}
                onChange={(e) => setPitchName(e.target.value)}
                className="bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Institutional / Business Email"
                value={pitchEmail}
                onChange={(e) => setPitchEmail(e.target.value)}
                className="bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Organization / Investment Fund"
                value={pitchOrg}
                onChange={(e) => setPitchOrg(e.target.value)}
                className="bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="sm:col-span-3 py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                Submit Prospectus Request
              </button>
            </form>
          )}
        </div>
      </section>

      <QuoteCalculatorModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
};
