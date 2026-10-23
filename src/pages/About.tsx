import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { PageView } from '../types';

interface AboutProps {
  onNavigate: (page: PageView) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* Editorial Hero Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center border-b border-[#222222] overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/campaign-editorial.jpg"
            alt="ENDLOOP DRIPS Editorial Atmosphere"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2D2D2D] text-[#D6FF3F] font-mono-street text-xs uppercase tracking-widest font-bold">
            <Sparkles size={13} /> BRAND MANIFESTO // DRAFT COPY
          </div>

          <h1 className="font-heading text-6xl sm:text-8xl lg:text-9xl text-[#F5F3EF] leading-[0.88] tracking-tight">
            THIS IS MORE THAN <br />
            <span className="text-stroke-lime">WHAT YOU WEAR.</span>
          </h1>

          <div className="w-24 h-[2px] bg-[#D6FF3F] mx-auto my-6" />

          <p className="font-mono-street text-base sm:text-xl text-[#D0CEC7] max-w-2xl mx-auto leading-relaxed">
            “ENDLOOP DRIPS exists at the intersection of art, individuality, and street culture. Built around abstract expression and unconventional thinking, the brand turns everyday streetwear into a canvas for personal identity. Wear your mind. Challenge the ordinary. Enter the loop.”
          </p>

          <p className="text-[11px] font-mono-street text-[#777777] italic">
            * Draft brand copy — ready for customization by brand leadership
          </p>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#121212] border border-[#222222] p-8 space-y-4">
            <span className="font-mono-street text-xs text-[#D6FF3F] font-bold">PILLAR 01 // PERSPECTIVE</span>
            <h2 className="font-heading text-3xl text-[#F5F3EF]">WEAR YOUR MIND</h2>
            <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
              Streetwear is not merely a combination of fabric and dye; it is an externalization of your inner psyche. We design for individuals who reject repetitive trends and embrace graphic audacity.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-8 space-y-4">
            <span className="font-mono-street text-xs text-[#D6FF3F] font-bold">PILLAR 02 // SUBVERSION</span>
            <h2 className="font-heading text-3xl text-[#F5F3EF]">DESIGNED FOR THE AWAKENED</h2>
            <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
              From glitch portraiture to cyber-sigilism glyphs, our graphics question digital conformism and celebrate alternative artistic frequencies.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-8 space-y-4">
            <span className="font-mono-street text-xs text-[#D6FF3F] font-bold">PILLAR 03 // SILHOUETTE</span>
            <h2 className="font-heading text-3xl text-[#F5F3EF]">HEAVYWEIGHT REBELLION</h2>
            <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
              280 to 310 GSM combed French terry and luxury cotton. Architectural boxy cuts with drop-shoulders crafted to hold their natural drape through endless wear.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Editorial Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
              TEXTILE ARCHITECTURE
            </span>
            <h2 className="font-heading text-5xl sm:text-6xl text-[#F5F3EF] leading-none">
              HONEST MATERIALS. <br />
              RAW TEXTURE.
            </h2>
            <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
              Every garment starts with premium cotton fibers, spun into high-density yarns that produce a dense, structured hand-feel without sacrificing breathability. Our screenprints are executed with high-definition plastisol and discharge inks that age gracefully with time.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3.5 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
              >
                SHOP THE COLLECTION <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-[#161616] border border-[#222222] overflow-hidden">
              <img
                src="/images/fabric-detail.jpg"
                alt="280 GSM Cotton Texture"
                className="w-full h-full object-cover img-zoom"
              />
            </div>
            <div className="aspect-[3/4] bg-[#161616] border border-[#222222] overflow-hidden pt-6">
              <img
                src="/images/awakened-tee.jpg"
                alt="Designed for the Awakened"
                className="w-full h-full object-cover img-zoom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Connect Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] border border-[#262626] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
              STREETWEAR COMMUNITY
            </span>
            <h2 className="font-heading text-4xl text-[#F5F3EF]">JOIN US ON INSTAGRAM</h2>
            <p className="font-mono-street text-xs text-[#888888]">
              Tag <strong className="text-[#F5F3EF]">@end10op.drips</strong> to be featured in our lookbook archive.
            </p>
          </div>
          <a
            href="https://www.instagram.com/end10op.drips/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-[#1C1C1C] hover:bg-[#D6FF3F] hover:text-[#0A0A0A] border border-[#333333] hover:border-[#D6FF3F] text-[#F5F3EF] font-mono-street text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2.5 transition-all"
          >
            <InstagramIcon size={16} /> @end10op.drips
          </a>
        </div>
      </section>
    </div>
  );
};
