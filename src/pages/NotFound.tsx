import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { PageView } from '../types';

interface NotFoundProps {
  onNavigate: (page: PageView) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-28 sm:py-36 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2B2B2B] text-[#D6FF3F] font-mono-street text-xs uppercase tracking-widest font-bold">
        <Compass size={14} /> ERROR CODE 404
      </div>

      <h1 className="font-heading text-7xl sm:text-9xl text-[#F5F3EF] leading-none">
        CAUGHT OUTSIDE <br />
        <span className="text-stroke-lime">THE LOOP.</span>
      </h1>

      <p className="font-mono-street text-sm sm:text-base text-[#888888] max-w-md mx-auto leading-relaxed">
        The archive coordinate you are looking for has been retired or does not exist in this drop cycle.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="px-8 py-3.5 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        >
          RETURN TO HOME <ArrowRight size={15} />
        </button>
        <button
          onClick={() => onNavigate('shop')}
          className="px-8 py-3.5 bg-[#141414] hover:bg-[#1E1E1E] text-[#F5F3EF] border border-[#2B2B2B] font-mono-street text-xs font-bold uppercase tracking-widest"
        >
          EXPLORE DROPS
        </button>
      </div>
    </div>
  );
};
