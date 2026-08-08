import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Globe, Navigation, Building2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { submitContactInquiry } from '../lib/firebase';
import { InteractiveMap } from '../components/map/InteractiveMap';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('General Corporate Inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mapMode, setMapMode] = useState<'google' | 'interactive'>('google');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        fullName,
        email,
        phone,
        inquiryType,
        subject,
        message
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-20 bg-[#070E0A] text-white min-h-screen">
      {/* Header Banner with Slung Background Seam */}
      <section className="bg-slanted-dual py-20 border-b border-[#1E5E3A]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#A3E635] bg-[#1E5E3A]/60 px-3 py-1 rounded-full border border-[#A3E635]/30 inline-block">
            Volta Region • Ghana Corporate Desk
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Contact Headquarters
          </h1>
          <p className="text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Reach out to our commercial grain desk, outgrower management team, or visit our headquarters in Ho, Volta Region.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-[#070E0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Information & Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-[#0B1E14] border border-[#1E5E3A]/50 shadow-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E5E3A] border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-white">Ho Corporate Office</h3>
                    <span className="text-[10px] text-[#A3E635] font-mono uppercase">Volta Region • Ghana</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#A3E635] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Address:</span>
                      <span className="text-slate-300">{COMPANY_INFO.headquarters.fullAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#A3E635] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Telephone:</span>
                      <span className="text-slate-300">{COMPANY_INFO.headquarters.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#A3E635] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Email Address:</span>
                      <span className="text-slate-300">{COMPANY_INFO.headquarters.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#A3E635] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Office Hours:</span>
                      <span className="text-slate-300">Mon - Fri: 8:00 AM - 5:00 PM GMT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Map Widget */}
              <div className="p-4 rounded-3xl bg-[#0B1E14] border border-[#1E5E3A]/50 shadow-2xl space-y-3">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#A3E635]">
                    Headquarters Location Map
                  </span>
                  
                  <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-[#1E5E3A]">
                    <button
                      onClick={() => setMapMode('google')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        mapMode === 'google' ? 'bg-[#A3E635] text-[#0B2B1B]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Google Maps
                    </button>
                    <button
                      onClick={() => setMapMode('interactive')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        mapMode === 'interactive' ? 'bg-[#1E5E3A] text-[#A3E635]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Farm Cluster Map
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#1E5E3A]/60 shadow-inner h-[320px] bg-[#06140D]">
                  {mapMode === 'google' ? (
                    <iframe
                      title="Napoleon Steadings Headquarters Location - Ho Ghana"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63428.25414271881!2d0.4485747!3d6.6008801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102720d29314dfa5%3A0xc3b8cb404c0bc892!2sHo%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1710000000000!5m2!1sen!2sgh"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'contrast(105%) brightness(95%)' }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <InteractiveMap
                      initialCenter={COMPANY_INFO.headquarters.coordinates}
                      initialZoom={14}
                      heightClass="h-[320px]"
                      showAllFarms={false}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#091F14] text-white border border-[#A3E635]/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />

                <h3 className="font-editorial text-2xl font-bold text-white mb-2">Send Direct Inquiry</h3>
                <p className="text-xs text-emerald-200/80 mb-6">Complete the form below and our administrative team will log and respond within 24 hours.</p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-[#1E5E3A] border border-[#A3E635] text-[#A3E635] text-sm font-bold flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 shrink-0 text-[#A3E635]" />
                    <div>
                      <p className="text-base text-white font-bold">Your inquiry has been logged successfully!</p>
                      <p className="text-xs font-normal text-emerald-100 mt-1">Our administrative team at Napoleon Steadings Ltd. will get back to you at {email}.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Kwame Mensah"
                          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/40 focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="kwame@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/40 focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+233 24 000 0000"
                          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/40 focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block mb-1">Inquiry Category</label>
                        <select
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#061B11] border border-[#1E5E3A] text-white text-xs focus:outline-none focus:border-[#A3E635]"
                        >
                          <option>General Corporate Inquiry</option>
                          <option>Commercial Grain Supply</option>
                          <option>Outgrower Scheme</option>
                          <option>Equipment Leasing</option>
                          <option>Investor / Partnership Relations</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block mb-1">Subject Line *</label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Bulk Sorghum Supply Quote"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/40 focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 block mb-1">Detailed Inquiry Message *</label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Provide details about volume requirements, partnership interests, or general questions..."
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/40 focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
                    >
                      <span>{isSubmitting ? 'Transmitting Message...' : 'Send Direct Message to Headquarters'}</span>
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

