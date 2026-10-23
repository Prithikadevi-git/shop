import React, { useState } from 'react';
import {
  Heart,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { Product, ProductSize, PageView } from '../types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { SizeGuideModal } from '../components/SizeGuideModal';

interface ProductDetailProps {
  productId: string;
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: PageView, param?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  onSelectProduct,
  onNavigate,
}) => {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const { addToCart, isWishlisted, toggleWishlist, showToast } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const isSaved = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('Please choose your size before adding to bag');
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} by ENDLOOP DRIPS`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="font-mono-street text-xs text-[#888888] flex items-center gap-2">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#D6FF3F] uppercase transition-colors"
        >
          HOME
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('shop')}
          className="hover:text-[#D6FF3F] uppercase transition-colors"
        >
          CATALOG
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('shop', product.category)}
          className="hover:text-[#D6FF3F] uppercase transition-colors"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#F5F3EF] truncate">{product.name}</span>
      </nav>

      {/* Main Product Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] bg-[#141414] border border-[#222222] overflow-hidden group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center img-zoom"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.badge && (
                <span className="bg-[#D6FF3F] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest px-3 py-1">
                  {product.badge}
                </span>
              )}
              <span className="bg-[#0A0A0A]/85 backdrop-blur-xs font-mono-street text-[10px] text-[#A4A4A4] px-2.5 py-1 tracking-wider uppercase">
                {product.category}
              </span>
            </div>

            {/* Wishlist and Share */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-[#0A0A0A]/80 hover:bg-[#D6FF3F] text-[#F5F3EF] hover:text-[#0A0A0A] border border-[#2B2B2B] flex items-center justify-center transition-colors"
                title="Share piece"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-10 h-10 border border-[#2B2B2B] flex items-center justify-center transition-colors ${
                  isSaved
                    ? 'bg-[#D6FF3F] text-[#0A0A0A]'
                    : 'bg-[#0A0A0A]/80 text-[#F5F3EF] hover:bg-[#D6FF3F] hover:text-[#0A0A0A]'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
              >
                <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`relative aspect-[3/4] overflow-hidden bg-[#161616] border transition-all ${
                  selectedImage === imgUrl
                    ? 'border-[#D6FF3F] ring-1 ring-[#D6FF3F]'
                    : 'border-[#262626] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} view ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information, Selectors & Checkout CTA */}
        <div className="lg:col-span-5 space-y-6 lg:pl-4">
          {/* Header */}
          <div className="border-b border-[#222222] pb-6 space-y-3">
            <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
              // DROP 04 EXCLUSIVE
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-[#F5F3EF] leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-mono-street text-2xl sm:text-3xl font-bold text-[#F5F3EF]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="font-mono-street text-base text-[#666666] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-[#D6FF3F]/10 border border-[#D6FF3F]/40 text-[#D6FF3F] font-mono-street text-xs px-2 py-0.5 font-bold">
                  SAVE {discountPercent}%
                </span>
              )}
            </div>

            <p className="font-mono-street text-[11px] text-[#888888]">
              INCL. OF ALL TAXES • FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹1,999
            </p>
          </div>

          {/* Description */}
          <p className="font-mono-street text-xs sm:text-sm text-[#BDBBB5] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between font-mono-street text-xs">
              <span className="text-[#A4A4A4] uppercase tracking-wider font-bold">
                COLOR: <span className="text-[#F5F3EF]">{selectedColor}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 border font-mono-street text-xs transition-all ${
                    selectedColor === c.name
                      ? 'border-[#D6FF3F] bg-[#1C1C1C] text-[#F5F3EF]'
                      : 'border-[#2D2D2D] bg-[#121212] text-[#888888] hover:border-[#555555]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between font-mono-street text-xs">
              <span className="text-[#A4A4A4] uppercase tracking-wider font-bold">
                SELECT OVERSIZED FIT:{' '}
                {selectedSize ? (
                  <strong className="text-[#D6FF3F]">{selectedSize}</strong>
                ) : (
                  <span className="text-[#888888] italic">Required</span>
                )}
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1.5 text-[#D6FF3F] hover:underline"
              >
                <Ruler size={13} /> Size Guide
              </button>
            </div>

            {/* Size options */}
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSize(s);
                    setSizeError(false);
                  }}
                  className={`py-3 font-mono-street text-sm font-bold border transition-all text-center ${
                    selectedSize === s
                      ? 'bg-[#D6FF3F] text-[#0A0A0A] border-[#D6FF3F]'
                      : 'bg-[#141414] border-[#2A2A2A] text-[#F5F3EF] hover:border-[#D6FF3F]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Error feedback if size not chosen */}
            {sizeError && (
              <div className="flex items-center gap-2 p-2 bg-[#260F0F] border border-red-500/50 text-red-400 font-mono-street text-xs">
                <AlertCircle size={14} />
                <span>PLEASE CHOOSE A SIZE (S, M, L, XL, XXL) BEFORE PROCEEDING</span>
              </div>
            )}
          </div>

          {/* Quantity Selector & Add to Bag CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#2D2D2D] bg-[#141414]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-3 font-mono-street text-sm font-bold text-[#F5F3EF]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all pulse-accent shadow-xl"
              >
                ADD TO LOOP BAG <ArrowRight size={16} />
              </button>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 font-mono-street text-xs text-[#A4A4A4]">
              <span className="w-2 h-2 rounded-full bg-[#D6FF3F] animate-pulse" />
              <span>STOCK STATUS: READY FOR PAN-INDIA 24H DISPATCH</span>
            </div>
          </div>

          {/* Product Accordions */}
          <div className="border-t border-[#222222] pt-4 space-y-2 font-mono-street text-xs">
            {/* Specs Accordion */}
            <div className="border border-[#222222] bg-[#111111]">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full p-4 flex items-center justify-between text-left text-[#F5F3EF] hover:text-[#D6FF3F] transition-colors font-bold uppercase"
              >
                <span>SPECIFICATIONS & CRAFT</span>
                {openAccordion === 'specs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === 'specs' && (
                <div className="p-4 pt-0 text-[#A4A4A4] space-y-2 border-t border-[#1C1C1C]">
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                    <li>Fabric Weight: {product.fabricWeight}</li>
                    <li>Silhouette: {product.fit}</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping & Delivery Accordion */}
            <div className="border border-[#222222] bg-[#111111]">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full p-4 flex items-center justify-between text-left text-[#F5F3EF] hover:text-[#D6FF3F] transition-colors font-bold uppercase"
              >
                <span>PAN-INDIA DISPATCH & 7-DAY EXCHANGE</span>
                {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="p-4 pt-0 text-[#A4A4A4] space-y-2 border-t border-[#1C1C1C]">
                  <p>
                    • Dispatched within 24–48 hours from our fulfillment hub.
                  </p>
                  <p>
                    • Metro cities delivery: 2–4 business days. Rest of India: 4–6 business days.
                  </p>
                  <p>
                    • 7-Day Hassle-Free Size Exchange policy. We handle reverse pickup at no extra charge.
                  </p>
                </div>
              )}
            </div>

            {/* Wash Care Accordion */}
            <div className="border border-[#222222] bg-[#111111]">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full p-4 flex items-center justify-between text-left text-[#F5F3EF] hover:text-[#D6FF3F] transition-colors font-bold uppercase"
              >
                <span>GARMENT CARE FOR GRAPHIC TEES</span>
                {openAccordion === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === 'care' && (
                <div className="p-4 pt-0 text-[#A4A4A4] space-y-2 border-t border-[#1C1C1C]">
                  <p>• Machine wash cold (30°C) inside out with similar darks.</p>
                  <p>• Do not tumble dry. Line dry inside out away from direct blazing sunlight.</p>
                  <p>• Never iron directly over screenprinted areas. Iron inside out on low heat.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PIECES */}
      <section className="border-t border-[#222222] pt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
              CURATED COMPLEMENTS
            </span>
            <h3 className="font-heading text-4xl sm:text-5xl text-[#F5F3EF]">
              COMPLETE THE DRIP
            </h3>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="font-mono-street text-xs text-[#F5F3EF] hover:text-[#D6FF3F] uppercase tracking-wider flex items-center gap-1.5"
          >
            SEE ALL <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-[#161616] border border-[#222222] overflow-hidden group">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute top-2 left-2 font-mono-street text-[9px] bg-black/80 px-2 py-0.5 text-[#D6FF3F]">
                  {p.category}
                </div>
              </div>
              <div className="pt-3">
                <h4 className="font-heading text-xl text-[#F5F3EF] truncate hover:text-[#D6FF3F]">
                  {p.name}
                </h4>
                <p className="font-mono-street text-xs font-bold text-[#D6FF3F] mt-0.5">
                  ₹{p.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};
