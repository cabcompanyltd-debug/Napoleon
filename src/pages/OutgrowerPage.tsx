import React, { useState } from 'react';
import { Sprout, Users, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Award, Phone, Send, AlertCircle, Scale } from 'lucide-react';
import { saveOutgrowerApplication } from '../lib/insforge';

interface PageProps {
  onNavigate: (route: string) => void;
}

const DISTRICTS = ['Central Tongu (Adidome)', 'South Tongu (Sogakope)', 'Ho Municipal', 'North Tongu (Battor)', 'Akatsi South'];
const CROPS_LIST = ['Industrial Cassava', 'Scotch Bonnet Chili', 'Yellow Protein Corn', 'Orange-Fleshed Sweet Potato', 'Commercial Plantain'];

export const OutgrowerPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [community, setCommunity] = useState('');
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [landSizeAcres, setLandSizeAcres] = useState<number>(5);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['Industrial Cassava']);
  const [experienceYears, setExperienceYears] = useState<number>(3);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleCrop = (cropName: string) => {
    if (selectedCrops.includes(cropName)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter(c => c !== cropName));
      }
    } else {
      setSelectedCrops([...selectedCrops, cropName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !community) {
      setSubmitError('Please complete your full name, phone number, and community location.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await saveOutgrowerApplication({
        fullName,
        phone,
        email,
        community,
        district,
        landSizeAcres,
        preferredCrops: selectedCrops,
        experienceYears,
      });

      setSubmitSuccess(true);
      setIsSubmitting(false);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit application. Please check your network and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#04140C] text-white pt-24 pb-20 font-sans">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-[#061A10] via-[#04140C] to-[#04140C] border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold uppercase tracking-widest">
            <Sprout className="w-4 h-4" />
            <span>Outgrower & Farmer Partnership Scheme</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white">
            Volta Region Outgrower Network & Contract Farming
          </h1>
          <p className="text-base text-emerald-200/90 max-w-3xl leading-relaxed">
            Empowering over 3,000 Volta Region smallholder farmers with certified high-yield seed cuttings, IoT precision extension advice, and guaranteed off-take contracts at stable commercial prices.
          </p>
        </div>
      </section>

      {/* Scheme Benefits */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center font-bold">1</div>
            <h3 className="font-editorial text-xl font-bold text-white">Guaranteed Market Off-Take</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Never worry about post-harvest rot or price crashing. Napoleon Steadings buys 100% of agreed harvest tonnage at pre-contracted floor prices.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center font-bold">2</div>
            <h3 className="font-editorial text-xl font-bold text-white">Input & Seed Stem Financing</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Receive high-starch disease-resistant cassava stem cuttings, certified maize seeds, drip irrigation kits, and organic fertilizer inputs on credit against harvest.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center font-bold">3</div>
            <h3 className="font-editorial text-xl font-bold text-white">Agronomic Extension Training</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Dedicated field agronomists provide step-by-step soil preparation, pest control, and mechanized planting assistance directly on your farm plot.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#071910] border-2 border-[#A3E635]/40 shadow-2xl space-y-6">
          <div className="space-y-2 border-b border-[#1E5E3A] pb-4">
            <span className="text-xs font-bold uppercase text-[#A3E635] tracking-widest">Join The Outgrower Network</span>
            <h2 className="font-editorial text-2xl font-bold text-white">Farmer Application Form</h2>
            <p className="text-xs text-emerald-200/80">Submit your farm details below. Our field officers will visit your farm site within 48 hours for site inspection.</p>
          </div>

          {submitSuccess ? (
            <div className="p-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#A3E635] mx-auto" />
              <h3 className="font-editorial text-2xl font-bold text-white">Outgrower Application Submitted!</h3>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto leading-relaxed">
                Thank you <strong>{fullName}</strong>. Your application for <strong>{landSizeAcres} acres</strong> in <strong>{community} ({district})</strong> has been received by our Adidome Extension Hub.
              </p>
              <p className="text-xs text-emerald-300">Our team will call you on <strong>{phone}</strong> to confirm your plot visit.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Mensah"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+233 24 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Community / Village Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mafi Kumase, Adidome, etc."
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Volta Region District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    {DISTRICTS.map((d, i) => (
                      <option key={i} value={d} className="bg-[#0B2B1B] text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Available Farm Land Size: <span className="text-[#A3E635] font-bold">{landSizeAcres} Acres</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={landSizeAcres}
                    onChange={(e) => setLandSizeAcres(Number(e.target.value))}
                    className="w-full accent-[#A3E635] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Years of Farming Experience</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Crops selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-emerald-200">
                  Select Crops You Want to Cultivate:
                </label>
                <div className="flex flex-wrap gap-2">
                  {CROPS_LIST.map((crop) => {
                    const isSelected = selectedCrops.includes(crop);
                    return (
                      <button
                        type="button"
                        key={crop}
                        onClick={() => toggleCrop(crop)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#A3E635] text-[#0B2B1B] font-extrabold shadow-md'
                            : 'bg-black/50 text-emerald-300 border border-[#1E5E3A] hover:bg-[#1E5E3A]/50'
                        }`}
                      >
                        {crop}
                      </button>
                    );
                  })}
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Outgrower Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
