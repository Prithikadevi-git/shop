import React, { useState } from 'react';
import { ArrowUpRight, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterMsg('Please enter a valid email address.');
      return;
    }

    // In production, this posts to newsletter subscription endpoint
    setNewsletterStatus('success');
    setNewsletterMsg('You are in the loop. Exclusive drop access sent to your inbox.');
    setNewsletterEmail('');
  };

  const handleLinkClick = (page: PageView, param?: string) => {
    onNavigate(page, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1C1C1C] text-[#F5F3EF] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter / Brand Banner */}
        <div className="border border-[#222222] bg-[#0E0E0E] p-8 lg:p-12 mb-16 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none font-heading text-9xl text-white select-none">
            ENDLOOP
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-2">
              <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
                COMMUNITY // INNER CIRCLE
              </span>
              <h3 className="font-heading text-4xl sm:text-5xl text-[#F5F3EF] tracking-wide leading-none">
                GET IN THE LOOP.
              </h3>
              <p className="text-sm text-[#A4A4A4] font-mono-street">
                New drops. New ideas. No noise. Only verified drop alerts.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                      }}
                      placeholder="ENTER YOUR EMAIL FOR EARLY DROP ACCESS"
                      className="w-full bg-[#161616] border border-[#2B2B2B] px-4 py-3.5 text-xs font-mono-street text-[#F5F3EF] placeholder-[#666666] focus:outline-none focus:border-[#D6FF3F] uppercase tracking-wider"
                    />
                    <Mail
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555555]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap"
                  >
                    JOIN THE LOOP
                  </button>
                </div>

                {newsletterStatus === 'success' && (
                  <div className="flex items-center gap-2 text-xs font-mono-street text-[#D6FF3F] bg-[#121B0A] border border-[#D6FF3F]/30 p-2.5">
                    <CheckCircle2 size={15} />
                    <span>{newsletterMsg}</span>
                  </div>
                )}

                {newsletterStatus === 'error' && (
                  <div className="flex items-center gap-2 text-xs font-mono-street text-red-400 bg-[#200E0E] border border-red-500/30 p-2.5">
                    <AlertCircle size={15} />
                    <span>{newsletterMsg}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            
              
              <div className="flex items-center gap-3">
  <img
    src="/endloop.jpg"
    alt="ENDLOOP DRIPS Logo"
    className="h-14 sm:h-16 w-auto object-contain"
  />
</div>
            <p className="font-mono-street text-xs text-[#A4A4A4] leading-relaxed max-w-sm">
              “Wear your mind.” Designed for the awakened. An underground streetwear label turning
              heavyweight textiles into a canvas for unfiltered identity and abstract perspective.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/end10op.drips/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono-street uppercase tracking-wider text-[#D6FF3F] hover:underline"
              >
                <InstagramIcon size={15} /> @end10op.drips <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-3">
            <h4 className="font-mono-street text-xs font-bold text-[#F5F3EF] uppercase tracking-widest border-b border-[#222222] pb-2">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs font-mono-street">
              <li>
                <button
                  onClick={() => handleLinkClick('shop', 'Abstract')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  Abstract Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('shop', 'Tribal')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  Tribal Sigilism
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('shop', 'Streetwear')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  Statement Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('shop', 'Psychedelic')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  Psychedelic Optical Fits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('new-drops')}
                  className="text-[#D6FF3F] hover:underline font-bold"
                >
                  Limited Drops & Archives
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="font-mono-street text-xs font-bold text-[#F5F3EF] uppercase tracking-widest border-b border-[#222222] pb-2">
              SUPPORT
            </h4>
            <ul className="space-y-2 text-xs font-mono-street">
              <li>
                <button
                  onClick={() => handleLinkClick('faq')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  FAQ & Fit Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('shipping-returns')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('cart')}
                  className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                >
                  Your Loop Bag
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Legal */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 space-y-3">
            <h4 className="font-mono-street text-xs font-bold text-[#F5F3EF] uppercase tracking-widest border-b border-[#222222] pb-2">
              DISPATCH & INTEGRITY
            </h4>
            <p className="text-xs font-mono-street text-[#888888] leading-relaxed">
              Dispatched pan-India within 24-48 hours. 280–310 GSM combed French terry & luxury cotton jersey.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono-street text-[#A4A4A4]">
              <button
                onClick={() => handleLinkClick('privacy')}
                className="hover:text-[#D6FF3F] underline"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => handleLinkClick('terms')}
                className="hover:text-[#D6FF3F] underline"
              >
                Terms & Conditions
              </button>
            </div>
            <div className="pt-2 text-[10px] font-mono-street text-[#666666]">
              ACCEPTED: UPI • CARDS • NET BANKING • COD
            </div>
          </div>
        </div>

        {/* Giant ENDLOOP DRIPS Typography Signature Stamp */}
        <div className="border-t border-[#1C1C1C] pt-12 pb-6 overflow-hidden select-none">
          <p className="font-heading text-[12vw] leading-none text-[#181818] tracking-widest text-center whitespace-nowrap hover:text-[#222222] transition-colors">
            ENDLOOP DRIPS
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#171717] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-street text-[#666666] gap-4">
          <p>
            © {new Date().getFullYear()} ENDLOOP DRIPS. ALL RIGHTS RESERVED. “WEAR YOUR MIND.”
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#888888]">MADE FOR THE AWAKENED</span>
            <span>•</span>
            <span className="text-[#D6FF3F]">ENTER THE LOOP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
