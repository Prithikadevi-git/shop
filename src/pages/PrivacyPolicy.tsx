import React from 'react';
import { PageView } from '../types';

interface PrivacyPolicyProps {
  onNavigate: (page: PageView) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-10">
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="font-heading text-6xl sm:text-7xl text-[#F5F3EF]">PRIVACY POLICY</h1>
        <p className="font-mono-street text-xs text-[#888888]">
          EFFECTIVE DATE: {new Date().getFullYear()} // VERSION 2.4
        </p>
      </div>

      <div className="space-y-8 font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">01 // OVERVIEW</h2>
          <p>
            At ENDLOOP DRIPS (“we,” “our,” or “us”), we respect your privacy and are committed to
            protecting the personal information you share when browsing our streetwear catalog,
            ordering pieces, or contacting customer support.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">02 // INFORMATION WE COLLECT</h2>
          <p>
            When you interact with our website or place an order, we collect only necessary data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#CCCCCC]">
            <li>Customer contact information (name, email address, mobile number).</li>
            <li>Pan-India delivery address, city, state, and 6-digit postal pincode.</li>
            <li>Transaction reference IDs returned by authorized payment gateways.</li>
            <li>Device metadata and anonymous browsing analytics to optimize website performance.</li>
          </ul>
          <p className="text-[#D6FF3F]">
            We DO NOT collect, store, or process raw credit card numbers or UPI MPINs on our servers.
            All transactions are routed directly through PCI-DSS Level 1 compliant payment gateways.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">03 // USE OF INFORMATION</h2>
          <p>Your details are used solely to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#CCCCCC]">
            <li>Fulfill, dispatch, and track your drop shipments.</li>
            <li>Send order confirmation, shipping tracking, and delivery notifications.</li>
            <li>Process eligible size exchanges or customer support queries.</li>
            <li>Send drop alerts and private vault access if you opted into our newsletter.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">04 // THIRD-PARTY PARTNERS</h2>
          <p>
            We only share your address and phone number with verified logistics partners (such as
            Delhivery, Bluedart, or Xpressbees) to ensure successful doorstep delivery. We never
            sell, rent, or trade your personal information to third-party data brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-[#F5F3EF]">05 // CONTACT FOR DATA INQUIRIES</h2>
          <p>
            For any queries regarding your data or to request account deletion, reach out to{' '}
            <strong className="text-[#F5F3EF]">concierge@endloopdrips.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
