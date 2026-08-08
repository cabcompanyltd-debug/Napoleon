import React from 'react';
import { ArrowRight, Globe, Award } from 'lucide-react';
import { ImageReveal } from '../components/animations/ImageReveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const AfricanAgriculturePage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Editorial Feature
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white max-w-4xl">
            The African Agriculture Story: Modern, Productive & Global
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Championing Volta Region's rich soil, young agricultural workforce, and commercial technology.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ImageReveal
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1400"
            alt="African Agriculture Landscape"
            aspectRatio="aspect-16/9"
          />

          <div className="prose prose-lg text-slate-800 space-y-6">
            <h2 className="font-editorial text-3xl font-bold text-[#0B2B1B]">
              Reframing African Farming Through Technology & Scale
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              Sub-Saharan Africa possesses over 60% of the world's uncultivated arable land. At <strong>Napoleon Steadings Ltd.</strong>, we see this not merely as potential, but as an active commercial imperative.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Based in Ho, Volta Region, Ghana, our commercial farm estates demonstrate that combining modern tractor fleets, solar drip fertigation, and automated grain silos can yield world-class harvests while building regional wealth.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0B2B1B] text-white space-y-4">
            <h3 className="font-editorial text-2xl font-bold">Partner With a Growing African Enterprise</h3>
            <p className="text-xs sm:text-sm text-emerald-100/80">Explore commercial off-take contracts or investment opportunities with Napoleon Steadings Ltd.</p>
            <button
              onClick={() => onNavigate('/partnerships')}
              className="px-6 py-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs sm:text-sm inline-flex items-center gap-2"
            >
              <span>Explore Commercial Partnerships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
