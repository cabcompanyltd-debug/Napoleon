import React, { useState } from 'react';
import { Briefcase, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { PROJECTS_DATA } from '../data/companyData';
import { Reveal } from '../components/animations/Reveal';

interface Props {
  onNavigate: (route: string) => void;
}

export const ProjectsPage: React.FC<Props> = ({ onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filtered = filterStatus === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.status === filterStatus);

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Strategic Initiatives
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Agricultural Projects Showcase
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Major infrastructure, solar irrigation, and outgrower empowerment projects across Volta Region, Ghana.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Filter */}
          <div className="flex gap-2 mb-10 pb-4 border-b border-slate-200">
            {['All', 'Ongoing', 'Completed', 'Planned'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterStatus === st
                    ? 'bg-[#1E5E3A] text-[#A3E635] shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((proj) => (
              <Reveal key={proj.id} variant="fadeUp">
                <div className="group rounded-3xl overflow-hidden bg-white border border-[#1E5E3A]/15 shadow-xl flex flex-col h-full hover:-translate-y-1.5 transition-all">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B2B1B]/90 text-[#A3E635] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#A3E635]/30">
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#1E5E3A] uppercase block mb-1">{proj.category} • {proj.location}</span>
                      <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] group-hover:text-[#1E5E3A] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E5E3A]">Target: {proj.completionTarget}</span>
                      <button
                        onClick={() => onNavigate(`/projects/${proj.slug}`)}
                        className="px-5 py-2.5 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs inline-flex items-center gap-2 transition-colors"
                      >
                        <span>Project Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#A3E635]" />
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
