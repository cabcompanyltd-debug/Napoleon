import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, ArrowRight, MapPin, Tractor, ShieldCheck, Leaf, Activity, 
  ChevronRight, Phone, Award, Globe, Building2, Cpu, CheckCircle2, 
  BarChart3, Sparkles, Compass, Wheat, Factory, Truck, Users, Droplets
} from 'lucide-react';
import { COMPANY_INFO, FARMS_DATA, PRODUCTS_DATA, PROJECTS_DATA, NEWS_DATA } from '../data/companyData';
import { Reveal } from '../components/animations/Reveal';
import { ImageReveal } from '../components/animations/ImageReveal';
import { AnimatedHeading } from '../components/animations/AnimatedHeading';
import { StatCounter } from '../components/animations/StatCounter';
import { TelemetryWidget } from '../components/home/TelemetryWidget';
import { YieldCalculator } from '../components/home/YieldCalculator';
import { NewsTicker } from '../components/home/NewsTicker';

interface HomeProps {
  onNavigate: (route: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [activeAgCategory, setActiveAgCategory] = useState<'crops' | 'livestock' | 'horticulture' | 'processing'>('crops');

  const agCategories = {
    crops: {
      title: 'Commercial Crop Farming',
      subtitle: 'Mechanized grain and tuber cultivation across 2,000+ acres in Adaklu Plains.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
      highlights: ['Maize & Soybean Silo Storage', 'Drip & Pivot Irrigation', 'Sub-Surface Soil Telemetry'],
      route: '/agriculture/crops',
      icon: Wheat
    },
    livestock: {
      title: 'Integrated Pastured Livestock',
      subtitle: 'Sustainable cattle breeding, free-range layer poultry, and organic bio-energy.',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=1200',
      highlights: ['Sanga & White Fulani Breeds', 'Pasture-Raised Hen Eggs', 'Biogas Waste Power Generation'],
      route: '/agriculture/livestock',
      icon: Sprout
    },
    horticulture: {
      title: 'Export Horticulture & Greenhouses',
      subtitle: 'Precision fruit orchards and climate-controlled shade-net greenhouses.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200',
      highlights: ['Smooth Cayenne Pineapples', 'Pesticide-Free Bell Peppers', 'Lake Volta Drip Irrigation'],
      route: '/agriculture/horticulture',
      icon: Leaf
    },
    processing: {
      title: 'Agro-Processing & Logistics',
      subtitle: 'Converting raw farm yields into high-grade cassava starch, flour, and packaged juices.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200',
      highlights: ['High-Grade Cassava Flour Mill', 'Optical Grain Sorting Line', 'Refrigerated Cold Transport'],
      route: '/agriculture/processing',
      icon: Factory
    }
  };

  return (
    <div className="w-full space-y-0 bg-[#061A10] text-white pt-24 sm:pt-28 lg:pt-32">
      {/* ANIMATED HORIZONTAL NEWS TICKER */}
      <div className="relative z-30 w-full mb-3">
        <NewsTicker onNavigate={onNavigate} />
      </div>

      {/* HERO SECTION WITH PREMIUM FULL-COVER AGRICULTURE PHOTOGRAPH */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#061A10]">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#A3E635]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* High-Resolution Modern African Agriculture Photograph */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2400"
            alt="Napoleon Steadings Commercial Agriculture Farmland Volta Region"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'easeOut' }}
            className="w-full h-full object-cover object-[center_35%] filter brightness-[0.85] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          {/* Dual Balanced Gradient Overlays: Ensure crisp typography legibility while keeping the lush green farm visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#04140C]/90 via-[#061A10]/75 to-[#0B2B1B]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061A10] via-transparent to-[#04140C]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 text-center sm:text-left">
              <Reveal variant="fadeDown" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E5E3A]/80 backdrop-blur-md border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold tracking-wider uppercase mb-6 shadow-xl">
                  <MapPin className="w-4 h-4 text-[#A3E635]" />
                  <span>Headquartered in Ho, Volta Region, Ghana</span>
                  <Sparkles className="w-3.5 h-3.5 ml-1 text-[#A3E635] animate-pulse" />
                </div>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                  GROWING TODAY. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-emerald-200 to-white">
                    BUILDING TOMORROW.
                  </span>
                </h1>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.3}>
                <p className="mt-6 text-base sm:text-xl text-emerald-100/90 max-w-2xl font-light leading-relaxed">
                  {COMPANY_INFO.subtitle}
                </p>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.4}>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => onNavigate('/agriculture')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#A3E635]/25"
                  >
                    <span>Explore Our Agriculture</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => onNavigate('/partnerships')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1E5E3A]/70 hover:bg-[#1E5E3A] text-white border border-[#A3E635]/40 font-bold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all duration-300"
                  >
                    <Users className="w-5 h-5 text-[#A3E635]" />
                    <span>Partner With Us</span>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: 3D Glassmorphic Live Operational Card */}
            <div className="lg:col-span-5">
              <Reveal variant="scale" delay={0.3}>
                <div className="glass-card-dark rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden border border-[#A3E635]/30">
                  <div className="flex items-center justify-between border-b border-[#1E5E3A]/40 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#1E5E3A] text-[#A3E635]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-editorial text-lg font-bold text-white">Ho Corporate Hub</h3>
                        <p className="text-[11px] text-emerald-300">Volta Region Command Center</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#A3E635] text-[10px] font-bold uppercase border border-[#A3E635]/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-ping" />
                      OPERATIONAL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#061A10]/80 border border-[#1E5E3A]/30">
                      <div className="flex items-center gap-2 text-emerald-300 text-xs mb-1">
                        <Tractor className="w-4 h-4 text-[#A3E635]" />
                        <span>Farmland</span>
                      </div>
                      <span className="text-2xl font-extrabold text-white font-num">3,500+</span>
                      <p className="text-[10px] text-emerald-200/70 mt-0.5">Acres Under Cultivation</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#061A10]/80 border border-[#1E5E3A]/30">
                      <div className="flex items-center gap-2 text-emerald-300 text-xs mb-1">
                        <Wheat className="w-4 h-4 text-[#A3E635]" />
                        <span>Annual Yield</span>
                      </div>
                      <span className="text-2xl font-extrabold text-white font-num">18,500</span>
                      <p className="text-[10px] text-emerald-200/70 mt-0.5">Metric Tons Capacity</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#061A10]/80 border border-[#1E5E3A]/30">
                      <div className="flex items-center gap-2 text-emerald-300 text-xs mb-1">
                        <Users className="w-4 h-4 text-[#A3E635]" />
                        <span>Outgrowers</span>
                      </div>
                      <span className="text-2xl font-extrabold text-white font-num">420+</span>
                      <p className="text-[10px] text-emerald-200/70 mt-0.5">Volta Farmers Partnered</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#061A10]/80 border border-[#1E5E3A]/30">
                      <div className="flex items-center gap-2 text-emerald-300 text-xs mb-1">
                        <Droplets className="w-4 h-4 text-[#A3E635]" />
                        <span>Water Saved</span>
                      </div>
                      <span className="text-2xl font-extrabold text-[#A3E635] font-num">45%</span>
                      <p className="text-[10px] text-emerald-200/70 mt-0.5">Via Solar Drip Tech</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('/about')}
                      className="w-full py-3 rounded-xl bg-[#1E5E3A] hover:bg-[#287547] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-[#A3E635]/30"
                    >
                      <Compass className="w-4 h-4 text-[#A3E635]" />
                      <span>Learn About Our Enterprise</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* LIVE TELEMETRY TICKER */}
      <TelemetryWidget />

      {/* STATISTICS & METRICS SECTION */}
      <section className="bg-gradient-to-b from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-12 sm:py-16 border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 text-center">
            {COMPANY_INFO.stats.map((st, idx) => (
              <div key={idx} className="w-full p-6 sm:p-5 rounded-2xl bg-[#0B2B1B]/80 border border-[#1E5E3A]/40 shadow-xl flex flex-col items-center justify-center text-center transition-all hover:border-[#A3E635]/50 hover:bg-[#0E3823]">
                <StatCounter
                  value={st.number}
                  suffix={st.suffix}
                  label={st.label}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT OVERVIEW SECTION */}
      <section className="bg-gradient-to-b from-[#F5F8F4] via-[#EEF4EC] to-[#E5EFE3] text-[#132A13] py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Reveal variant="slideRight">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E5E3A]/10 border border-[#1E5E3A]/30 text-[#1E5E3A] text-xs font-bold uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>Headquartered in Volta Region, Ghana</span>
                </div>
                <AnimatedHeading
                  text="Modern Agricultural Enterprise with Purpose and Scale"
                  className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2B1B] leading-tight"
                />
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-base text-slate-700 leading-relaxed">
                  Situated at No. 1 Street, Barracks New Town, Ho, <strong>Napoleon Steadings Ltd.</strong> represents a new generation of African agricultural excellence. We combine large-scale mechanized land preparation with precision telemetry to deliver high-yield crop harvests, premium livestock, and export horticulture.
                </p>
                <p className="text-base text-slate-700 leading-relaxed mt-3">
                  Through our Volta Basin Outgrower Network, we empower over 420 smallholder farming households with certified planting materials, mechanization support, and guaranteed market off-take.
                </p>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.3}>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-md">
                    <Tractor className="w-7 h-7 text-[#1E5E3A] mb-2" />
                    <h4 className="font-bold text-sm text-[#0B2B1B]">100% Mechanized</h4>
                    <p className="text-xs text-slate-600 mt-1">Precision tillage & combine harvesting fleet.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-md">
                    <ShieldCheck className="w-7 h-7 text-[#1E5E3A] mb-2" />
                    <h4 className="font-bold text-sm text-[#0B2B1B]">Quality Certified</h4>
                    <p className="text-xs text-slate-600 mt-1">Aflatoxin-free grains & export horticulture.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.4}>
                <button
                  onClick={() => onNavigate('/about')}
                  className="px-8 py-4 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-sm inline-flex items-center gap-2 transition-colors shadow-xl"
                >
                  <span>Learn More About Our Enterprise</span>
                  <ArrowRight className="w-4 h-4 text-[#A3E635]" />
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <Reveal variant="scale">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200"
                  alt="Napoleon Steadings Commercial Agriculture"
                  aspectRatio="aspect-4/3"
                />
              </Reveal>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600"
                  alt="Farm Harvest"
                  className="rounded-2xl h-36 w-full object-cover shadow-md border border-[#1E5E3A]/20"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600"
                  alt="Greenhouse"
                  className="rounded-2xl h-36 w-full object-cover shadow-md border border-[#1E5E3A]/20"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE AGRICULTURE DIVISION SWITCHER */}
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-24 relative overflow-hidden border-y border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal variant="fadeUp">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
                Core Operating Divisions
              </span>
              <AnimatedHeading
                text="Integrated Agricultural Ecosystem"
                className="font-editorial text-3xl sm:text-5xl font-bold text-white"
              />
            </Reveal>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {(Object.keys(agCategories) as Array<keyof typeof agCategories>).map((key) => {
              const cat = agCategories[key];
              const isActive = activeAgCategory === key;
              const IconComp = cat.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveAgCategory(key)}
                  className={`px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#A3E635] text-[#0B2B1B] shadow-xl shadow-[#A3E635]/25 scale-105'
                      : 'bg-[#0B2B1B] text-white hover:bg-[#1E5E3A] border border-[#1E5E3A]/50'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#0B2B1B]' : 'text-[#A3E635]'}`} />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Division Display */}
          {(() => {
            const currentCat = agCategories[activeAgCategory];
            return (
              <motion.div
                key={activeAgCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B2B1B]/80 border border-[#1E5E3A]/60 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
              >
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block">
                    Featured Division
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-white">
                    {currentCat.title}
                  </h3>
                  <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                    {currentCat.subtitle}
                  </p>

                  <div className="space-y-3 pt-2">
                    {currentCat.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate(currentCat.route)}
                    className="mt-4 px-6 py-3.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287547] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 border border-[#A3E635]/40 transition-colors"
                  >
                    <span>View Division Details</span>
                    <ArrowRight className="w-4 h-4 text-[#A3E635]" />
                  </button>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-2xl border border-[#1E5E3A]">
                    <img
                      src={currentCat.image}
                      alt={currentCat.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* INTERACTIVE YIELD & ROI CALCULATOR */}
      <YieldCalculator onNavigate={onNavigate} />

      {/* FEATURED FARMS DIRECTORY */}
      <section className="bg-gradient-to-b from-[#F5F8F4] via-[#FFFFFF] to-[#F5F8F4] text-[#132A13] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E5E3A] block mb-1">
                Operational Holdings
              </span>
              <AnimatedHeading
                text="Our Primary Farm Estates"
                className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2B1B]"
              />
            </div>

            <button
              onClick={() => onNavigate('/operations/farms')}
              className="px-6 py-3 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0 shadow-md"
            >
              <Compass className="w-4 h-4 text-[#A3E635]" />
              <span>Interactive Map & All Farms</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FARMS_DATA.slice(0, 3).map((farm) => (
              <Reveal key={farm.id} variant="fadeUp">
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#1E5E3A]/20 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={farm.heroImage}
                      alt={farm.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B2B1B]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold text-[#A3E635] uppercase tracking-wider border border-[#A3E635]/30">
                      {farm.farmType}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#1E5E3A]" />
                        <span>{farm.location}</span>
                      </div>
                      <h4 className="font-editorial text-xl font-bold text-[#0B2B1B] group-hover:text-[#1E5E3A] transition-colors">
                        {farm.name}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {farm.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#0B2B1B]">
                      <span className="px-2.5 py-1 rounded-md bg-[#1E5E3A]/10 text-[#1E5E3A]">
                        {farm.sizeAcres} Acres
                      </span>
                      <button
                        onClick={() => onNavigate(`/operations/farms/${farm.slug}`)}
                        className="text-[#1E5E3A] font-extrabold hover:underline flex items-center gap-1"
                      >
                        <span>View Estate</span> &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRECISION AG & TECHNOLOGY PORTAL */}
      <section className="bg-gradient-to-br from-[#0A0D0A] via-[#061A10] to-[#04120B] text-white py-24 border-y border-[#1E5E3A]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Reveal variant="fadeUp">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A]/60 border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold font-mono">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Precision Ag & IoT Telemetry</span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white mt-4 leading-tight">
                  Technology-Driven Agricultural Yields
                </h2>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
                  We deploy LoRaWAN field telemetry sensors, solar-powered fertigation pumps, and drone multispectral mapping across our Volta Region holdings to ensure every crop receives exact moisture and nutrients.
                </p>
              </Reveal>

              {/* Live Metrics Display */}
              <Reveal variant="fadeUp" delay={0.3}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#0B2B1B] border border-[#A3E635]/30">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block">Soil Moisture</span>
                    <p className="font-num text-2xl font-bold text-[#A3E635] mt-1">38.5%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B2B1B] border border-[#A3E635]/30">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block">Crop Health</span>
                    <p className="font-num text-2xl font-bold text-[#A3E635] mt-1">94%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B2B1B] border border-[#A3E635]/30">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block">Irrigation</span>
                    <p className="font-num text-base font-bold text-white mt-2">ACTIVE</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B2B1B] border border-[#A3E635]/30">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block">Ho Temp</span>
                    <p className="font-num text-2xl font-bold text-white mt-1">29°C</p>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.4}>
                <button
                  onClick={() => onNavigate('/technology')}
                  className="px-8 py-4 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm inline-flex items-center gap-2 shadow-lg shadow-[#A3E635]/20 transition-transform active:scale-95"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Launch Tech Portal</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <Reveal variant="zoom">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200"
                  alt="Precision Greenhouse Agriculture"
                  aspectRatio="aspect-4/3"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS CATALOG HIGHLIGHTS */}
      <section className="bg-gradient-to-b from-[#F5F8F4] via-[#FFFFFF] to-[#F5F8F4] text-[#132A13] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E5E3A] block mb-1">
                Fresh Harvest & Processed Goods
              </span>
              <AnimatedHeading
                text="Commercial Produce Catalog"
                className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2B1B]"
              />
            </div>

            <button
              onClick={() => onNavigate('/products')}
              className="px-6 py-3 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0 shadow-md"
            >
              <span>Explore Full Product Line</span>
              <ArrowRight className="w-4 h-4 text-[#A3E635]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS_DATA.filter((p) => p.isFeatured).map((product) => (
              <Reveal key={product.id} variant="fadeUp">
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#1E5E3A]/20 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#1E5E3A] text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-editorial text-xl font-bold text-[#0B2B1B] group-hover:text-[#1E5E3A] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B2B1B]">
                      <span className="text-[#1E5E3A] bg-[#1E5E3A]/10 px-2.5 py-1 rounded-md">
                        Min: {product.minOrderQuantity}
                      </span>
                      <button
                        onClick={() => onNavigate(`/products/${product.slug}`)}
                        className="text-[#0B2B1B] hover:text-[#1E5E3A] font-extrabold flex items-center gap-1"
                      >
                        <span>Details</span> &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AFRICAN AGRICULTURE EDITORIAL STORY SECTION */}
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-24 relative border-t border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-r from-[#062114] via-[#0B2B1B] to-[#1E5E3A]/50 border border-[#A3E635]/30 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                <span>Pan-African Agriculture</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white leading-tight">
                African Agriculture: Modern, Productive & Globally Connected
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Discover our vision for transforming West Africa's agricultural narrative through sustainable commercial scale, local community empowerment, and technology integration.
              </p>
              <button
                onClick={() => onNavigate('/african-agriculture')}
                className="px-8 py-4 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm inline-flex items-center gap-3 transition-transform active:scale-95 shadow-xl"
              >
                <span>Read the Story</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS & INSIGHTS PREVIEW */}
      <section className="bg-gradient-to-b from-[#FFFFFF] via-[#F5F8F4] to-[#FFFFFF] text-[#132A13] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E5E3A] block mb-1">
                Corporate Media
              </span>
              <AnimatedHeading
                text="Latest News & Press Releases"
                className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2B1B]"
              />
            </div>

            <button
              onClick={() => onNavigate('/insights')}
              className="px-6 py-3 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0 shadow-md"
            >
              <span>View All News</span>
              <ArrowRight className="w-4 h-4 text-[#A3E635]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_DATA.map((article) => (
              <Reveal key={article.id} variant="fadeUp">
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#1E5E3A]/20 shadow-xl flex flex-col h-full hover:-translate-y-2 transition-all">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B2B1B]/90 text-[#A3E635] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#A3E635]/30">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 block mb-2">{article.date} • {article.readTime}</span>
                      <h4 className="font-editorial text-lg font-bold text-[#0B2B1B] group-hover:text-[#1E5E3A] transition-colors leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate(`/insights/${article.slug}`)}
                      className="text-xs font-bold text-[#1E5E3A] hover:underline inline-flex items-center gap-1 pt-2"
                    >
                      <span>Read Article</span> &rarr;
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP & CONTACT CTA SECTION */}
      <section className="bg-gradient-to-b from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-24 border-t border-[#1E5E3A]/40 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Reveal variant="fadeUp">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block">
              Global Vision • Volta Regional Roots
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white mt-2">
              Ready to Partner With Napoleon Steadings Ltd.?
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-3">
              Connect with our corporate office at No. 1 Street, Barracks New Town, Ho, Volta Region, Ghana, for commercial off-take contracts, outgrower partnerships, or investment opportunities.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-8 py-4 rounded-2xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm sm:text-base inline-flex items-center gap-2 shadow-2xl shadow-[#A3E635]/25 transition-transform active:scale-95"
              >
                <Phone className="w-5 h-5" />
                <span>Contact Headquarters</span>
              </button>
              <button
                onClick={() => onNavigate('/partnerships')}
                className="px-8 py-4 rounded-2xl bg-[#1E5E3A] hover:bg-[#287547] text-white font-bold text-sm sm:text-base border border-[#A3E635]/40 transition-colors"
              >
                <span>Partnership Application</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
