import React, { useState } from 'react';
import { X, Flame } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#121212] border-b border-[#222222] text-[#F5F3EF] text-xs uppercase tracking-widest py-2 px-4 relative z-50 font-mono-street"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="inline-flex items-center gap-1.5 text-[#D6FF3F] font-bold text-[11px]">
              <Flame size={13} className="text-[#D6FF3F] animate-pulse" />
              DROP 04 LIVE:
            </span>
            <span className="text-[#F5F3EF] text-[11px] sm:text-xs">
              INDEPENDENT STREETWEAR — ENTER THE LOOP. FREE PAN-INDIA EXPRESS SHIPPING OVER ₹1,999
            </span>
            <span className="hidden md:inline text-[#A4A4A4] text-[11px]">
              // USE CODE <strong className="text-[#D6FF3F]">ENTERTHELOOP</strong> FOR 10% OFF
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors p-1 ml-2"
          aria-label="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
};
