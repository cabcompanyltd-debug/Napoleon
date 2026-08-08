import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sprout, Tractor, Package, Activity, Leaf, Shield, Globe } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  activeMenu: 'agriculture' | 'operations' | 'products' | 'technology' | null;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, activeMenu, onClose, onNavigate }) => {
  if (!isOpen || !activeMenu) return null;

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    onClose();
  };

  const getMenuContent = () => {
    switch (activeMenu) {
      case 'agriculture':
        return {
          title: 'Agricultural Enterprises',
          tagline: 'Modern, large-scale cultivation and livestock in Volta Region, Ghana.',
          links: [
            { name: 'Agriculture Overview', route: '/agriculture', desc: 'Central agricultural philosophy & division' },
            { name: 'Crop Farming', route: '/agriculture/crops', desc: 'Commercial grains, cereals & root staples' },
            { name: 'Livestock & Poultry', route: '/agriculture/livestock', desc: 'Pastured cattle & layer broilers' },
            { name: 'Horticulture & Greenhouses', route: '/agriculture/horticulture', desc: 'Export fruit & greenhouse vegetables' },
            { name: 'Agro-Processing & Value Addition', route: '/agriculture/processing', desc: 'Cassava starch, milling & packaging' }
          ],
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
          imageCaption: 'Ho Central Commercial Crop Estate'
        };
      case 'operations':
        return {
          title: 'Operations & Infrastructure',
          tagline: 'Precision machinery, storage silos, and cold-chain supply routes.',
          links: [
            { name: 'Operations Overview', route: '/operations', desc: 'End-to-end farm logistics & machinery' },
            { name: 'Farm Directory & Interactive Map', route: '/operations/farms', desc: 'Real Leaflet map & farm profiles' },
            { name: 'Processing & Storage', route: '/operations#processing', desc: 'Automated silos & cold packhouses' },
            { name: 'Agricultural Services', route: '/services', desc: 'Farm development & commercial consulting' }
          ],
          image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=600',
          imageCaption: 'Modern Mechanized Grain Harvesting'
        };
      case 'products':
        return {
          title: 'Product Catalog',
          tagline: 'High-grade fresh produce, grains, and processed agricultural goods.',
          links: [
            { name: 'All Products Catalog', route: '/products', desc: 'Search and inspect all agricultural produce' },
            { name: 'Grains & Cereals', route: '/products?cat=Grains', desc: 'Clean maize grain, soybeans & sorghum' },
            { name: 'Fresh Fruits & Vegetables', route: '/products?cat=Fruits', desc: 'Smooth Cayenne pineapples & peppers' },
            { name: 'Processed Goods', route: '/products?cat=Processed', desc: 'High-grade cassava flour & starch' },
            { name: 'Livestock & Poultry', route: '/products?cat=Livestock', desc: 'Pasture eggs & dressed broiler birds' }
          ],
          image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=600',
          imageCaption: 'Export Quality Smooth Cayenne Pineapples'
        };
      case 'technology':
        return {
          title: 'Agri-Tech & Precision Ag',
          tagline: 'IoT soil sensors, drone crop health, and solar drip fertigation.',
          links: [
            { name: 'Precision Agriculture Overview', route: '/technology', desc: 'Futuristic black & lemon green technology portal' },
            { name: 'Live Farm Telemetry Dashboard', route: '/technology#dashboard', desc: 'Real-time soil moisture & weather telemetry' },
            { name: 'Solar Drip Fertigation', route: '/technology#irrigation', desc: 'Zero-emission solar water pumping' }
          ],
          image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600',
          imageCaption: 'Smart Greenhouse Climate Controls'
        };
      default:
        return null;
    }
  };

  const content = getMenuContent();
  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#0B2B1B] text-white border-b border-[#A3E635]/30 shadow-2xl py-8 px-6 sm:px-12 z-40 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Links Grid */}
          <div className="md:col-span-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635] block mb-1">
              Napoleon Steadings
            </span>
            <h3 className="font-editorial text-2xl font-bold text-white mb-1">{content.title}</h3>
            <p className="text-xs text-emerald-200/80 mb-6">{content.tagline}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(link.route)}
                  className="p-3 rounded-xl bg-[#062114] border border-[#1E5E3A]/40 hover:bg-[#1E5E3A] hover:border-[#A3E635]/40 text-left transition-all duration-200 group flex items-start justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-[#A3E635] transition-colors flex items-center gap-1.5">
                      <span>{link.name}</span>
                    </h4>
                    <p className="text-xs text-emerald-200/70 mt-0.5">{link.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A3E635] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Side Preview Image Card */}
          <div className="md:col-span-4 hidden md:block">
            <div className="relative rounded-2xl overflow-hidden border border-[#1E5E3A]/60 bg-[#062114] aspect-4/3 group shadow-xl">
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635] block">
                  Volta Field Operations
                </span>
                <p className="font-editorial font-bold text-sm text-white">{content.imageCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
