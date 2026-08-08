import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, Package, FileText, Briefcase, ArrowRight } from 'lucide-react';
import { FARMS_DATA, PRODUCTS_DATA, PROJECTS_DATA, NEWS_DATA, SERVICES_DATA } from '../../data/companyData';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Filter Results
  const matchingFarms = normalizedQuery
    ? FARMS_DATA.filter((f) => f.name.toLowerCase().includes(normalizedQuery) || f.mainCrops.some((c) => c.toLowerCase().includes(normalizedQuery)))
    : [];

  const matchingProducts = normalizedQuery
    ? PRODUCTS_DATA.filter((p) => p.name.toLowerCase().includes(normalizedQuery) || p.category.toLowerCase().includes(normalizedQuery))
    : [];

  const matchingProjects = normalizedQuery
    ? PROJECTS_DATA.filter((pr) => pr.title.toLowerCase().includes(normalizedQuery) || pr.summary.toLowerCase().includes(normalizedQuery))
    : [];

  const matchingNews = normalizedQuery
    ? NEWS_DATA.filter((n) => n.title.toLowerCase().includes(normalizedQuery) || n.category.toLowerCase().includes(normalizedQuery))
    : [];

  const matchingServices = normalizedQuery
    ? SERVICES_DATA.filter((s) => s.title.toLowerCase().includes(normalizedQuery) || s.shortDesc.toLowerCase().includes(normalizedQuery))
    : [];

  const hasResults =
    matchingFarms.length > 0 ||
    matchingProducts.length > 0 ||
    matchingProjects.length > 0 ||
    matchingNews.length > 0 ||
    matchingServices.length > 0;

  const handleSelect = (route: string) => {
    onNavigate(route);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#0B2B1B] text-white border border-[#A3E635]/30 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Input Header */}
          <div className="p-4 border-b border-[#1E5E3A]/40 flex items-center gap-3 bg-[#062114]">
            <Search className="w-5 h-5 text-[#A3E635] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search farms, products, technology, projects, news..."
              autoFocus
              className="w-full bg-transparent text-white placeholder-emerald-200/50 text-base focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-white/10 text-xs text-emerald-200 hover:bg-white/20 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 divide-y divide-[#1E5E3A]/30">
            {!query && (
              <div className="py-8 text-center text-emerald-200/60 text-sm">
                Type keywords like <span className="text-[#A3E635]">"Maize"</span>, <span className="text-[#A3E635]">"Ho Farm"</span>, <span className="text-[#A3E635]">"Pineapple"</span>, or <span className="text-[#A3E635]">"Irrigation"</span>...
              </div>
            )}

            {query && !hasResults && (
              <div className="py-8 text-center text-emerald-200/60 text-sm">
                No matching results found for "<span className="text-white">{query}</span>".
              </div>
            )}

            {/* Farms */}
            {matchingFarms.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635] block mb-2">
                  Farm Estates ({matchingFarms.length})
                </span>
                <div className="space-y-1">
                  {matchingFarms.map((farm) => (
                    <button
                      key={farm.id}
                      onClick={() => handleSelect(`/operations/farms/${farm.slug}`)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1E5E3A]/50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#A3E635] shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-white group-hover:text-[#A3E635] transition-colors">{farm.name}</h5>
                          <p className="text-xs text-emerald-200/70">{farm.location} • {farm.sizeAcres} Acres</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
            {matchingProducts.length > 0 && (
              <div className="pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635] block mb-2">
                  Products ({matchingProducts.length})
                </span>
                <div className="space-y-1">
                  {matchingProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(`/products/${p.slug}`)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1E5E3A]/50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-[#A3E635] shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-white group-hover:text-[#A3E635] transition-colors">{p.name}</h5>
                          <p className="text-xs text-emerald-200/70">{p.category} • {p.harvestSeason}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects & News */}
            {matchingProjects.length > 0 && (
              <div className="pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635] block mb-2">
                  Projects ({matchingProjects.length})
                </span>
                <div className="space-y-1">
                  {matchingProjects.map((pr) => (
                    <button
                      key={pr.id}
                      onClick={() => handleSelect(`/projects/${pr.slug}`)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1E5E3A]/50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-[#A3E635] shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-white group-hover:text-[#A3E635] transition-colors">{pr.title}</h5>
                          <p className="text-xs text-emerald-200/70">{pr.location} • Status: {pr.status}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchingNews.length > 0 && (
              <div className="pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635] block mb-2">
                  News & Insights ({matchingNews.length})
                </span>
                <div className="space-y-1">
                  {matchingNews.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => handleSelect(`/insights/${n.slug}`)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#1E5E3A]/50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[#A3E635] shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-white group-hover:text-[#A3E635] transition-colors">{n.title}</h5>
                          <p className="text-xs text-emerald-200/70">{n.category} • {n.date}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
