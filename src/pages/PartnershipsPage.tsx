import React, { useState } from 'react';
import { Handshake, CheckCircle2, Send, Building } from 'lucide-react';
import { submitPartnerInquiry } from '../lib/insforge';

interface Props {
  onNavigate: (route: string) => void;
}

export const PartnershipsPage: React.FC<Props> = ({ onNavigate }) => {
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnerType, setPartnerType] = useState('Outgrower / Smallholder Union');
  const [proposal, setProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitPartnerInquiry({
        companyName: orgName,
        contactPerson,
        email,
        phone,
        partnershipType: partnerType,
        details: proposal
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Commercial Collaboration
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Partnerships & Outgrower Schemes
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Collaborating with smallholder farmer cooperatives, agro-processors, government agencies, and research institutes.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-editorial text-3xl font-bold text-[#0B2B1B]">Our Partnership Framework</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                At Napoleon Steadings Ltd., we believe agricultural scale in West Africa is achieved through structured collaboration. We partner with local cooperatives, equipment vendors, and industrial buyers to guarantee stable supply chains and fair prices.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#1E5E3A]/20 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1E5E3A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0B2B1B]">Outgrower Credit & Input Scheme</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Providing certified seeds, tractor tillage, and guaranteed crop off-take to 420+ Volta farming families.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#1E5E3A]/20 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1E5E3A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0B2B1B]">Institutional Buyer Contracts</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Custom long-term supply contracts for breweries, starch mills, and feed manufacturers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-[#0B2B1B] text-white border border-[#A3E635]/30 shadow-2xl">
                <h3 className="font-editorial text-2xl font-bold text-white mb-2">Submit Partnership Proposal</h3>
                <p className="text-xs text-emerald-200/80 mb-6">Our corporate partnerships unit in Ho will review your request.</p>

                {submitted ? (
                  <div className="p-4 rounded-xl bg-[#1E5E3A] text-[#A3E635] text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Partnership proposal received! Our corporate team will reach out.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Organization / Entity Name"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                    />
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Contact Person Full Name"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number (+233...)"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                      />
                    </div>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#062114] border border-[#1E5E3A] text-white text-xs focus:outline-none focus:border-[#A3E635]"
                    >
                      <option>Outgrower / Smallholder Union</option>
                      <option>Industrial Off-Taker / Buyer</option>
                      <option>Equipment / Input Supplier</option>
                      <option>Research / NGO / Government</option>
                    </select>
                    <textarea
                      rows={4}
                      required
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      placeholder="Brief overview of partnership proposal..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Collaboration Proposal'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
