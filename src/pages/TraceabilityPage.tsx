import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, QrCode, MapPin, Calendar, Sprout, CheckCircle2, AlertCircle, ArrowRight, Award, UserCheck } from 'lucide-react';
import { SAMPLE_BATCHES, getBatchInfo, TraceabilityBatch } from '../lib/insforge';

interface PageProps {
  onNavigate: (route: string) => void;
}

export const TraceabilityPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [searchCode, setSearchCode] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<TraceabilityBatch | null>(SAMPLE_BATCHES[0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check URL search parameters for ?batch= or ?code=
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('batch') || params.get('code');
    if (codeParam) {
      const found = getBatchInfo(codeParam);
      if (found) {
        setSelectedBatch(found);
        setSearchCode(found.batchCode);
      }
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const found = getBatchInfo(searchCode);
    if (found) {
      setSelectedBatch(found);
      setErrorMsg(null);
    } else {
      setErrorMsg(`Batch Code "${searchCode}" was not found. Try selecting one of the certified active batches below.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#04140C] text-white pt-24 pb-20 font-sans">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-[#061A10] via-[#04140C] to-[#04140C] border-b border-[#1E5E3A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold uppercase tracking-widest">
            <QrCode className="w-4 h-4" />
            <span>Farm Gate Lot Verification & Supply Chain Transparency</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white">
            Produce Traceability & Batch Quality Verification
          </h1>
          <p className="text-base text-emerald-200/90 max-w-3xl leading-relaxed">
            Scan or enter your product lot batch code to verify farm origin, harvest date, Volta Region soil conditions, moisture testing, and food safety certifications.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search Bar */}
        <div className="p-6 rounded-3xl bg-[#071910] border-2 border-[#1E5E3A] shadow-xl space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-[#A3E635]" />
              <input
                type="text"
                placeholder="Enter Batch Code (e.g., NS-VOLTA-2026-CASSAVA-01)..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-2xl pl-12 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shrink-0"
            >
              Verify Lot Number
            </button>
          </form>

          {/* Quick Select Sample Batch Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold text-emerald-300">Quick Test Active Batches:</span>
            {SAMPLE_BATCHES.map((b) => (
              <button
                key={b.batchCode}
                onClick={() => {
                  setSelectedBatch(b);
                  setSearchCode(b.batchCode);
                  setErrorMsg(null);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  selectedBatch?.batchCode === b.batchCode
                    ? 'bg-[#A3E635] text-[#0B2B1B] font-extrabold shadow-md'
                    : 'bg-black/40 text-emerald-300 border border-[#1E5E3A] hover:bg-[#1E5E3A]/50'
                }`}
              >
                {b.batchCode}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Selected Batch Passport Card */}
        {selectedBatch && (
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#061A10] via-[#0B2B1B] to-[#04140C] border-2 border-[#A3E635]/60 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E5E3A] pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635] inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Digital Passport • {selectedBatch.qualityGrade}</span>
                </span>
                <h2 className="font-editorial text-3xl font-bold text-white mt-1">
                  {selectedBatch.cropName}
                </h2>
                <p className="text-xs font-mono text-emerald-300/90 mt-0.5">
                  Variety: {selectedBatch.variety} • Batch ID: <strong className="text-white">{selectedBatch.batchCode}</strong>
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] font-extrabold text-xs text-center self-start sm:self-auto">
                AUTHENTICITY PASSED
              </div>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-1">
                <span className="text-[10px] text-emerald-300 uppercase font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Farm Origin</span>
                </span>
                <h4 className="font-bold text-white text-sm">{selectedBatch.farmSite}</h4>
                <p className="text-[11px] text-emerald-200/70">{selectedBatch.district}</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-1">{selectedBatch.coordinates}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-1">
                <span className="text-[10px] text-emerald-300 uppercase font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Harvest & Processing</span>
                </span>
                <p className="text-xs text-white">Harvest: <strong className="text-[#A3E635]">{selectedBatch.harvestDate}</strong></p>
                <p className="text-xs text-white">Processed: {selectedBatch.processingDate}</p>
                <p className="text-xs text-white">Packed: {selectedBatch.packagingDate}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-1">
                <span className="text-[10px] text-emerald-300 uppercase font-bold flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Agronomic Soil Specs</span>
                </span>
                <h4 className="font-bold text-white text-xs">{selectedBatch.soilType}</h4>
                <p className="text-xs text-white mt-1">Moisture Level: <strong className="text-[#A3E635]">{selectedBatch.moisturePercentage}%</strong></p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-[#1E5E3A] space-y-1">
                <span className="text-[10px] text-emerald-300 uppercase font-bold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Farmer Lead</span>
                </span>
                <h4 className="font-bold text-white text-xs">{selectedBatch.farmerLead}</h4>
                <p className="text-[11px] text-emerald-200/70">Volta Outgrower Cluster</p>
              </div>
            </div>

            {/* Certifications List */}
            <div className="p-4 rounded-2xl bg-[#0B2B1B] border border-[#1E5E3A] space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                Regulatory & Quality Certifications Awarded:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedBatch.certifications.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#1E5E3A] text-white text-xs font-bold border border-[#A3E635]/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>{c}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
