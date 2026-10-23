import React, { useState } from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';
import { SIZE_CHART } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          className="w-full max-w-2xl transform overflow-hidden bg-[#111111] border border-[#2B2B2B] p-6 sm:p-8 text-left shadow-2xl transition-all relative z-10 text-[#F5F3EF]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Ruler size={20} className="text-[#D6FF3F]" />
              <h3 id="size-guide-title" className="font-heading text-2xl sm:text-3xl tracking-wider text-[#F5F3EF]">
                OVERSIZED FIT GUIDE
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#888888] hover:text-[#D6FF3F] p-1.5 transition-colors"
              aria-label="Close fit guide"
            >
              <X size={20} />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono-street text-xs text-[#A4A4A4]">
              ALL MEASUREMENTS ARE FLAT-LAY GARMENT SPECS
            </p>
            <div className="flex border border-[#2B2B2B] bg-[#161616]">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 font-mono-street text-xs font-bold transition-colors ${
                  unit === 'in' ? 'bg-[#D6FF3F] text-[#0A0A0A]' : 'text-[#888888]'
                }`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-mono-street text-xs font-bold transition-colors ${
                  unit === 'cm' ? 'bg-[#D6FF3F] text-[#0A0A0A]' : 'text-[#888888]'
                }`}
              >
                CENTIMETERS
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#242424] mb-6">
            <table className="w-full text-left font-mono-street text-xs">
              <thead className="bg-[#181818] border-b border-[#242424] text-[#D6FF3F]">
                <tr>
                  <th className="py-3 px-4 font-bold">SIZE</th>
                  <th className="py-3 px-4 font-bold">CHEST (CIRCUMFERENCE)</th>
                  <th className="py-3 px-4 font-bold">LENGTH</th>
                  <th className="py-3 px-4 font-bold">SHOULDER WIDTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202020] text-[#F5F3EF]">
                {SIZE_CHART.map((item) => {
                  const chestVal = unit === 'in' ? item.chest : `${Math.round(parseInt(item.chest) * 2.54)} cm`;
                  const lengthVal = unit === 'in' ? item.length : `${Math.round(parseFloat(item.length) * 2.54)} cm`;
                  const shoulderVal = unit === 'in' ? item.shoulder : `${Math.round(parseFloat(item.shoulder) * 2.54)} cm`;

                  return (
                    <tr key={item.size} className="hover:bg-[#161616] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#D6FF3F] bg-[#141414]">{item.size}</td>
                      <td className="py-3 px-4">{chestVal}</td>
                      <td className="py-3 px-4">{lengthVal}</td>
                      <td className="py-3 px-4">{shoulderVal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Streetwear Silhouettes Tip */}
          <div className="bg-[#151515] border border-[#262626] p-4 space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono-street text-[#D6FF3F] font-bold">
              <CheckCircle size={15} />
              <span>THE INTENTIONAL DRAPE</span>
            </div>
            <p className="text-xs font-mono-street text-[#A4A4A4] leading-relaxed">
              ENDLOOP DRIPS tees are engineered with an exaggerated boxy cut, dropped shoulders, and heavyweight 280–310 GSM drape. We recommend choosing your normal size for the editorial oversized silhouette shown on our campaign models.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-wider transition-colors"
          >
            GOT IT // RETURN TO PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
};
