import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Cookie, 
  Lock, 
  Scale, 
  Building2, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Clock,
  Printer
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface Props {
  type: 'privacy' | 'terms' | 'cookies';
  onNavigate: (route: string) => void;
}

export const LegalPages: React.FC<Props> = ({ type, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>(type);

  // Sync tab if prop changes from external navigation
  React.useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const handleTabChange = (newTab: 'privacy' | 'terms' | 'cookies') => {
    setActiveTab(newTab);
    onNavigate(`/${newTab}`);
  };

  return (
    <div className="w-full pt-20 bg-[#F9F8F3] min-h-screen text-[#132A13]">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-[#062114] via-[#0B2B1B] to-[#0A3320] text-white py-16 lg:py-20 border-b border-[#1E5E3A]/40 relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A3E635_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E5E3A]/80 border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Legal & Governance Framework
            </span>
            <span className="text-xs text-emerald-200/80 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A3E635]" /> Effective: January 1, 2025 • Version 2.4
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Corporate Governance & Policies
          </h1>
          <p className="mt-4 text-emerald-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Transparent legal commitments, data privacy standards, and commercial terms governing {COMPANY_INFO.name} operations, commercial produce desks, and digital platforms.
          </p>

          {/* POLICY TABS NAVIGATION */}
          <div className="mt-10 flex flex-wrap gap-2 sm:gap-3 bg-[#061A10]/80 p-2 rounded-2xl border border-[#1E5E3A]/50 max-w-2xl">
            <button
              onClick={() => handleTabChange('privacy')}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'privacy'
                  ? 'bg-[#A3E635] text-[#062114] shadow-lg font-black'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Lock className="w-4 h-4" />
              Privacy Policy
            </button>
            <button
              onClick={() => handleTabChange('terms')}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'terms'
                  ? 'bg-[#A3E635] text-[#062114] shadow-lg font-black'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Scale className="w-4 h-4" />
              Terms of Service
            </button>
            <button
              onClick={() => handleTabChange('cookies')}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'cookies'
                  ? 'bg-[#A3E635] text-[#062114] shadow-lg font-black'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Cookie className="w-4 h-4" />
              Cookie Policy
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* LEFT SIDEBAR: QUICK ANCHORS & CONTACT */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#1E5E3A]/20 shadow-sm sticky top-28">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E5E3A] mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#A3E635]" /> Company Registry
                </h3>
                
                <div className="space-y-3 text-xs text-slate-700 leading-relaxed border-b border-slate-100 pb-4">
                  <div>
                    <strong className="text-slate-900 block">Entity Name:</strong>
                    {COMPANY_INFO.name}
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Executive Founder & CEO:</strong>
                    {COMPANY_INFO.founderCeo}
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Headquarters Address:</strong>
                    {COMPANY_INFO.headquarters.fullAddress}
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Legal Jurisdiction:</strong>
                    Republic of Ghana (Act 843 Compliant)
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="w-full py-2 px-3 rounded-xl bg-[#062114] hover:bg-[#1E5E3A] text-[#A3E635] text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5" /> Contact Legal Desk
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT BODY */}
            <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-3xl border border-[#1E5E3A]/20 shadow-sm space-y-10">
              
              {/* 1. PRIVACY POLICY CONTENT */}
              {activeTab === 'privacy' && (
                <div className="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
                  <div className="border-b border-slate-100 pb-6">
                    <span className="text-xs font-bold text-[#1E5E3A] uppercase tracking-wider block mb-1">
                      Data Protection & Privacy
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#062114]">
                      Privacy Policy Statement
                    </h2>
                    <p className="mt-2 text-xs text-slate-500">
                      Compliant with the Ghana Data Protection Act 2012 (Act 843) and International Best Practices.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">1</span>
                      Overview & Statutory Commitment
                    </h3>
                    <p>
                      At <strong>{COMPANY_INFO.name}</strong> ("Company", "we", "our", or "us"), led by Founder & CEO <strong>{COMPANY_INFO.founderCeo}</strong>, we respect your privacy and are committed to protecting personal data submitted through our commercial website, outgrower portals, farm management tools, and corporate inquiry desks.
                    </p>
                    <p>
                      This Privacy Policy outlines how we collect, process, store, and safeguard personal and commercial information in accordance with the Ghana Data Protection Act 2012 (Act 843).
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">2</span>
                      Information We Collect
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li><strong>Personal Identity Data:</strong> Full Name, Email Address, Mobile Phone Number, Postal Address, and Job Title provided during inquiries.</li>
                      <li><strong>Commercial & Farming Data:</strong> Produce order quantities, grain storage requests, outgrower plot acreages, GPS crop telemetry, and invoice histories.</li>
                      <li><strong>Employment Application Data:</strong> Resumes, educational credentials, and professional references submitted via our Careers desk.</li>
                      <li><strong>Technical & Browsing Data:</strong> Anonymized IP addresses, browser types, device specs, and session telemetry used to optimize website performance.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">3</span>
                      Purpose of Data Processing
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                      <div className="p-4 rounded-xl bg-[#F9F8F3] border border-slate-200">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#062114] mb-1">Commercial Procurement</div>
                        <p className="text-xs text-slate-600">Processing wholesale orders for maize, soy, livestock, and fresh horticulture produce.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F9F8F3] border border-slate-200">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#062114] mb-1">Outgrower Extension</div>
                        <p className="text-xs text-slate-600">Managing seed distribution, agronomic guidance, and harvest buy-back contracts with Volta farmers.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F9F8F3] border border-slate-200">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#062114] mb-1">Recruitment & Talent</div>
                        <p className="text-xs text-slate-600">Evaluating agronomists, heavy machinery operators, and administrative personnel.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F9F8F3] border border-slate-200">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#062114] mb-1">Regulatory & Accounting</div>
                        <p className="text-xs text-slate-600">Fulfilling Ghana Revenue Authority (GRA) tax, customs, and agricultural ministry reporting mandates.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">4</span>
                      Data Confidentiality & Zero Third-Party Sale
                    </h3>
                    <p>
                      <strong>We NEVER sell, lease, or trade personal data to external marketing brokers.</strong> Information is shared strictly with authorized operational partners (e.g., freight carriers, banking institutions, government agricultural inspectors) solely when necessary to fulfill your requested commercial transactions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">5</span>
                      Data Security & Retention
                    </h3>
                    <p>
                      We utilize SSL/TLS transport encryption, secure Postgres database isolation via InsForge, role-based access control (RBAC), and continuous monitoring at our Ho headquarters to prevent unauthorized access or data breaches.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">6</span>
                      Your Statutory Rights
                    </h3>
                    <p>
                      Under Act 843, you hold the right to request access to your personal data, request corrections to inaccurate entries, or request erasure ("right to be forgotten"). Contact our Data Protection Officer at <strong>{COMPANY_INFO.headquarters.email}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* 2. TERMS OF SERVICE CONTENT */}
              {activeTab === 'terms' && (
                <div className="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
                  <div className="border-b border-slate-100 pb-6">
                    <span className="text-xs font-bold text-[#1E5E3A] uppercase tracking-wider block mb-1">
                      Terms & Conditions
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#062114]">
                      Terms of Service Agreement
                    </h2>
                    <p className="mt-2 text-xs text-slate-500">
                      Governing commercial orders, site usage, outgrower terms, and intellectual property.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">1</span>
                      Acceptance of Terms
                    </h3>
                    <p>
                      By accessing or using the web platform, procurement portals, or services of <strong>{COMPANY_INFO.name}</strong>, you agree to be bound by these Terms of Service. If you do not accept these terms, you must refrain from using our services.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">2</span>
                      Intellectual Property & Brand Assets
                    </h3>
                    <p>
                      All content published on this website—including the official company logo, farm graphics, crop technical data, photographic assets, and brand design elements—is the exclusive intellectual property of Napoleon Steadings Ltd. Unauthorized copying, reproduction, or redistribution is strictly prohibited without prior written consent from Founder & CEO <strong>{COMPANY_INFO.founderCeo}</strong>.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">3</span>
                      Commercial Orders & Quality Grading
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li><strong>Produce Specifications:</strong> All commercial orders (Grain, Horticulture, Livestock) are subject to official moisture, grade, and weight testing at our Ho processing hub.</li>
                      <li><strong>Quotations & Invoicing:</strong> Written price quotes remain valid for 14 calendar days unless market fluctuations necessitate earlier revision.</li>
                      <li><strong>Inspection & Claims:</strong> Buyers must inspect produce upon arrival. Written quality claims must be lodged within 48 hours of dispatch delivery.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">4</span>
                      Outgrower & Contract Farming Terms
                    </h3>
                    <p>
                      Participating farmers in our Volta Outgrower Scheme agree to follow prescribed agronomic protocols, utilize non-GMO seed stock, strictly observe pesticide safety timelines, and deliver committed yields exclusively to Napoleon Steadings designated grain silos.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">5</span>
                      Limitation of Liability & Force Majeure
                    </h3>
                    <p>
                      Napoleon Steadings Ltd. shall not be held liable for failure or delay in performance caused by circumstances beyond reasonable control, including extreme meteorological occurrences (unprecedented drought, floods), regional transport disruptions, or major government policy shifts.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">6</span>
                      Governing Law & Legal Jurisdiction
                    </h3>
                    <p>
                      These terms are governed by and construed in accordance with the laws of the <strong>Republic of Ghana</strong>. Any disputes shall be submitted to binding arbitration in Ho / Accra under Ghana Arbitration Act rules.
                    </p>
                  </div>
                </div>
              )}

              {/* 3. COOKIE POLICY CONTENT */}
              {activeTab === 'cookies' && (
                <div className="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
                  <div className="border-b border-slate-100 pb-6">
                    <span className="text-xs font-bold text-[#1E5E3A] uppercase tracking-wider block mb-1">
                      Web Cookies & Storage
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#062114]">
                      Cookie Policy
                    </h2>
                    <p className="mt-2 text-xs text-slate-500">
                      Understanding how local browser storage and cookies enhance your web experience.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">1</span>
                      What Are Cookies?
                    </h3>
                    <p>
                      Cookies are small text files placed on your browser or device when visiting <strong>napoleonsteadings.com</strong>. They allow our platform to recognize your session, remember preferences (such as farm map settings or active search filters), and safeguard user authentication state.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">2</span>
                      Types of Cookies We Use
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-[#F9F8F3] border border-slate-200">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#062114] flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" /> Essential / Strict Security Cookies
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Required for core navigation, publisher login sessions, security tokens, and memory caching during form submissions.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F9F8F3] border border-slate-200">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#062114] flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" /> Performance & Map Telemetry Cookies
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Help us understand page load speeds and optimize interactive Leaflet farm map tiles and media gallery playback.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F9F8F3] border border-slate-200">
                        <div className="font-bold text-xs uppercase tracking-wider text-[#062114] flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" /> Customization & Preference Storage
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Remembers your selected dashboard view settings, language preferences, and filter choices.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">3</span>
                      Managing & Disabling Cookies
                    </h3>
                    <p>
                      You can modify your browser settings to block or notify you when cookies are placed. Note that disabling essential security cookies may limit access to publisher features, authentication, and interactive farm map layers.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-bold text-[#062114] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#A3E635]/20 text-[#062114] text-xs font-bold flex items-center justify-center">4</span>
                      Inquiries & Policy Updates
                    </h3>
                    <p>
                      We periodically update this Cookie Policy to reflect technical upgrades. Questions regarding cookies or data privacy should be directed to <strong>{COMPANY_INFO.headquarters.email}</strong>.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
