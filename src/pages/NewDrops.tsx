import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { PageView } from '../types';

interface NewDropsProps {
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: PageView) => void;
}

export const NewDrops: React.FC<NewDropsProps> = ({ onSelectProduct, onNavigate }) => {
  const newDropProducts = PRODUCTS.filter((p) => p.isNewDrop || p.badge === 'LIMITED DROP');

  // Realistic drop countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Editorial Drop Header Banner */}
      <section className="relative bg-[#0E0E0E] border-b border-[#222222] py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/campaign-editorial.jpg"
            alt="New Drops Editorial Background"
            className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] border border-[#D6FF3F]/40 text-[#D6FF3F] text-xs font-mono-street uppercase tracking-widest font-bold">
            <Flame size={14} className="animate-pulse" />
            CURRENT ARCHIVE // DROP 04
          </div>

          <h1 className="font-heading text-6xl sm:text-8xl lg:text-9xl text-[#F5F3EF] leading-none tracking-tight">
            LIMITED DROPS <br />
            <span className="text-stroke-lime">& NEW RELEASES</span>
          </h1>

          <p className="font-mono-street text-sm sm:text-base text-[#C0BEB8] max-w-2xl leading-relaxed">
            Numbered batches produced in ultra-limited runs. Once a drop sells out, the screenprint
            screens are retired to the permanent ENDLOOP vault. No restocks, no compromises.
          </p>

          {/* Live Drop Countdown Ticker */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider">
              <Clock size={16} className="text-[#D6FF3F]" />
              VAULT CLOSING IN:
            </div>

            <div className="flex items-center gap-2 font-mono-street">
              <div className="bg-[#181818] border border-[#333333] px-3.5 py-2 text-center min-w-[55px]">
                <span className="font-heading text-3xl text-[#D6FF3F] block leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-[#777777] uppercase">HRS</span>
              </div>
              <span className="text-xl text-[#555555] font-bold">:</span>
              <div className="bg-[#181818] border border-[#333333] px-3.5 py-2 text-center min-w-[55px]">
                <span className="font-heading text-3xl text-[#D6FF3F] block leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-[#777777] uppercase">MIN</span>
              </div>
              <span className="text-xl text-[#555555] font-bold">:</span>
              <div className="bg-[#181818] border border-[#333333] px-3.5 py-2 text-center min-w-[55px]">
                <span className="font-heading text-3xl text-[#D6FF3F] block leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-[#777777] uppercase">SEC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drop Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#222222] pb-6 mb-8">
          <div>
            <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
              BATCH 04 PIECES
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#F5F3EF]">
              AVAILABLE FOR IMMEDIATE DISPATCH
            </h2>
          </div>
          <span className="font-mono-street text-xs text-[#888888]">
            {newDropProducts.length} LIMITED EDITIONS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newDropProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Drop Guarantee Editorial Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] border border-[#222222] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="font-mono-street text-xs text-[#D6FF3F] font-bold">01 // BATCH NUMBERS</span>
            <h3 className="font-heading text-2xl text-[#F5F3EF]">LIMITED RUN POLICY</h3>
            <p className="font-mono-street text-xs text-[#888888] leading-relaxed">
              Every drop is capped at strict production quantities to ensure rarity and prevent textile overproduction.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono-street text-xs text-[#D6FF3F] font-bold">02 // TEXTILE ARCHITECTURE</span>
            <h3 className="font-heading text-2xl text-[#F5F3EF]">280–310 GSM COMBED</h3>
            <p className="font-mono-street text-xs text-[#888888] leading-relaxed">
              Sourced from certified Indian mills. Heavy drape, zero chest clinging, durable drop shoulder seams.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono-street text-xs text-[#D6FF3F] font-bold">03 // SPEED DISPATCH</span>
            <h3 className="font-heading text-2xl text-[#F5F3EF]">24-HOUR FULFILLMENT</h3>
            <p className="font-mono-street text-xs text-[#888888] leading-relaxed">
              All listed sizes are physically stocked and dispatched with tracking within 24 hours of confirmation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
