import React from 'react';
import { ArrowRight, Sparkles, Flame, Shield, Compass } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { PageView } from '../types';

interface HomeProps {
  onNavigate: (page: PageView, param?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectProduct }) => {
  // 4 main featured products for THE LATEST LOOP
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  const categoryTiles = [
    {
      title: 'GRAPHIC TEES',
      desc: 'High-density screenprints on 280 GSM cotton',
      category: 'Streetwear',
      image: '/images/category-tees.jpg',
      badge: 'POPULAR',
    },
    {
      title: 'OVERSIZED FITS',
      desc: 'Heavyweight boxy cuts with drop shoulders',
      category: 'Abstract',
      image: '/images/abstract-face.jpg',
      badge: 'CORE SILHOUETTE',
    },
    {
      title: 'ART & EXPRESSION',
      desc: 'Deconstructed glitch & psychedelic prints',
      category: 'Psychedelic',
      image: '/images/psychedelic-mind.jpg',
      badge: 'LIMITED ARCHIVE',
    },
    {
      title: 'LATEST DROPS',
      desc: 'Freshly released numbered drops & cyber-tribal glyphs',
      category: 'Tribal',
      image: '/images/tribal-distortion.jpg',
      badge: 'DROP 04',
    },
  ];

  const instagramPosts = [
    {
      image: '/images/insta-1.jpg',
      caption: 'Alleyway movements in Shibuya. Wearing the Chaos Riot Heavy Tee.',
      tag: '#ENDLOOPDRIPS',
    },
    {
      image: '/images/insta-2.jpg',
      caption: 'Flatlay archive. Industrial resistance series 03.',
      tag: '#WEARYOURMIND',
    },
    {
      image: '/images/insta-3.jpg',
      caption: 'Rebel Riot. Concrete walls and 300 GSM vintage wash.',
      tag: '#DESIGNEDFORTHEAWAKENED',
    },
    {
      image: '/images/abstract-face.jpg',
      caption: 'Abstract Noise 001. Drop-shoulder drape in studio.',
      tag: '#STREETWEARINDIA',
    },
    {
      image: '/images/bad-choices.jpg',
      caption: 'Bad choices make good stories. Washed charcoal patina.',
      tag: '#ENTERTHELOOP',
    },
    {
      image: '/images/tribal-distortion.jpg',
      caption: 'Cyber-sigilism distortion across shoulders. Batch 04.',
      tag: '#OOTD',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#1E1E1E]">
        {/* Background Streetwear Campaign Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.jpg"
            alt="ENDLOOP DRIPS Campaign Model in Brutalist Concrete Alley"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
          />
          {/* Editorial dark Vignette & Linear Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/60" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0A]/30 to-[#0A0A0A]/80" />
        </div>

        {/* Editorial Watermark Stamp */}
        <div className="absolute top-8 right-8 hidden lg:block z-10 pointer-events-none select-none">
          <div className="border border-[#D6FF3F]/40 p-3 bg-black/60 backdrop-blur-xs font-mono-street text-[10px] text-[#D6FF3F] uppercase tracking-widest text-right">
            <span>DROP NO. 04 // SS26</span>
            <br />
            <span className="text-[#A4A4A4]">LIMITED BATCH PRODUCTION</span>
          </div>
        </div>

        {/* Main Content Hero Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full flex flex-col justify-between">
          <div className="max-w-3xl space-y-6">
            {/* Small Editorial Label */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-black/80 border border-[#2F2F2F] backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#D6FF3F] animate-ping" />
              <span className="font-mono-street text-xs font-bold text-[#D6FF3F] tracking-widest uppercase">
                INDEPENDENT STREETWEAR / EST. 2024
              </span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="font-heading text-7xl sm:text-9xl lg:text-[11rem] leading-[0.85] tracking-tight text-[#F5F3EF]">
              WEAR <br />
              <span className="text-stroke-lime hover:text-[#D6FF3F] transition-colors duration-300">
                YOUR
              </span>{' '}
              <br />
              MIND.
            </h1>

            {/* Supporting Copy */}
            <p className="font-mono-street text-base sm:text-xl text-[#D0CEC7] max-w-xl font-normal leading-relaxed border-l-2 border-[#D6FF3F] pl-4">
              Streetwear for the ones who think differently. Heavyweight textiles, abstract
              deconstruction, and unfiltered graphic expression designed for the awakened mind.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('shop')}
                className="px-8 py-4 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl pulse-accent"
              >
                SHOP THE DROP <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-black/70 hover:bg-[#1C1C1C] text-[#F5F3EF] border border-[#3A3A3A] hover:border-[#D6FF3F] font-mono-street text-sm font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-xs flex items-center justify-center gap-2"
              >
                DISCOVER ENDLOOP
              </button>
            </div>
          </div>

          {/* Bottom Banner Indicators */}
          <div className="pt-16 sm:pt-24 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 mt-12 text-xs font-mono-street text-[#A4A4A4]">
            <div className="flex items-center gap-2">
              <span className="text-[#D6FF3F] font-bold">280–310 GSM</span>
              <span>// 100% COMBED FRENCH TERRY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D6FF3F] font-bold">FREE EXPRESS DISPATCH</span>
              <span>// PAN-INDIA OVER ₹1,999</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D6FF3F] font-bold">7-DAY HASSLE-FREE</span>
              <span>// SIZE EXCHANGE GUARANTEE</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS EDITORIAL MARQUEE TICKER */}
      <div className="bg-[#121212] border-y border-[#222222] py-4 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-heading text-2xl sm:text-3xl tracking-widest text-[#666666]">
          <span className="text-[#F5F3EF] flex items-center gap-3">
            <Flame size={20} className="text-[#D6FF3F]" /> WEAR YOUR MIND
          </span>
          <span className="text-[#D6FF3F]">•</span>
          <span>DESIGNED FOR THE AWAKENED</span>
          <span className="text-[#D6FF3F]">•</span>
          <span className="text-[#F5F3EF]">ENTER THE LOOP</span>
          <span className="text-[#D6FF3F]">•</span>
          <span>280 GSM HEAVYWEIGHT OVERSIZED TEES</span>
          <span className="text-[#D6FF3F]">•</span>
          <span className="text-[#F5F3EF]">LIMITED DROP BATCHES</span>
          <span className="text-[#D6FF3F]">•</span>
          <span>PAN-INDIA EXPRESS SHIPPING</span>
          <span className="text-[#D6FF3F]">•</span>
          <span className="text-[#F5F3EF]">ABSTRACT // TRIBAL // PSYCHEDELIC</span>
          <span className="text-[#D6FF3F]">•</span>
          {/* Loop duplicate */}
          <span className="text-[#F5F3EF] flex items-center gap-3">
            <Flame size={20} className="text-[#D6FF3F]" /> WEAR YOUR MIND
          </span>
          <span className="text-[#D6FF3F]">•</span>
          <span>DESIGNED FOR THE AWAKENED</span>
          <span className="text-[#D6FF3F]">•</span>
          <span className="text-[#F5F3EF]">ENTER THE LOOP</span>
          <span className="text-[#D6FF3F]">•</span>
          <span>280 GSM HEAVYWEIGHT OVERSIZED TEES</span>
        </div>
      </div>

      {/* FEATURED DROP: THE LATEST LOOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#222222] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold mb-1">
              <Sparkles size={14} />
              CURATED SELECTION
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl text-[#F5F3EF] tracking-wide">
              THE LATEST LOOP
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="group flex items-center gap-2 font-mono-street text-xs font-bold text-[#F5F3EF] hover:text-[#D6FF3F] uppercase tracking-widest transition-colors"
          >
            EXPLORE ALL 8 PIECES{' '}
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform text-[#D6FF3F]"
            />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT: EDITORIAL BREAKOUT */}
      <section className="relative bg-[#0E0E0E] border-y border-[#242424] py-24 sm:py-32 overflow-hidden">
        {/* Subtle background industrial pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none film-grain" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <span className="font-mono-street text-xs sm:text-sm text-[#D6FF3F] uppercase tracking-[0.3em] font-bold">
            // PHILOSOPHY MANIFESTO
          </span>

          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F5F3EF] max-w-4xl mx-auto leading-[0.95]">
            NOT MADE TO FIT IN. <br />
            <span className="text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors">
              MADE TO STAND APART.
            </span>
          </h2>

          <div className="w-24 h-[2px] bg-[#D6FF3F] mx-auto my-6" />

          <p className="font-mono-street text-sm sm:text-lg text-[#C5C3BC] max-w-2xl mx-auto leading-relaxed">
            Abstract thoughts. Unfiltered expression. Streetwear without boundaries. ENDLOOP DRIPS
            is for those who wear their perspective, not just their clothes.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#171717] hover:bg-[#D6FF3F] text-[#F5F3EF] hover:text-[#0A0A0A] border border-[#2F2F2F] hover:border-[#D6FF3F] font-mono-street text-xs font-bold uppercase tracking-widest transition-all duration-200"
            >
              READ OUR STORY <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-[#222222] pb-6">
          <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
            DISCIPLINE & SILHOUETTE
          </span>
          <h2 className="font-heading text-5xl sm:text-6xl text-[#F5F3EF] tracking-wide">
            EXPLORE THE CATEGORIES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryTiles.map((tile) => (
            <div
              key={tile.title}
              onClick={() => onNavigate('shop', tile.category)}
              className="group relative aspect-[3/4] overflow-hidden bg-[#141414] border border-[#222222] hover:border-[#D6FF3F] transition-all duration-300 cursor-pointer flex flex-col justify-between p-6"
            >
              <img
                src={tile.image}
                alt={tile.title}
                className="absolute inset-0 w-full h-full object-cover object-center img-zoom filter brightness-[0.65] group-hover:brightness-[0.8] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="font-mono-street text-[10px] bg-[#0A0A0A]/90 text-[#D6FF3F] border border-[#D6FF3F]/30 px-2 py-0.5 uppercase tracking-widest font-bold">
                  {tile.badge}
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-heading text-3xl sm:text-4xl text-[#F5F3EF] group-hover:text-[#D6FF3F] transition-colors leading-none">
                  {tile.title}
                </h3>
                <p className="font-mono-street text-xs text-[#A4A4A4] line-clamp-2">
                  {tile.desc}
                </p>
                <div className="pt-2 flex items-center gap-2 font-mono-street text-[11px] font-bold text-[#D6FF3F] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  EXPLORE COLLECTION <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAMPAIGN EDITORIAL: "ENTER THE LOOP" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#222222] bg-[#0D0D0D] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Asymmetrical Imagery */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden bg-[#161616] border border-[#242424]">
                  <img
                    src="/images/campaign-editorial.jpg"
                    alt="Streetwear Lookbook Editorial Duo"
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
                <div className="p-4 bg-[#141414] border border-[#242424] font-mono-street text-xs text-[#888888] space-y-1">
                  <p className="text-[#D6FF3F] font-bold">FABRIC INTEGRITY:</p>
                  <p>100% Heavyweight combed French Terry. Hand-inspected screenprints.</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="aspect-square overflow-hidden bg-[#161616] border border-[#242424]">
                  <img
                    src="/images/fabric-detail.jpg"
                    alt="Extreme macro 280 GSM cotton texture"
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
                <div className="aspect-[4/5] overflow-hidden bg-[#161616] border border-[#242424]">
                  <img
                    src="/images/bad-choices.jpg"
                    alt="Editorial Model with Statement Tee"
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
              </div>
            </div>

            {/* Right Editorial Copy Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
                CAMPAIGN EDITORIAL // ISSUE 04
              </span>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-[#F5F3EF] leading-[0.9] tracking-tight">
                ENTER <br />
                THE LOOP.
              </h2>
              <div className="space-y-4 font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
                <p>
                  We reject the fast-fashion cycle of disposable hype. Each ENDLOOP DRIPS piece is
                  manufactured in small, numbered runs using 280 to 310 GSM combed cotton that holds
                  its architectural drape wash after wash.
                </p>
                <p>
                  From cyber-sigilism to deconstructed typographic portraits, our graphics are
                  visual artifacts of identity designed for individuals who move in the shadows of
                  unconventional culture.
                </p>
              </div>

              <div className="pt-4 border-t border-[#202020] grid grid-cols-2 gap-4 font-mono-street text-xs">
                <div>
                  <span className="text-[#888888] block">SILHOUETTES</span>
                  <span className="text-[#F5F3EF] font-bold">Boxy / Drop Shoulder</span>
                </div>
                <div>
                  <span className="text-[#888888] block">PRODUCTION</span>
                  <span className="text-[#D6FF3F] font-bold">Limited Batches</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full py-4 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                VIEW THE CAMPAIGN COLLECTION <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM SECTION: CAUGHT IN THE LOOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-[#222222] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold mb-1">
              <InstagramIcon size={14} />
              SOCIAL ARCHIVE
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl text-[#F5F3EF] tracking-wide">
              CAUGHT IN THE LOOP.
            </h2>
          </div>
          <a
            href="https://www.instagram.com/end10op.drips/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono-street text-xs font-bold text-[#F5F3EF] hover:text-[#D6FF3F] uppercase tracking-widest transition-colors"
          >
            FOLLOW @END10OP.DRIPS{' '}
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform text-[#D6FF3F]"
            />
          </a>
        </div>

        {/* 6-image responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/end10op.drips/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#161616] border border-[#222222] hover:border-[#D6FF3F] transition-all"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <InstagramIcon size={18} className="text-[#D6FF3F]" />
                <div>
                  <p className="font-mono-street text-[10px] text-[#F5F3EF] line-clamp-3">
                    {post.caption}
                  </p>
                  <span className="font-mono-street text-[9px] text-[#D6FF3F] font-bold block mt-1">
                    {post.tag}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
