import React from 'react';
import { ArrowRight, Tractor, MapPin, CheckCircle2 } from 'lucide-react';
import { ImageReveal } from '../components/animations/ImageReveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const OperationsPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Infrastructure & Logistics
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Operational Excellence & Fleet Management
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Heavy machinery, automated grain silos, solar fertigation, and cold-chain distribution across Ghana.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-editorial text-3xl font-bold text-[#0B2B1B]">
                Mechanized Land Development & Harvest Logistics
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Operating a fleet of 18 high-horsepower John Deere and Massey Ferguson tractors, combined harvesters, and specialized sub-surface ploughs, Napoleon Steadings Ltd. provides continuous land preparation and harvesting across Volta Region.
              </p>
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#0B2B1B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" />
                  <span>GPS Precision Field Mapping & Auto-Steer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5E3A]" />
                  <span>On-Site Diesel Storage & Solar Power Micro-Grids</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ImageReveal
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1200"
                alt="Agricultural Tractor Machinery"
                aspectRatio="aspect-4/3"
              />
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0B2B1B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-editorial text-2xl font-bold">Explore Our 5 Farm Estates</h3>
              <p className="text-xs text-emerald-200 mt-1">View interactive map, crop yields, and coordinates for all active holdings.</p>
            </div>
            <button
              onClick={() => onNavigate('/operations/farms')}
              className="px-6 py-3.5 rounded-xl bg-[#A3E635] text-[#0B2B1B] font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shrink-0"
            >
              <span>Farm Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
