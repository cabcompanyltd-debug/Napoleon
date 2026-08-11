import React, { useState } from 'react';
import { Sprout, MapPin, Phone, Mail, Send, CheckCircle2, Globe, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { subscribeNewsletter } from '../../lib/insforge';
import logoImg from '../../assets/logo.png';

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
    <footer className="bg-[#062114] text-white border-t border-[#1E5E3A]/40 pt-16 pb-12 relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E5E3A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0B2B1B] via-[#1E5E3A]/60 to-[#0B2B1B] border border-[#A3E635]/30 shadow-2xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
              Stay Connected With Our Growth
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
              Subscribe to Agricultural Insights & Corporate Updates
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2">
              Direct reports from our Volta Region farm estates, crop harvest updates, and commercial trade partnerships.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#1E5E3A] border border-[#A3E635] text-[#A3E635] text-sm font-bold flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thank you! Your email has been subscribed.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3.5 rounded-xl bg-black/40 border border-[#A3E635]/30 text-white placeholder-emerald-200/50 text-sm focus:outline-none focus:border-[#A3E635]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
                >
                  <span>{isSubmitting ? 'Joining...' : 'Subscribe'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
            {errorMsg && <p className="text-xs text-red-400 mt-2">{errorMsg}</p>}
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Corporate Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith('/logo.png')) {
                    target.src = '/logo.png';
                  }
                }}
                alt="Napoleon Steadings Ltd."
                className="h-14 sm:h-18 md:h-20 w-auto object-contain filter drop-shadow-md"
              />
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

        {/* Bottom Legal Copyright */}
        <div className="pt-8 border-t border-[#1E5E3A]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <p>© {new Date().getFullYear()} Napoleon Steadings Ltd. All rights reserved. Ho, Volta Region, Ghana.</p>
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
