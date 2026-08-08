import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Camera } from 'lucide-react';
import { GALLERY_DATA } from '../data/companyData';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Farms', 'Crops', 'Machinery', 'People', 'Volta Region', 'Technology', 'Processing'];

  const filteredItems = selectedCat === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === selectedCat);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="w-full pt-20 bg-[#061A10] text-white">
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-20 border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-4 border border-[#A3E635]/30">
            <Camera className="w-4 h-4" />
            <span>Visual Portfolio</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Media & Photography Gallery
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            High-resolution photography showcasing our Volta Region farm estates, crop harvesting, machinery, and people.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#F5F8F4] via-[#FFFFFF] to-[#F5F8F4] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-slate-200 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCat(cat);
                  setActiveLightboxIndex(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCat === cat
                    ? 'bg-[#1E5E3A] text-[#A3E635] shadow-lg shadow-[#1E5E3A]/30 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative rounded-3xl overflow-hidden bg-black aspect-4/3 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold text-[#A3E635]">{item.category}</span>
                  <h4 className="font-editorial text-sm font-bold">{item.title}</h4>
                  <p className="text-[11px] text-emerald-200/80 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#A3E635]" />
                    <span>{item.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
              <motion.img
                key={activeItem.id}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center max-w-xl text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
                  {activeItem.category} • {activeItem.location}
                </span>
                <h3 className="font-editorial text-xl font-bold mt-1">{activeItem.title}</h3>
                <p className="text-xs text-emerald-200/80 mt-1">{activeItem.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
