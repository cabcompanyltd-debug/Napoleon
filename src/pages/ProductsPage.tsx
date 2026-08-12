import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, ArrowRight, CheckCircle2, MessageSquare, ShoppingBag, Loader2 } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/companyData';
import { getProducts, ProductData } from '../lib/insforge';
import { Reveal } from '../components/animations/Reveal';

interface ProductsPageProps {
  onNavigate: (route: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const fetched = await getProducts();
        if (fetched && fetched.length > 0) {
          setProducts(fetched);
        } else {
          // Fallback to static seed array if empty
          setProducts(PRODUCTS_DATA as any);
        }
      } catch (err) {
        setProducts(PRODUCTS_DATA as any);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = ['All', 'Grains & Cereals', 'Fruits & Vegetables', 'Fresh Produce', 'Livestock & Poultry', 'Processed Goods', 'Seeds & Inputs'];

  const filtered = products.filter((p) => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full pt-20 bg-[#061A10] text-white">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04120B] py-20 border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-4 border border-[#A3E635]/30">
            <ShoppingBag className="w-4 h-4" />
            <span>Commercial Produce Catalog</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Agricultural Products & Inputs
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Fresh produce, staple grains, pastured poultry, and high-grade industrial cassava flour from Volta Region, Ghana.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#F5F8F4] via-[#FFFFFF] to-[#F5F8F4] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
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

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#1E5E3A] shadow-sm"
              />
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <Reveal key={product.id} variant="fadeUp">
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#1E5E3A]/20 shadow-xl flex flex-col h-full hover:-translate-y-2 transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#1E5E3A] text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-editorial text-xl font-bold text-[#0B2B1B] group-hover:text-[#1E5E3A] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B2B1B]">
                      <span className="text-[#1E5E3A] bg-[#1E5E3A]/10 px-2.5 py-1 rounded-md">
                        Min Order: {product.minOrderQuantity}
                      </span>
                      <button
                        onClick={() => onNavigate(`/products/${product.slug}`)}
                        className="text-[#0B2B1B] hover:text-[#1E5E3A] font-extrabold flex items-center gap-1"
                      >
                        <span>Specifications</span> &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
