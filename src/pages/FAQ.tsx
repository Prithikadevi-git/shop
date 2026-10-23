import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';
import { PageView } from '../types';

interface FAQProps {
  onNavigate: (page: PageView) => void;
}

export const FAQ: React.FC<FAQProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Fit & Sizing', 'Orders & Payments', 'Shipping & Delivery', 'Returns & Exchanges', 'Care Instructions'];

  const filteredItems = FAQ_ITEMS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
          KNOWLEDGE ARCHIVE
        </span>
        <h1 className="font-heading text-6xl sm:text-7xl text-[#F5F3EF]">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] max-w-xl">
          Everything you need to know about our oversized streetwear fits, Indian shipping
          standards, and graphic care.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 font-mono-street text-xs uppercase tracking-wider whitespace-nowrap border transition-colors ${
              activeCategory === cat
                ? 'bg-[#D6FF3F] text-[#0A0A0A] border-[#D6FF3F] font-bold'
                : 'bg-[#141414] border-[#242424] text-[#888888] hover:text-[#F5F3EF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#121212] border border-[#222222] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-[#161616] transition-colors"
              >
                <div className="space-y-1">
                  <span className="font-mono-street text-[10px] text-[#D6FF3F] uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-2xl text-[#F5F3EF] leading-snug">
                    {item.question}
                  </h3>
                </div>
                <div className="text-[#888888] flex-shrink-0">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[#1C1C1C] text-[#A4A4A4] font-mono-street text-xs sm:text-sm leading-relaxed animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help callout */}
      <div className="bg-[#141414] border border-[#242424] p-8 text-center space-y-4">
        <h3 className="font-heading text-3xl text-[#F5F3EF]">STILL HAVE QUESTIONS?</h3>
        <p className="font-mono-street text-xs text-[#888888] max-w-md mx-auto">
          Reach out directly to our concierge team or drop us a message on Instagram for instant fit advice.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
        >
          CONTACT CONCIERGE <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
