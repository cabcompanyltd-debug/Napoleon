import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { subscribeNewsletter } from '../../lib/insforge';
import { BrandLogo } from './BrandLogo';

// Custom Sharp Mechanical Tractor Vector Silhouette Component
const TractorShapeSvg: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-12 h-12",
  color = "text-[#A3E635]" 
}) => (
  <svg
    viewBox="0 0 120 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${color}`}
  >
    {/* Tractor Engine Hood & Body */}
    <path
      d="M30 52 L60 52 L66 40 L90 40 L90 68 L30 68 Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    
    {/* Engine Hood Grill Lines */}
    <path d="M36 56 L36 64 M42 56 L42 64 M48 56 L48 64 M54 56 L54 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

    {/* Cab Operator Glass Structure */}
    <path
      d="M60 52 L66 26 L92 26 L98 52 Z"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Sharp Cab Roof Overhang */}
    <path
      d="M62 26 L96 26 L98 21 L58 21 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Tinted Operator Glass Window */}
    <path
      d="M68 31 L88 31 L92 48 L64 48 Z"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Exhaust Stack Pipe */}
    <path
      d="M38 52 L38 24 L35 21 L41 21 L43 24 L43 52 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    
    {/* Exhaust Steam Ring accents */}
    <circle cx="39" cy="14" r="2.5" fill="currentColor" opacity="0.9" />
    <circle cx="42" cy="8" r="3.5" fill="currentColor" opacity="0.6" />

    {/* Front LED Headlights Beam */}
    <path
      d="M28 56 L24 56 L22 61 L28 61 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path d="M22 58 L8 53 M22 58 L8 58 M22 58 L8 63" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.85" />

    {/* Giant Rear Treaded Drive Wheel */}
    <circle cx="82" cy="68" r="18" fill="#04140B" stroke="currentColor" strokeWidth="3.5" />
    <circle cx="82" cy="68" r="11" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
    <circle cx="82" cy="68" r="5" fill="currentColor" />
    {/* Heavy Rear Wheel Tread Lug Spokes */}
    <path d="M82 50 L82 86 M64 68 L100 68 M69 55 L95 81 M69 81 L95 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

    {/* Front Steering Wheel */}
    <circle cx="38" cy="72" r="12" fill="#04140B" stroke="currentColor" strokeWidth="3" />
    <circle cx="38" cy="72" r="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="38" cy="72" r="3" fill="currentColor" />
    {/* Front Wheel Spokes */}
    <path d="M38 60 L38 84 M26 72 L50 72 M29 63 L47 81 M29 81 L47 63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    {/* Rear Tow Hitch & Hydraulic Cultivator Arm */}
    <path d="M100 64 L112 64 L116 70 M100 68 L114 68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    {/* Precision Field Furrow Contour Line */}
    <path d="M5 86 L115 86" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.75" />
    <path d="M12 90 L108 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
  </svg>
);

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slanted-dual text-white border-t border-[#1E5E3A]/50 pt-20 pb-12 relative overflow-hidden">
      {/* Top Decorative Seam Line (Matching Header Slanted Seam) */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1E5E3A] via-[#A3E635] to-[#1E5E3A] opacity-90 z-20" />
      
      {/* Background Graphic Accents & Slanted Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1E5E3A]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Large Subtle Tractor Watermark Background Graphic */}
      <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-[0.06] transform -rotate-12 select-none z-0">
        <TractorShapeSvg className="w-[500px] h-[500px]" color="text-[#A3E635]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter & Precision Ag Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slanted-gold border border-[#A3E635]/30 shadow-2xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          {/* Decorative Corner Tractor Badge Graphic */}
          <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity hidden sm:block">
            <TractorShapeSvg className="w-44 h-44" color="text-[#A3E635]" />
          </div>

          <div className="max-w-xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1E5E3A]/60 border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold shadow-sm">
              <TractorShapeSvg className="w-5 h-5" color="text-[#A3E635]" />
              <span className="uppercase tracking-widest text-[11px]">Volta Region Mechanized Operations</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-tight">
              Subscribe to Agricultural Insights & Corporate Updates
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Direct reports from our Volta Region farm estates, crop harvest telemetry, and commercial trade partnerships.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md relative z-10">
            {subscribed ? (
              <div className="p-5 rounded-2xl bg-[#062114] border border-[#A3E635] text-white text-sm font-bold flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl animate-fade-in">
                <div className="flex items-center gap-3 text-[#A3E635]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-sm font-extrabold">Subscription Confirmed!</p>
                    <p className="text-xs text-emerald-200/80 font-normal">You'll receive Volta farm updates & market reports.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setEmail('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1E5E3A] hover:bg-[#A3E635] hover:text-[#0B2B1B] text-[#A3E635] text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Add Another Email
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email address"
                  className="flex-1 px-4 py-3.5 rounded-xl bg-black/60 border border-[#A3E635]/40 text-white placeholder-emerald-200/60 text-sm focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shrink-0"
                >
                  <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
            {errorMsg && <p className="text-xs text-red-400 font-semibold mt-2">{errorMsg}</p>}
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Corporate Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="lg" />
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              An advanced, animation-first agricultural enterprise headquartered in Ho, Volta Region, Ghana. Combining commercial scale, sustainable soil management, and modern farm technology.
            </p>

            <div className="space-y-2 pt-2 text-xs text-emerald-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.headquarters.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A3E635] shrink-0" />
                <span>{COMPANY_INFO.headquarters.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A3E635] shrink-0" />
                <span>{COMPANY_INFO.headquarters.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#A3E635] mb-4">
              Company & About
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#A3E635] transition-colors">
                  About Napoleon Steadings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/african-agriculture')} className="hover:text-[#A3E635] transition-colors">
                  African Agriculture Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/operations/farms')} className="hover:text-[#A3E635] transition-colors">
                  Farm Estates Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/careers')} className="hover:text-[#A3E635] transition-colors">
                  Careers & Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/insights')} className="hover:text-[#A3E635] transition-colors">
                  News & Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Agriculture & Tech */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#A3E635] mb-4">
              Agriculture & Tech
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => onNavigate('/agriculture/crops')} className="hover:text-[#A3E635] transition-colors">
                  Commercial Crop Farming
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/agriculture/livestock')} className="hover:text-[#A3E635] transition-colors">
                  Pastured Livestock
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/agriculture/horticulture')} className="hover:text-[#A3E635] transition-colors">
                  Horticulture & Greenhouses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/technology')} className="hover:text-[#A3E635] transition-colors">
                  Precision Ag Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/sustainability')} className="hover:text-[#A3E635] transition-colors">
                  Sustainability & Soil Health
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Commercial & Legal */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#A3E635] mb-4">
              Partnerships & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-[#A3E635] transition-colors">
                  Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/partnerships')} className="hover:text-[#A3E635] transition-colors">
                  Commercial Partnerships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/investment')} className="hover:text-[#A3E635] transition-colors">
                  Agricultural Investment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#A3E635] transition-colors">
                  Contact Headquarters
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-[#A3E635] transition-colors">
                  FAQ & Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright with Mechanized Fleet Badge */}
        <div className="pt-8 border-t border-[#1E5E3A]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <div className="flex items-center gap-3">
            <TractorShapeSvg className="w-5 h-5 text-[#A3E635]" />
            <p>© {new Date().getFullYear()} Napoleon Steadings Ltd. All rights reserved. Ho, Volta Region, Ghana.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('/cookies')} className="hover:text-white transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

