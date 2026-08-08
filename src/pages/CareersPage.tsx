import React, { useState } from 'react';
import { Briefcase, MapPin, CheckCircle2, Send, X } from 'lucide-react';
import { CAREERS_DATA } from '../data/companyData';
import { submitContactInquiry } from '../lib/firebase';

interface Props {
  onNavigate: (route: string) => void;
}

export const CareersPage: React.FC<Props> = () => {
  const [selectedJob, setSelectedJob] = useState<typeof CAREERS_DATA[0] | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        fullName,
        email,
        phone,
        inquiryType: 'Career Job Application',
        subject: `Application: ${selectedJob.title}`,
        message: `Cover Note: ${coverNote}`
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-20">
      <section className="bg-[#0B2B1B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] block mb-2">
            Work With Us
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white">
            Career Opportunities in Modern Agriculture
          </h1>
          <p className="mt-4 text-emerald-100/90 text-base sm:text-xl max-w-2xl font-light">
            Join our team of agronomists, smart ag engineers, and processing specialists in Ho, Volta Region, Ghana.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F8F3] text-[#132A13] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAREERS_DATA.map((job) => (
              <div key={job.id} className="p-8 rounded-3xl bg-white border border-[#1E5E3A]/15 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#1E5E3A] block mb-1">{job.department} • {job.employmentType}</span>
                  <h3 className="font-editorial text-xl font-bold text-[#0B2B1B]">{job.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1E5E3A]" />
                    <span>{job.location}</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-3 mt-3 leading-relaxed">{job.description}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setSubmitted(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#0B2B1B] hover:bg-[#1E5E3A] text-white font-bold text-xs transition-colors"
                >
                  View Position & Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0B2B1B] text-white rounded-3xl p-6 sm:p-8 border border-[#A3E635]/30 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20">
              <X className="w-5 h-5 text-white" />
            </button>

            <span className="text-[10px] uppercase font-bold text-[#A3E635]">{selectedJob.department}</span>
            <h3 className="font-editorial text-2xl font-bold text-white mt-1">{selectedJob.title}</h3>
            <p className="text-xs text-emerald-200 mt-0.5">{selectedJob.location} • {selectedJob.experienceLevel}</p>

            <div className="my-6 space-y-4 text-xs text-emerald-100/90 border-y border-[#1E5E3A]/40 py-4">
              <h4 className="font-bold text-white text-sm">Key Responsibilities:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {submitted ? (
              <div className="p-4 rounded-xl bg-[#1E5E3A] text-[#A3E635] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Application submitted successfully! Our HR team will review your profile.</span>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs focus:outline-none focus:border-[#A3E635]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs focus:outline-none focus:border-[#A3E635]"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (+233...)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs focus:outline-none focus:border-[#A3E635]"
                />
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Brief cover letter / background summary..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs focus:outline-none focus:border-[#A3E635]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
