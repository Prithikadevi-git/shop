import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, isWishlisted, toggleWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isSaved = isWishlisted(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    setAddedAnimation(true);
    setShowQuickSizes(false);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <article
      onClick={() => onSelect(product.id)}
      className="group relative bg-[#121212] border border-[#1F1F1F] hover:border-[#383838] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#161616]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center img-zoom transition-transform duration-700"
        />

        {/* Subtle dark gradient overlay on bottom of image for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`font-mono-street text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase ${
                product.badge === 'LIMITED DROP'
                  ? 'bg-[#D6FF3F] text-[#0A0A0A]'
                  : 'bg-[#1E1E1E] text-[#D6FF3F] border border-[#D6FF3F]/30'
              }`}
            >
              {product.badge}
            </span>
          )}
          <span className="bg-[#0A0A0A]/80 backdrop-blur-xs font-mono-street text-[9px] text-[#A4A4A4] px-2 py-0.5 tracking-wider uppercase">
            {product.category}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-none flex items-center justify-center transition-colors z-10 ${
            isSaved
              ? 'bg-[#D6FF3F] text-[#0A0A0A]'
              : 'bg-[#0A0A0A]/70 text-[#F5F3EF] hover:bg-[#D6FF3F] hover:text-[#0A0A0A]'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save item'}
        >
          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Overlay on Hover / Click */}
        {showQuickSizes ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-[#0A0A0A]/95 border-t border-[#2A2A2A] p-3 z-20 flex flex-col gap-2 animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-street text-[10px] text-[#A4A4A4] uppercase tracking-wider">
                Select Size:
              </span>
              <button
                onClick={() => setShowQuickSizes(false)}
                className="font-mono-street text-[10px] text-[#D6FF3F] underline"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(size, e)}
                  className="py-1.5 text-center font-mono-street text-xs font-bold border border-[#333333] hover:border-[#D6FF3F] hover:bg-[#D6FF3F] hover:text-[#0A0A0A] text-[#F5F3EF] transition-all"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickSizes(true);
              }}
              className="w-full py-2.5 bg-[#0A0A0A]/90 hover:bg-[#D6FF3F] text-[#F5F3EF] hover:text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#2D2D2D] hover:border-[#D6FF3F] transition-all duration-200 shadow-xl"
            >
              {addedAnimation ? (
                <>
                  <Check size={14} className="text-[#0A0A0A]" /> ADDED TO LOOP
                </>
              ) : (
                <>
                  <Plus size={14} /> QUICK ADD
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Color swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'border-[#D6FF3F] scale-110'
                      : 'border-[#444444] opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="font-mono-street text-[10px] text-[#777777] ml-1">
                {product.colors.length} shades
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-heading text-xl sm:text-2xl text-[#F5F3EF] tracking-wide group-hover:text-[#D6FF3F] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="font-mono-street text-[11px] text-[#888888] mt-0.5 tracking-tight line-clamp-1">
            {product.fabricWeight}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between pt-3 mt-3 border-t border-[#1C1C1C]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-street text-base sm:text-lg font-bold text-[#F5F3EF]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono-street text-xs text-[#666666] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <span className="font-mono-street text-[10px] text-[#D6FF3F] font-bold">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
