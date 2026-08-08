import React from 'react';
import { ArrowLeft, Sprout } from 'lucide-react';

interface Props {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#0B2B1B] text-white min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center mx-auto shadow-xl">
          <Sprout className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold text-[#A3E635] uppercase tracking-widest">404 Page Not Found</span>
        <h1 className="font-editorial text-4xl font-bold text-white">This Farmland Track Does Not Exist</h1>
        <p className="text-xs sm:text-sm text-emerald-100/80">
          The requested path could not be located on the Napoleon Steadings Ltd. portal.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};
