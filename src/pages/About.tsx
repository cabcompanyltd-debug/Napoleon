import React from 'react';
import { motion } from 'motion/react';
import { Sprout, CheckCircle2, Shield, Target, Eye, Heart, Award, ArrowRight, MapPin, Users, Building2, Globe, Cpu } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Reveal } from '../components/animations/Reveal';
import { ImageReveal } from '../components/animations/ImageReveal';
import { AnimatedHeading } from '../components/animations/AnimatedHeading';

interface AboutProps {
  onNavigate: (route: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const timelineEvents = [
    {
      year: 'Foundation',
      title: 'Company Registration & Ho Headquarters',
      desc: 'Established in Ho, Volta Region, Ghana, with headquarters at No. 1 Street, Barracks New Town.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600'
    },
    {
      year: 'Commercial Expansion',
      title: 'Adaklu Plains Land Mechanization',
      desc: 'Acquired and mechanized initial commercial acreage for maize, cassava, and soybean cultivation.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600'
    },
    {
      year: 'Horticulture Hub',
      title: 'Kpando Lake Volta Nursery & Greenhouses',
      desc: 'Constructed shade-net greenhouse structures for Smooth Cayenne pineapples and export vegetables.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600'
    },
    {
      year: 'Agro-Processing Depot',
      title: 'Hohoe Milling & Starch Plant',
      desc: 'Commissioned high-grade cassava flour processing line and automated grain silo storage.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=600'
    },
    {
      year: 'Smart Ag & Outgrowers',
      title: 'Solar Fertigation & 420+ Outgrowers Network',
      desc: 'Deployed LoRaWAN soil telemetry probes and launched credit-backed outgrower farming schemes.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const leadershipTeam = [
    {
      name: 'Julian Tsikata',
      role: 'Founder & Chief Executive Officer',
      bio: 'Visionary founder and CEO driving commercial scale, modern agricultural technology, and sustainable agribusiness expansion across Volta Region and Ghana.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Esi Dzifa',
      role: 'Chief Agronomist & Field Operations',
      bio: 'Specialist in precision drip fertigation, soil microbiology, and sustainable outgrower schemes in Volta Region.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Kofi Annan-Quaye',
      role: 'Head of Agro-Processing & Supply Chain',
      bio: 'Pioneer in cold-chain logistics, optical grain sorting, and industrial cassava starch milling.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="w-full pt-20 bg-[#061A10] text-white">
      {/* HERO BANNER WITH AMBIENT GRADIENT */}
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] py-24 relative overflow-hidden border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-4 border border-[#A3E635]/30">
              <Building2 className="w-4 h-4" />
              <span>About Napoleon Steadings Ltd.</span>
            </div>
            <AnimatedHeading
              text="Pioneering Modern Agriculture in Volta Region, Ghana"
              className="font-editorial text-4xl sm:text-6xl font-bold text-white max-w-4xl"
            />
            <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light leading-relaxed">
              Building a resilient, sustainable, and technologically advanced agricultural enterprise from West Africa to global markets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section id="who-we-are" className="bg-gradient-to-b from-[#F5F8F4] via-[#FFFFFF] to-[#F5F8F4] text-[#132A13] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Reveal variant="fadeUp">
                <span className="text-xs font-bold uppercase tracking-widest text-[#1E5E3A] block">
                  Corporate Identity
                </span>
                <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2B1B]">
                  Our Story & Operational Vision
                </h2>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-base text-slate-700 leading-relaxed">
                  Headquartered at {COMPANY_INFO.headquarters.fullAddress}, <strong>Napoleon Steadings Ltd.</strong> was founded to demonstrate that commercial agricultural scale, deep soil stewardship, and modern technology can transform African food security.
                </p>
                <p className="text-base text-slate-700 leading-relaxed mt-3">
                  Our operations span 3,500+ acres across five specialized agricultural hubs in the Volta Region. We bridge the gap between smallholder outgrowers and international buyers by offering mechanized land clearing, high-potency seeds, automated silo storage, and refrigerated cold-chain logistics.
                </p>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.3}>
                <div className="p-5 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-md flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#1E5E3A] text-[#A3E635] shrink-0">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0B2B1B]">Sustainable Soil & Water Stewardship</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Combining solar drip fertigation with zero-burning land clearing protocols to safeguard the natural fertility of Volta soils.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <Reveal variant="scale">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
                  alt="Napoleon Steadings Farmland"
                  aspectRatio="aspect-4/3"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION, VISION & VALUES */}
      <section id="mission" className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-24 border-y border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal variant="fadeUp" delay={0.1}>
              <div className="p-8 rounded-3xl bg-[#0B2B1B]/80 border border-[#1E5E3A] shadow-2xl h-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-white">Our Mission</h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  To produce premium staple crops, pastured livestock, and export horticulture through mechanized efficiency, solar fertigation, and inclusive community partnerships in West Africa.
                </p>
              </div>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.2}>
              <div className="p-8 rounded-3xl bg-[#0B2B1B]/80 border border-[#1E5E3A] shadow-2xl h-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-white">Our Vision</h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  To stand as a globally recognized beacon of African commercial agricultural innovation, proving that sustainable soil stewardship and technology drive food sovereignty.
                </p>
              </div>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.3}>
              <div className="p-8 rounded-3xl bg-[#0B2B1B]/80 border border-[#1E5E3A] shadow-2xl h-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-white">Our Core Values</h3>
                <ul className="text-xs sm:text-sm text-emerald-100/80 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                    <span>Integrity & Quality Assurance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                    <span>Community Wealth Creation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                    <span>Environmental Stewardship</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                    <span>Technological Innovation</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM SHOWCASE */}
      <section className="bg-[#F5F8F4] text-[#132A13] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E5E3A] block mb-2">
              Executive Governance
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2B1B]">
              Leadership & Agronomic Expertise
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Guided by experienced agricultural leaders, agronomists, and logistics specialists dedicated to commercial excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((m, idx) => (
              <Reveal key={idx} variant="fadeUp">
                <div className="bg-white rounded-3xl overflow-hidden border border-[#1E5E3A]/20 shadow-xl group hover:-translate-y-2 transition-all">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="font-editorial text-xl font-bold text-[#0B2B1B]">{m.name}</h4>
                    <p className="text-xs font-bold text-[#1E5E3A] uppercase tracking-wider">{m.role}</p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2">{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORICAL TIMELINE WITH IMAGES */}
      <section className="bg-gradient-to-b from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
              Corporate Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white">
              Milestones of Growth
            </h2>
          </div>

          <div className="space-y-8">
            {timelineEvents.map((e, idx) => (
              <Reveal key={idx} variant="fadeUp">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0B2B1B]/80 border border-[#1E5E3A] shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold font-mono uppercase tracking-wider">
                      {e.year}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-white mt-3">{e.title}</h3>
                  </div>

                  <div className="md:col-span-6">
                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">{e.desc}</p>
                  </div>

                  <div className="md:col-span-3">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="rounded-2xl h-28 w-full object-cover border border-[#1E5E3A]"
                      referrerPolicy="no-referrer"
                    />
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
