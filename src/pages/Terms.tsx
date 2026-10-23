import React from 'react';
import { PageView } from '../types';

interface TermsProps {
  onNavigate: (page: PageView) => void;
}

export const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-10">
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="font-heading text-6xl sm:text-7xl text-[#F5F3EF]">TERMS & CONDITIONS</h1>
        <p className="font-mono-street text-xs text-[#888888]">
          LAST UPDATED: {new Date().getFullYear()} // VERSION 3.1
        </p>
      </div>

      <div className="space-y-8 font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">01 // ACCEPTANCE OF TERMS</h2>
          <p>
            By accessing the ENDLOOP DRIPS website, browsing our drop collections, or placing an
            order, you agree to comply with and be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">02 // INTELLECTUAL PROPERTY</h2>
          <p>
            All graphic designs, typography, brand marks, slogan (“Wear your mind”), photography,
            product titles, and aesthetic compositions on this website are the intellectual property
            of ENDLOOP DRIPS. Unauthorized reproduction, imitation, or redistribution of our screenprint
            artworks is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">03 // LIMITED DROPS & AVAILABILITY</h2>
          <p>
            Our streetwear garments are produced in limited, numbered runs. We reserve the right to
            limit the quantity of items purchased per person or household. Once a limited drop is
            marked sold out, it will not be restocked unless explicitly stated in a commemorative vault drop.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">04 // PRICING & TAXES</h2>
          <p>
            All prices listed on the store are in Indian Rupees (₹ INR) and include all applicable
            goods and services taxes (GST). Shipping charges are applied based on the order value
            threshold (free on orders over ₹1,999; flat ₹99 otherwise).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">05 // JURISDICTION</h2>
          <p>
            These terms shall be governed by and interpreted in accordance with the laws of the
            Republic of India.
          </p>
        </section>
      </div>
    </div>
  );
};
