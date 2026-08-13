import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  Play,
  Youtube,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { GalleryItemData, getPublishedGalleryItems } from '../lib/insforge';

export const GalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Farms',
    'Crops',
    'Machinery',
    'People',
    'Volta Region',
    'Technology',
    'Processing',
  ];

  useEffect(() => {
    loadPublishedGallery();

    const handleUpdate = () => {
      loadPublishedGallery();
    };

    window.addEventListener('gallery-items-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('gallery-items-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const loadPublishedGallery = async () => {
    setLoading(true);
    try {
      const data = await getPublishedGalleryItems();
      setGalleryItems(data);
    } catch (err) {
      console.error('Failed to load published gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems =
    selectedCat === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCat);

  const activeItem =
    activeLightboxIndex !== null && filteredItems[activeLightboxIndex]
      ? filteredItems[activeLightboxIndex]
      : null;

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <div className="w-full pt-20 bg-[#061A10] text-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] text-white py-20 border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-4 border border-[#A3E635]/30">
            <Camera className="w-4 h-4" />
            <span>Visual Portfolio & Video Tours</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Media, Photography & Video Gallery
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            High-resolution photography and video features showcasing our Volta Region farm estates, smart irrigation, heavy machinery, and local community impact.
          </p>
        </div>
      </section>

      {/* GALLERY GRID SECTION */}
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
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-[#1E5E3A] text-[#A3E635] shadow-lg shadow-[#1E5E3A]/30 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-[#1E5E3A]" />
              <p className="text-sm font-semibold text-slate-600">Loading Media Portfolio...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
              <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-slate-800">No media published in this category yet.</h3>
              <p className="text-xs text-slate-500 mt-1">Check back soon for new photography and video updates.</p>
            </div>
          ) : (
            /* Masonry Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="group relative rounded-3xl overflow-hidden bg-black aspect-4/3 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
                >
                  <img
                    src={item.thumbnailUrl || item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />

                  {/* YouTube Play Overlay Badge */}
                  {item.type === 'youtube' && (
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Type Badge Top-Right */}
                  <div className="absolute top-3 right-3 z-10">
                    {item.type === 'youtube' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-red-400 text-[10px] font-bold border border-red-500/30 shadow-lg">
                        <Youtube className="w-3 h-3 text-red-500" />
                        <span>Video</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#A3E635] text-[10px] font-bold border border-[#A3E635]/30 shadow-lg">
                        <ImageIcon className="w-3 h-3" />
                        <span>Photo</span>
                      </span>
                    )}
                  </div>

                  {/* Hover Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] uppercase font-bold text-[#A3E635]">
                      {item.category}
                    </span>
                    <h4 className="font-editorial text-sm font-bold line-clamp-1">{item.title}</h4>
                    {item.location && (
                      <p className="text-[11px] text-emerald-200/80 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#A3E635]" />
                        <span>{item.location}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX & YOUTUBE PLAYER */}
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
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
              {activeItem.type === 'youtube' && activeItem.youtubeVideoId ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20">
                  <iframe
                    title={activeItem.title}
                    src={`https://www.youtube.com/embed/${activeItem.youtubeVideoId}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <motion.img
                  key={activeItem.id}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  src={activeItem.imageUrl || activeItem.thumbnailUrl}
                  alt={activeItem.title}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              )}

              <div className="mt-4 text-center max-w-xl text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
                  {activeItem.category} {activeItem.location ? `• ${activeItem.location}` : ''}
                </span>
                <h3 className="font-editorial text-xl font-bold mt-1">{activeItem.title}</h3>
                {activeItem.description && (
                  <p className="text-xs text-emerald-200/80 mt-1">{activeItem.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
