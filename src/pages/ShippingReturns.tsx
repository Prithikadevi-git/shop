import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface ShippingReturnsProps {
  onNavigate: (page: PageView) => void;
}

export const ShippingReturns: React.FC<ShippingReturnsProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-12">
      {/* Header */}
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
          FULFILLMENT PROTOCOLS
        </span>
        <h1 className="font-heading text-6xl sm:text-7xl text-[#F5F3EF]">
          SHIPPING & RETURNS
        </h1>
        <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] max-w-xl">
          Transparent, reliable domestic delivery across India and straightforward 7-day size
          exchange procedures.
        </p>
      </div>

      {/* Grid Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono-street text-xs">
        <div className="bg-[#121212] border border-[#222222] p-6 space-y-2">
          <Truck size={24} className="text-[#D6FF3F]" />
          <h3 className="font-heading text-2xl text-[#F5F3EF]">FREE OVER ₹1,999</h3>
          <p className="text-[#888888]">
            Complimentary express pan-India shipping for all cart totals of ₹1,999 or more. Flat ₹99
            for smaller drops.
          </p>
        </div>

        <div className="bg-[#121212] border border-[#222222] p-6 space-y-2">
          <Clock size={24} className="text-[#D6FF3F]" />
          <h3 className="font-heading text-2xl text-[#F5F3EF]">24H DISPATCH</h3>
          <p className="text-[#888888]">
            Orders confirmed before 2:00 PM IST enter dispatch the very same day with real-time SMS
            tracking.
          </p>
        </div>

        <div className="bg-[#121212] border border-[#222222] p-6 space-y-2">
          <RotateCcw size={24} className="text-[#D6FF3F]" />
          <h3 className="font-heading text-2xl text-[#F5F3EF]">7-DAY EXCHANGE</h3>
          <p className="text-[#888888]">
            Need a different size? Request an exchange within 7 days of delivery with complimentary
            reverse pickup.
          </p>
        </div>
      </div>

      {/* Detailed Shipping Section */}
      <section className="bg-[#121212] border border-[#222222] p-8 space-y-4">
        <h2 className="font-heading text-3xl text-[#F5F3EF] border-b border-[#202020] pb-3">
          PAN-INDIA SHIPPING TIMELINES
        </h2>
        <div className="space-y-4 font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
          <p>
            All ENDLOOP DRIPS garments are stocked and fulfilled directly from our central
            fulfillment warehouse. We partner with Tier-1 air express couriers (Bluedart, Delhivery,
            and Xpressbees) to ensure speedy delivery:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#CCCCCC]">
            <li>
              <strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune):</strong>{' '}
              2 to 4 business days.
            </li>
            <li>
              <strong>Tier 2 & Tier 3 Cities:</strong> 3 to 5 business days.
            </li>
            <li>
              <strong>North-East India & Remote Regions:</strong> 5 to 7 business days.
            </li>
          </ul>
          <p>
            You will receive a tracking link via email and WhatsApp as soon as your shipment is
            handed over to the courier partner.
          </p>
        </div>
      </section>

      {/* Detailed Returns & Exchanges Section */}
      <section className="bg-[#121212] border border-[#222222] p-8 space-y-4">
        <h2 className="font-heading text-3xl text-[#F5F3EF] border-b border-[#202020] pb-3">
          7-DAY HASSLE-FREE SIZE EXCHANGE POLICY
        </h2>
        <div className="space-y-4 font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
          <p>
            We want you to feel confident in your streetwear silhouette. If the size you ordered
            does not drape the way you envisioned, you can exchange it within 7 calendar days from the
            date of delivery.
          </p>
          <div className="bg-[#171717] p-4 border border-[#282828] space-y-2">
            <span className="font-bold text-[#D6FF3F] block">EXCHANGE CRITERIA:</span>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Garment must be in original unworn, unwashed, and undamaged condition.</li>
              <li>Original tags, wash tags, and packaging must be intact.</li>
              <li>Free reverse pickup is arranged right from your doorstep.</li>
            </ul>
          </div>
          <p>
            To initiate an exchange, simply drop an email to{' '}
            <strong className="text-[#F5F3EF]">concierge@endloopdrips.com</strong> or send a message
            via our Contact Concierge with your Order Number.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#222222]">
        <span className="font-mono-street text-xs text-[#888888]">
          READY TO ENTER THE LOOP?
        </span>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3.5 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
        >
          EXPLORE THE CATALOG <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
