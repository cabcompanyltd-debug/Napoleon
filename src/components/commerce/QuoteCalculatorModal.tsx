import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, CheckCircle2, AlertCircle, Send, Scale, MapPin, Truck, ShieldCheck, DollarSign } from 'lucide-react';
import { saveCommercialQuote } from '../../lib/insforge';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CROPS = [
  { name: 'Industrial Cassava (High Starch)', basePricePerTonUsd: 140, unit: 'Metric Tonne' },
  { name: 'Scotch Bonnet & Birdseye Chili', basePricePerTonUsd: 1200, unit: 'Metric Tonne' },
  { name: 'Yellow & White Quality Protein Corn', basePricePerTonUsd: 280, unit: 'Metric Tonne' },
  { name: 'Orange-Fleshed Sweet Potato', basePricePerTonUsd: 220, unit: 'Metric Tonne' },
  { name: 'Commercial Plantain & Banana', basePricePerTonUsd: 310, unit: 'Metric Tonne' },
  { name: 'Raw Cashew Nuts & Kernel', basePricePerTonUsd: 1150, unit: 'Metric Tonne' },
];

const DESTINATIONS = [
  { label: 'Accra Greater Area (Local Delivery)', multiplier: 1.0, logisticsEstimateUsd: 150 },
  { label: 'Tema Export Port (FOB Shipment)', multiplier: 1.05, logisticsEstimateUsd: 280 },
  { label: 'Kumasi / Middle Belt Hub', multiplier: 1.08, logisticsEstimateUsd: 320 },
  { label: 'Northern Region / Tamale', multiplier: 1.12, logisticsEstimateUsd: 450 },
  { label: 'International Export (CIF Port Container)', multiplier: 1.2, logisticsEstimateUsd: 850 },
];

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [quantityTonnes, setQuantityTonnes] = useState<number>(10);
  const [selectedDestIndex, setSelectedDestIndex] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const crop = CROPS[selectedCropIndex];
  const dest = DESTINATIONS[selectedDestIndex];

  // Price Calculation
  const cropSubtotalUsd = Math.round(crop.basePricePerTonUsd * quantityTonnes * dest.multiplier);
  const totalEstimatedUsd = cropSubtotalUsd + dest.logisticsEstimateUsd;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email || !phone) {
      setSubmitError('Please complete all contact information fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await saveCommercialQuote({
        companyName,
        contactName,
        email,
        phone,
        cropType: crop.name,
        quantityTonnes,
        destination: dest.label,
        estimatedPriceUsd: totalEstimatedUsd,
        notes,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 400);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit quote inquiry. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#061A10] text-white border border-[#A3E635]/40 shadow-2xl p-6 sm:p-8 custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Close quote calculator"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-white">
                Commercial Produce Quote & Estimator
              </h3>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Calculate wholesale bulk prices & submit direct off-take inquiries to Napoleon Steadings.
              </p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#A3E635]/20 border-2 border-[#A3E635] text-[#A3E635] flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-white">
                Quote Request Submitted!
              </h4>
              <p className="text-sm text-emerald-200/90 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-white">{contactName}</strong> ({companyName}). Your estimate of <strong className="text-[#A3E635]">${totalEstimatedUsd.toLocaleString()} USD</strong> for <strong className="text-white">{quantityTonnes} Metric Tonnes</strong> of {crop.name} has been routed to our Volta Region commercial sales team.
              </p>
              <p className="text-xs text-emerald-300/80">We will contact you via {phone} / {email} within 24 hours.</p>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  onClose();
                }}
                className="mt-4 px-6 py-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs transition-transform active:scale-95 cursor-pointer shadow-lg"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Produce Selection */}
              <div className="p-4 rounded-2xl bg-[#0B2B1B] border border-[#1E5E3A]/60 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635] flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-[#A3E635]" />
                  <span>1. Select Produce & Quantity</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                      Crop Type
                    </label>
                    <select
                      value={selectedCropIndex}
                      onChange={(e) => setSelectedCropIndex(Number(e.target.value))}
                      className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    >
                      {CROPS.map((c, i) => (
                        <option key={i} value={i} className="bg-[#0B2B1B] text-white">
                          {c.name} (~${c.basePricePerTonUsd}/Tonne)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                      Quantity (Metric Tonnes): <span className="text-[#A3E635] font-extrabold">{quantityTonnes} Tonnes</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="200"
                      step="1"
                      value={quantityTonnes}
                      onChange={(e) => setQuantityTonnes(Number(e.target.value))}
                      className="w-full accent-[#A3E635] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-emerald-400/80 font-mono mt-1">
                      <span>1 Tonne</span>
                      <span>50 Tonnes</span>
                      <span>100 Tonnes</span>
                      <span>200+ Tonnes</span>
                    </div>
                  </div>
                </div>

                {/* Destination selection */}
                <div>
                  <label className="block text-[11px] font-bold text-emerald-200 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>Delivery Destination / Logistics Hub</span>
                  </label>
                  <select
                    value={selectedDestIndex}
                    onChange={(e) => setSelectedDestIndex(Number(e.target.value))}
                    className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    {DESTINATIONS.map((d, i) => (
                      <option key={i} value={i} className="bg-[#0B2B1B] text-white">
                        {d.label} (+${d.logisticsEstimateUsd} freight est.)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Instant Price Estimate Display */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E5E3A] to-[#0F3520] border-2 border-[#A3E635]/60 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#A3E635] block">
                    Estimated Wholesale Quote
                  </span>
                  <div className="text-3xl font-black font-editorial text-white mt-0.5">
                    ${totalEstimatedUsd.toLocaleString()} <span className="text-xs font-sans text-emerald-200">USD</span>
                  </div>
                  <p className="text-[10px] text-emerald-200/80 mt-0.5">
                    Includes produce crop subtotal (${cropSubtotalUsd.toLocaleString()}) + estimated freight (${dest.logisticsEstimateUsd}).
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#A3E635] bg-black/40 px-3 py-1 rounded-full border border-[#A3E635]/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>FDA & Phytosanitary Certified</span>
                  </span>
                </div>
              </div>

              {/* Step 2: Contact Information */}
              <div className="p-4 rounded-2xl bg-[#0B2B1B] border border-[#1E5E3A]/60 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635] block">
                  2. Commercial Buyer Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. West Africa Foods Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Kwakye"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 20 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                    Special Packaging or Delivery Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specify starch content requirements, moisture percentage limits, or scheduled harvest windows..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                  ></textarea>
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
                className="w-full py-3.5 rounded-2xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer border border-white/40 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Routing Quote to Sales Team...' : 'Submit Commercial Quote Inquiry'}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
