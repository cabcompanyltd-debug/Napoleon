import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQ_DATA } from '../data/companyData';

interface Props {
  onNavigate: (route: string) => void;
}

export const FaqPage: React.FC<Props> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Information Desk
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Answers regarding our farm operations, commercial produce supply, outgrower schemes, and contact points.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {FAQ_DATA.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#1E5E3A]/15 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left font-editorial text-lg sm:text-xl font-bold text-[#0B2B1B] flex items-center justify-between gap-4"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#1E5E3A] transition-transform duration-300 shrink-0 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

          <div className="mt-12 p-8 rounded-3xl bg-[#0B2B1B] text-white text-center space-y-3">
            <h3 className="font-editorial text-2xl font-bold">Have an Unanswered Question?</h3>
            <p className="text-xs text-emerald-200/80">Get in touch directly with our executive desk in Ho.</p>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-[#A3E635] text-[#0B2B1B] font-extrabold text-xs inline-flex items-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
