import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabricWeight.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelect = (id: string) => {
    onSelectProduct(id);
    onClose();
  };

  const quickPills = ['Abstract', 'Tribal', 'Bad Choices', 'Heavyweight', 'Psychedelic', 'Acid'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 text-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
          className="w-full max-w-2xl transform overflow-hidden bg-[#0F0F0F] border border-[#2B2B2B] text-left shadow-2xl transition-all relative z-10 text-[#F5F3EF]"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#222222] flex items-center gap-3 bg-[#141414]">
            <Search size={22} className="text-[#D6FF3F] flex-shrink-0" />
            <input
              id="search-modal-title"
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PIECES, DROPS, STYLES..."
              className="flex-1 bg-transparent border-none text-base sm:text-lg font-heading tracking-wider text-[#F5F3EF] placeholder-[#555555] uppercase focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#666666] hover:text-[#F5F3EF] text-xs font-mono-street px-2"
              >
                CLEAR
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-[#888888] hover:text-[#D6FF3F] transition-colors"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick search tags */}
          <div className="px-5 py-3 border-b border-[#1E1E1E] bg-[#101010] flex items-center gap-2 overflow-x-auto">
            <span className="font-mono-street text-[10px] text-[#666666] uppercase whitespace-nowrap">
              SUGGESTIONS:
            </span>
            <div className="flex gap-1.5">
              {quickPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => setQuery(pill)}
                  className="font-mono-street text-[11px] px-2.5 py-0.5 bg-[#1B1B1B] hover:bg-[#D6FF3F] hover:text-[#0A0A0A] text-[#A4A4A4] border border-[#262626] transition-colors whitespace-nowrap"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
            {query.trim() === '' ? (
              <div className="py-8 text-center space-y-2">
                <p className="font-heading text-xl text-[#F5F3EF]">
                  TYPE TO SEARCH THE STREETWEAR ARCHIVE
                </p>
                <p className="font-mono-street text-xs text-[#777777]">
                  Search across oversized graphic tees, limited drops, and fabric weights.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <p className="font-heading text-2xl text-[#888888]">
                  NO PIECES MATCHED "{query.toUpperCase()}"
                </p>
                <p className="font-mono-street text-xs text-[#555555]">
                  Try searching for 'Abstract', 'Tribal', 'Graphic', or 'Heavyweight'.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-mono-street text-[11px] text-[#A4A4A4] uppercase tracking-wider mb-2">
                  FOUND {filteredProducts.length} PIECES
                </p>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    className="flex items-center justify-between p-3 bg-[#151515] hover:bg-[#1E1E1E] border border-[#222222] hover:border-[#D6FF3F]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-16 object-cover bg-[#222222]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-street text-[9px] bg-[#222222] text-[#D6FF3F] px-1.5 py-0.2">
                            {p.category}
                          </span>
                          {p.badge && (
                            <span className="font-mono-street text-[9px] text-[#F5F3EF]">
                              • {p.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-xl text-[#F5F3EF] group-hover:text-[#D6FF3F] transition-colors leading-tight mt-1">
                          {p.name}
                        </h4>
                        <p className="font-mono-street text-xs text-[#777777]">
                          {p.fabricWeight}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <span className="font-mono-street text-sm font-bold text-[#F5F3EF]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-[#666666] group-hover:text-[#D6FF3F] group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
