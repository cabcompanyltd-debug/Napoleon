import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface Props {
  type: 'privacy' | 'terms' | 'cookies';
  onNavigate: (route: string) => void;
}

export const LegalPages: React.FC<Props> = ({ type }) => {
  const title = type === 'privacy'
    ? 'Privacy Policy'
    : type === 'terms'
    ? 'Terms of Service'
    : 'Cookie Policy';

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Legal & Compliance
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-xs text-emerald-200">Napoleon Steadings Ltd. • Effective Date: January 2025</p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
          <p>
            This document sets out the legal obligations and practices of <strong>{COMPANY_INFO.name}</strong>, headquartered at {COMPANY_INFO.headquarters.fullAddress}.
          </p>

          <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] pt-4">Data Collection & Commercial Security</h3>
          <p>
            When submitting forms for commercial produce orders, outgrower schemes, or career applications, your provided personal data (Name, Phone, Email) is processed strictly for official administrative communication in compliance with Ghana Data Protection Act 2012 (Act 843).
          </p>

          <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] pt-4">Corporate Inquiries</h3>
          <p>
            For questions regarding legal compliance or data protection, contact our executive office in Ho at <strong>{COMPANY_INFO.headquarters.email}</strong>.
          </p>
        </div>
      </section>
    </div>
  );
};
