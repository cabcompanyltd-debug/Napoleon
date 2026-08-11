import React, { useState } from 'react';
import { ArrowLeft, Package, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/companyData';
import { submitContactInquiry } from '../lib/insforge';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const product = PRODUCTS_DATA.find((p) => p.slug === slug) || PRODUCTS_DATA[0];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        name: fullName,
        email,
        subject: `Product Order Inquiry: ${product.name} (${quantity})`,
        message: `Quantity requested: ${quantity}. Note: ${message}`
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/products')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3E635] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block mb-2">
            {product.category}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white">{product.name}</h1>
          <p className="mt-2 text-sm text-emerald-100/90 max-w-xl">{product.tagline}</p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-2xl border border-[#1E5E3A]/20">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] mb-3">Product Overview & Quality</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>
              </div>

              {product.nutritionalHighlights && (
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#0B2B1B] mb-3">Quality Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.nutritionalHighlights.map((nh, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-[#1E5E3A]/15 text-xs text-[#0B2B1B] font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" />
                        <span>{nh}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Inquiry Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-[#1E5E3A]/20 shadow-lg space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-[#1E5E3A]">Packaging & Harvest Schedule</h4>
                <div className="space-y-3 text-xs divide-y divide-slate-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-1 sm:gap-2">
                    <span className="text-slate-500 font-semibold">Min Order Quantity:</span>
                    <span className="font-bold text-[#0B2B1B] text-sm">{product.minOrderQuantity}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-1 sm:gap-2">
                    <span className="text-slate-500 font-semibold">Harvest Availability:</span>
                    <span className="font-bold text-[#1E5E3A] text-sm">{product.harvestSeason}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-500 font-semibold block mb-1">Packaging Options:</span>
                    <ul className="list-disc list-inside text-slate-800 space-y-1">
                      {product.packagingOptions.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0B2B1B] text-white border border-[#A3E635]/30 shadow-2xl">
                <h4 className="font-editorial text-xl font-bold text-white mb-2">Request Order Quote</h4>
                <p className="text-xs text-emerald-200/80 mb-6">Submit an inquiry to our commercial sales desk in Ho.</p>

                {submitted ? (
                  <div className="p-4 rounded-xl bg-[#1E5E3A] text-[#A3E635] text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Inquiry sent to our sales desk. We will contact you shortly!</span>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                    />
                    <input
                      type="text"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Estimated Quantity (e.g. 10 Tons)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                    />
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Delivery location or special requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-emerald-200/50 focus:outline-none focus:border-[#A3E635]"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                    >
                      <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Commercial Quote Request'}</span>
                      <Send className="w-3.5 h-3.5" />
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
