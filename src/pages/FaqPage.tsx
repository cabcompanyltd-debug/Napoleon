import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, HelpCircle, ArrowRight, Search, Briefcase, 
  Handshake, Sprout, Tractor, Package, Sparkles, Filter, CheckCircle2 
} from 'lucide-react';

interface Props {
  onNavigate: (route: string) => void;
}

interface FAQItemData {
  id: string;
  category: 'Partnerships' | 'Careers' | 'Operations' | 'Products' | 'General';
  question: string;
  answer: string;
  highlights?: string[];
  actionLabel?: string;
  actionRoute?: string;
}

const EXPANDED_FAQS: FAQItemData[] = [
  // PARTNERSHIPS
  {
    id: 'part-1',
    category: 'Partnerships',
    question: 'How does the Volta Basin Outgrower Scheme work for local farmers?',
    answer: 'The Volta Basin Outgrower Scheme is a collaborative model where Napoleon Steadings Ltd. partners with local smallholder farming households. We supply certified high-yield hybrid seeds, mechanized tractor tillage, organic soil inputs, and technical agronomic support. At harvest time, we guarantee off-take buyback contracts at fair market prices, ensuring stable farmer income and continuous raw material supply for our processing plants.',
    highlights: ['Guaranteed market buyback contracts', 'Zero-interest input credit', 'Tractor tillage & mechanization support'],
    actionLabel: 'Explore Outgrower Scheme',
    actionRoute: '/partnerships'
  },
  {
    id: 'part-2',
    category: 'Partnerships',
    question: 'What institutional and commercial investment opportunities are available?',
    answer: 'We offer commercial partnership structures in cold-chain logistics, solar drip irrigation infrastructure, high-grade cassava starch expansion, and export off-take agreements. Institutional investors can collaborate on joint farm expansion across our 3,500+ acre holdings in Volta Region.',
    highlights: ['Export off-take agreements', 'Agro-processing equity partnerships', 'Sustainable ESG agricultural funds'],
    actionLabel: 'Investor Relations',
    actionRoute: '/partnerships'
  },
  {
    id: 'part-3',
    category: 'Partnerships',
    question: 'Can commercial food processors or feed mills enter long-term off-take contracts?',
    answer: 'Yes! We establish multi-year supply agreements for yellow/white maize, high-protein soybeans, and high-grade cassava starch. Contact our commercial desk in Ho to reserve quarterly harvest volumes.',
    highlights: ['Custom moisture & grain specifications', 'Scheduled freight dispatch to Accra/Tema', 'Quality assurance lab certification'],
    actionLabel: 'Contact Commercial Desk',
    actionRoute: '/contact'
  },

  // CAREERS
  {
    id: 'car-1',
    category: 'Careers',
    question: 'What career and employment opportunities does Napoleon Steadings offer?',
    answer: 'We regularly recruit skilled professionals across Agronomy & Soil Science, Heavy Equipment Operation (Tractors/Combine Harvesters), Food Processing Engineering, IoT & Drone Systems, Cold-Chain Logistics, and Corporate Operations at our Ho headquarters and farm depots.',
    highlights: ['Competitive salary & performance bonuses', 'Continuous technical training & certification', 'Housing & health benefits for farm management staff'],
    actionLabel: 'View Open Positions',
    actionRoute: '/careers'
  },
  {
    id: 'car-2',
    category: 'Careers',
    question: 'Do you offer graduate internships or national service placements in Agriculture?',
    answer: 'Yes! Our Young Agronomist Development Program accepts National Service Personnel and agricultural science graduates from Ghanaian universities (UHAS, UG, KNUST, UENR). Interns receive hands-on experience in precision irrigation, greenhouse horticulture, and agro-processing.',
    highlights: ['Structured mentorship from senior agronomists', 'Direct pathway to full-time employment', 'Research project support'],
    actionLabel: 'Apply for Graduate Scheme',
    actionRoute: '/careers'
  },
  {
    id: 'car-3',
    category: 'Careers',
    question: 'How do I submit an application or speculative CV to Napoleon Steadings Ltd.?',
    answer: 'You can apply directly through our online Careers portal or email your CV, cover letter, and academic transcripts to careers@napoleonsteadings.com. Our HR team in Ho reviews applications on a rolling basis.',
    highlights: ['Online application portal', 'Direct HR contact in Ho', 'Rolling review process'],
    actionLabel: 'Careers Portal',
    actionRoute: '/careers'
  },

  // OPERATIONS
  {
    id: 'op-1',
    category: 'Operations',
    question: 'Where are Napoleon Steadings Ltd. farm estates and processing depots located?',
    answer: 'Our corporate headquarters is located in Ho, Volta Region. Our primary commercial farm estates and processing depots span Adaklu Plains (Grain Silos & Livestock), Kpando District (Horticulture & Fruits), Hohoe Municipal (Agro-Processing Depot), and Ave-Dakpa (Greenhouse Seedling Nursery).',
    highlights: ['Ho Headquarters', 'Adaklu Grain & Cattle Estate', 'Hohoe Processing Hub'],
    actionLabel: 'Explore Farm Locations',
    actionRoute: '/operations/farms'
  },
  {
    id: 'op-2',
    category: 'Operations',
    question: 'How does Napoleon Steadings maintain environmental sustainability and zero waste?',
    answer: 'We utilize 450kW solar photovoltaic power for water pumping, sub-surface drip irrigation to prevent evaporation, biogas methane recovery from cattle manure, and organic compost recycling from crop husks.',
    highlights: ['450kW Solar Pumping', 'Biogas Methane Energy', 'Zero-Burn Land Clearance'],
    actionLabel: 'Sustainability Report',
    actionRoute: '/sustainability'
  },

  // PRODUCTS & GENERAL
  {
    id: 'prod-1',
    category: 'Products',
    question: 'What is the minimum order quantity (MOQ) for bulk farm produce?',
    answer: 'Our standard Minimum Order Quantity (MOQ) for commercial grain loads is 5 Metric Tons. For export pineapples and vegetables, MOQs start at 1 Metric Ton with cold-chain packaging.',
    highlights: ['5 MT Minimum for Grains', '1 MT Minimum for Fresh Fruits', 'Bulk Jumbo Bag Options'],
    actionLabel: 'Browse Product Catalog',
    actionRoute: '/products'
  },
  {
    id: 'gen-1',
    category: 'General',
    question: 'Can visitors or educational groups tour Napoleon Steadings farm sites?',
    answer: 'We host scheduled corporate delegations, university research teams, and agricultural school tours at our Adaklu and Hohoe farm sites. Pre-booking is required at least two weeks in advance.',
    highlights: ['Guided ag-tech field walks', 'Drone mapping demonstration', 'Agro-processing plant tour'],
    actionLabel: 'Request Farm Visit',
    actionRoute: '/contact'
  }
];

export const FaqPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('part-1');

  const categories = ['All', 'Partnerships', 'Careers', 'Operations', 'Products', 'General'];

  const filteredFaqs = EXPANDED_FAQS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full pt-20 bg-[#F9F8F3] text-[#132A13] min-h-screen">
      {/* HEADER HERO */}
      <section className="bg-[#0B2B1B] text-white py-20 relative overflow-hidden border-b border-[#A3E635]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Information & Inquiry Desk</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Clear answers regarding partnership schemes, career opportunities, outgrower contracts, farm mechanization, and bulk supply.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl relative">
            <Search className="w-5 h-5 text-emerald-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partnerships, careers, produce, farm visits..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-[#A3E635]/40 text-white placeholder-emerald-200/60 text-sm focus:outline-none focus:border-[#A3E635] shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-emerald-300 hover:text-white font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ MAIN CONTENT */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat
                    ? 'bg-[#0B2B1B] text-[#A3E635] shadow-lg shadow-[#0B2B1B]/30 border border-[#A3E635]/40'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {cat === 'Partnerships' && <Handshake className="w-3.5 h-3.5" />}
                {cat === 'Careers' && <Briefcase className="w-3.5 h-3.5" />}
                {cat === 'Operations' && <Tractor className="w-3.5 h-3.5" />}
                {cat === 'Products' && <Package className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {filteredFaqs.length} answered inquiries</span>
            {searchQuery && <span>Filter query: "{searchQuery}"</span>}
          </div>

          {/* Smooth Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-editorial text-xl font-bold text-[#0B2B1B]">No matching answers found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We couldn't find an exact match for your search query. Please try searching with different keywords or contact our Ho office directly.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0B2B1B] text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((item) => {
                const isOpen = expandedId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-[#1E5E3A] shadow-xl ring-2 ring-[#1E5E3A]/20'
                        : 'border-slate-200/80 shadow-sm hover:border-emerald-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full p-6 text-left font-editorial text-lg sm:text-xl font-bold text-[#0B2B1B] flex items-center justify-between gap-4 transition-colors hover:text-[#1E5E3A]"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-extrabold uppercase tracking-wider bg-emerald-100 text-[#0B2B1B] shrink-0">
                          {item.category}
                        </span>
                        <span>{item.question}</span>
                      </div>
                      <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                        isOpen ? 'bg-[#0B2B1B] text-[#A3E635] rotate-180' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 space-y-4">
                            <p>{item.answer}</p>

                            {item.highlights && (
                              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-emerald-200 space-y-2">
                                <span className="text-[11px] font-bold text-[#0B2B1B] uppercase tracking-wider block">Key Highlights</span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  {item.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5E3A] shrink-0" />
                                      <span>{h}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.actionLabel && item.actionRoute && (
                              <div className="pt-2 flex justify-end">
                                <button
                                  onClick={() => onNavigate(item.actionRoute!)}
                                  className="px-4 py-2 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-extrabold text-xs inline-flex items-center gap-2 transition-transform active:scale-95 shadow-md"
                                >
                                  <span>{item.actionLabel}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Contact Direct Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0B2B1B] via-[#1E5E3A] to-[#0B2B1B] text-white text-center space-y-4 shadow-2xl border border-[#A3E635]/30">
            <div className="w-12 h-12 rounded-2xl bg-[#A3E635] text-[#0B2B1B] flex items-center justify-center mx-auto font-bold shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold">Have an Unanswered Question or Custom Proposal?</h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto">
              Our executive administrative team at Barracks New Town, Ho, is ready to discuss commercial agreements, land leases, or career placements.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-8 py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm inline-flex items-center gap-2 shadow-xl transition-transform active:scale-95"
              >
                <span>Connect With Executive Desk</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
