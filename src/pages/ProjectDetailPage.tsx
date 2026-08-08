import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Briefcase } from 'lucide-react';
import { PROJECTS_DATA } from '../data/companyData';

interface Props {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ProjectDetailPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const project = PROJECTS_DATA.find((p) => p.slug === slug) || PROJECTS_DATA[0];

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3E635] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block mb-2">
            {project.category} • {project.status}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white">{project.title}</h1>
          <p className="mt-2 text-sm text-emerald-100/90">{project.location} • Timeline: {project.startDate} to {project.completionTarget}</p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl overflow-hidden aspect-16/10 shadow-2xl border border-[#1E5E3A]/20">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2B1B] mb-3">Project Overview</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{project.fullDescription}</p>
              </div>

              <div>
                <h3 className="font-editorial text-xl font-bold text-[#0B2B1B] mb-3">Core Objectives</h3>
                <div className="space-y-2">
                  {project.objectives.map((obj, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-[#1E5E3A]/15 text-xs text-[#0B2B1B] font-medium flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1E5E3A] shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#0B2B1B] text-white border border-[#A3E635]/30 shadow-2xl space-y-4">
                <h4 className="font-editorial text-xl font-bold text-white">Impact & Performance Metrics</h4>
                <div className="space-y-4 pt-2">
                  {project.impactMetrics.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#062114] border border-[#1E5E3A] flex items-center justify-between">
                      <span className="text-xs text-emerald-200 uppercase font-semibold">{m.label}</span>
                      <span className="font-num text-2xl font-bold text-[#A3E635]">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
