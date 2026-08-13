import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ArrowRight, Sprout, User, Search, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { BrandLogo } from './BrandLogo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAuth,
  onOpenSearch
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    onClose();
  };

  const menuSections = [
    {
      id: 'about',
      title: 'About Us',
      route: '/about',
      sublinks: [
        { name: 'Who We Are', route: '/about#who-we-are' },
        { name: 'Mission & Vision', route: '/about#mission' },
        { name: 'Leadership & Story', route: '/about#story' },
        { name: 'African Agriculture', route: '/african-agriculture' }
      ]
    },
    {
      id: 'agriculture',
      title: 'Agriculture',
      route: '/agriculture',
      sublinks: [
        { name: 'Overview', route: '/agriculture' },
        { name: 'Crop Farming', route: '/agriculture/crops' },
        { name: 'Livestock & Poultry', route: '/agriculture/livestock' },
        { name: 'Horticulture & Greenhouses', route: '/agriculture/horticulture' },
        { name: 'Agro-Processing', route: '/agriculture/processing' }
      ]
    },
    {
      id: 'operations',
      title: 'Operations',
      route: '/operations',
      sublinks: [
        { name: 'Operations Overview', route: '/operations' },
        { name: 'Our Farms & Interactive Map', route: '/operations/farms' },
        { name: 'Services & Consulting', route: '/services' }
      ]
    },
    {
      id: 'products',
      title: 'Products',
      route: '/products',
      sublinks: [
        { name: 'All Produce & Goods', route: '/products' },
        { name: 'Grains & Cereals', route: '/products?cat=Grains' },
        { name: 'Fruits & Vegetables', route: '/products?cat=Fruits' },
        { name: 'Processed Goods', route: '/products?cat=Processed' }
      ]
    },
    {
      id: 'technology',
      title: 'Technology',
      route: '/technology',
      sublinks: [
        { name: 'Precision Agriculture', route: '/technology' },
        { name: 'Live Farm Telemetry', route: '/technology#dashboard' },
        { name: 'Solar Fertigation', route: '/technology#irrigation' }
      ]
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      route: '/sustainability',
      sublinks: [
        { name: 'Soil & Water Conservation', route: '/sustainability#soil' },
        { name: 'Outgrower Empowerment', route: '/sustainability#community' }
      ]
    },
    {
      id: 'projects',
      title: 'Projects',
      route: '/projects',
      sublinks: [
        { name: 'All Agricultural Projects', route: '/projects' },
        { name: 'Volta Irrigation Expansion', route: '/projects/volta-smart-solar-irrigation-expansion' },
        { name: 'Cold-Chain Depot', route: '/projects/kpando-cold-chain-and-processing-depot' }
      ]
    },
    {
      id: 'insights',
      title: 'Insights & Gallery',
      route: '/insights',
      sublinks: [
        { name: 'Company News & Insights', route: '/insights' },
        { name: 'Investor Relations', route: '/investors' },
        { name: 'Outgrower Scheme', route: '/outgrowers' },
        { name: 'Export & Logistics', route: '/export' },
        { name: 'Produce Traceability', route: '/traceability' },
        { name: 'Photo & Video Gallery', route: '/gallery' },
        { name: 'Frequently Asked Questions', route: '/faq' }
      ]
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md h-full bg-[#0B2B1B] text-white flex flex-col justify-between border-l border-[#A3E635]/20 overflow-y-auto"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#1E5E3A]/40 flex items-center justify-between bg-[#062114] sticky top-0 z-20">
            <div className="flex items-center justify-center">
              <BrandLogo size="sm" />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Actions Quick Row */}
          <div className="p-4 grid grid-cols-2 gap-2 bg-[#062114]/60 border-b border-[#1E5E3A]/30">
            <button
              onClick={() => {
                onOpenSearch();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-[#1E5E3A] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#A3E635]" />
              <span>Search</span>
            </button>
            <button
              onClick={() => {
                onOpenAuth();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-[#A3E635] text-[#0B2B1B] font-bold text-xs flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>User Account</span>
            </button>
          </div>

          {/* Menu Items Accordion */}
          <div className="p-4 space-y-2 flex-1">
            <button
              onClick={() => handleLinkClick('/')}
              className="w-full p-3.5 rounded-xl text-left font-bold text-base text-white hover:bg-[#1E5E3A]/40 transition-colors flex items-center justify-between"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-[#A3E635]" />
            </button>

            {menuSections.map((sec) => {
              const isExpanded = expandedSection === sec.id;
              return (
                <div key={sec.id} className="rounded-xl overflow-hidden border border-[#1E5E3A]/30 bg-[#062114]/40">
                  <div className="flex items-center justify-between p-3.5">
                    <button
                      onClick={() => handleLinkClick(sec.route)}
                      className="font-bold text-base text-white hover:text-[#A3E635] text-left flex-1"
                    >
                      {sec.title}
                    </button>
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className="p-1.5 rounded-lg bg-[#1E5E3A]/60 text-[#A3E635] hover:bg-[#1E5E3A]"
                    >
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Accordion Sublinks */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-3 space-y-1 bg-[#062114]/80 border-t border-[#1E5E3A]/20"
                      >
                        {sec.sublinks.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(sub.route)}
                            className="w-full text-left py-2 px-2 rounded-lg text-xs font-medium text-emerald-200 hover:text-[#A3E635] hover:bg-white/5 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
                            <span>{sub.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <button
              onClick={() => handleLinkClick('/careers')}
              className="w-full p-3.5 rounded-xl text-left font-bold text-base text-white hover:bg-[#1E5E3A]/40 transition-colors flex items-center justify-between"
            >
              <span>Careers</span>
              <ArrowRight className="w-4 h-4 text-[#A3E635]" />
            </button>

            <button
              onClick={() => handleLinkClick('/dashboard')}
              className="w-full p-3.5 rounded-xl text-left font-bold text-base text-[#A3E635] bg-[#1E5E3A] border border-[#A3E635]/40 hover:bg-[#287547] transition-colors flex items-center justify-between shadow-lg"
            >
              <span>Publisher & Blog Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#A3E635]" />
            </button>

            <button
              onClick={() => handleLinkClick('/contact')}
              className="w-full p-3.5 rounded-xl text-left font-bold text-base text-white bg-[#1E5E3A]/50 border border-[#A3E635]/30 hover:bg-[#1E5E3A] transition-colors flex items-center justify-between"
            >
              <span>Contact Headquarters</span>
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-[#1E5E3A]/40 bg-[#062114] text-xs text-emerald-200/70">
            <p className="font-bold text-white mb-1">Napoleon Steadings Ltd.</p>
            <p>{COMPANY_INFO.headquarters.fullAddress}</p>
            <p className="mt-2 text-[10px] uppercase text-[#A3E635] tracking-widest font-mono">
              Volta Region • Ghana • West Africa
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
