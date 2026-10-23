import React, { useState, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductSize, PageView } from '../types';

interface ShopProps {
  initialCategory?: string;
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: PageView) => void;
}

export const Shop: React.FC<ShopProps> = ({
  initialCategory,
  onSelectProduct,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available unique sizes and colors
  const allSizes: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];
  const allColors = [
    { label: 'All Shades', value: 'All' },
    { label: 'Pitch Black', value: 'Black' },
    { label: 'Washed Charcoal', value: 'Charcoal' },
    { label: 'Acid Lime', value: 'Lime' },
    { label: 'Carbon / Cement', value: 'Carbon' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'All' && !product.sizes.includes(selectedSize as ProductSize)) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'All') {
        const hasColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedSize, selectedColor, sortBy, searchQuery]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedColor !== 'All' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Editorial Header */}
      <div className="border-b border-[#222222] pb-8 mb-8 space-y-3">
        <div className="flex items-center gap-2 font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
          <span>CATALOG ARCHIVE</span>
          <span>//</span>
          <span>SS26 DROP SUITE</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-[#F5F3EF] leading-none tracking-tight">
              SHOP ALL DROPS
            </h1>
            <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] max-w-xl mt-2">
              All pieces cut from 280–310 GSM combed French terry and luxury cotton. Pre-shrunk,
              boxy drop-shoulder silhouettes designed for the awakened mind.
            </p>
          </div>
          <div className="font-mono-street text-xs text-[#888888]">
            SHOWING <strong className="text-[#D6FF3F]">{filteredAndSortedProducts.length}</strong> OF{' '}
            {PRODUCTS.length} STYLES
          </div>
        </div>
      </div>

      {/* Category Pills Bar (Horizontal scroll on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#1A1A1A]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 font-heading text-lg sm:text-xl tracking-wider transition-all uppercase whitespace-nowrap border ${
              selectedCategory === cat
                ? 'bg-[#D6FF3F] text-[#0A0A0A] border-[#D6FF3F] font-bold'
                : 'bg-[#121212] text-[#A4A4A4] border-[#222222] hover:text-[#F5F3EF] hover:border-[#444444]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Control Bar: Search, Filters Trigger, Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#121212] border border-[#222222] p-4 mb-8">
        {/* Search inside shop */}
        <div className="flex-1 min-w-[200px] max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="FILTER BY KEYWORD..."
            className="w-full bg-[#171717] border border-[#2B2B2B] px-3.5 py-2 text-xs font-mono-street text-[#F5F3EF] placeholder-[#666666] focus:outline-none focus:border-[#D6FF3F] uppercase tracking-wider"
          />
        </div>

        {/* Filter Drawer Toggle & Sort Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-[#2F2F2F] hover:border-[#D6FF3F] text-xs font-mono-street text-[#F5F3EF] uppercase tracking-wider transition-colors"
          >
            <SlidersHorizontal size={14} className="text-[#D6FF3F]" />
            <span>FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2F2F2F] px-3 py-1.5">
            <ArrowUpDown size={13} className="text-[#888888]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-mono-street text-[#F5F3EF] uppercase focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#141414] text-[#F5F3EF]">
                SORT: FEATURED
              </option>
              <option value="newest" className="bg-[#141414] text-[#F5F3EF]">
                SORT: LATEST DROPS
              </option>
              <option value="price-asc" className="bg-[#141414] text-[#F5F3EF]">
                PRICE: LOW TO HIGH
              </option>
              <option value="price-desc" className="bg-[#141414] text-[#F5F3EF]">
                PRICE: HIGH TO LOW
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Filter Drawer Panel */}
      {isMobileFilterOpen && (
        <div className="bg-[#141414] border border-[#2A2A2A] p-6 mb-8 animate-fadeIn space-y-6">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <span className="font-heading text-xl text-[#F5F3EF] tracking-wider">
              FINE TUNE DROPS
            </span>
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1.5 font-mono-street text-xs text-[#D6FF3F] hover:underline"
                >
                  <RotateCcw size={12} /> Reset All
                </button>
              )}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-[#888888] hover:text-[#F5F3EF]"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sizes */}
            <div>
              <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-2.5 font-bold">
                SIZE SELECTION
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSize('All')}
                  className={`px-3 py-1.5 font-mono-street text-xs border ${
                    selectedSize === 'All'
                      ? 'bg-[#D6FF3F] text-[#0A0A0A] border-[#D6FF3F] font-bold'
                      : 'bg-[#1C1C1C] border-[#2D2D2D] text-[#888888] hover:text-white'
                  }`}
                >
                  ALL SIZES
                </button>
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 font-mono-street text-xs border ${
                      selectedSize === s
                        ? 'bg-[#D6FF3F] text-[#0A0A0A] border-[#D6FF3F] font-bold'
                        : 'bg-[#1C1C1C] border-[#2D2D2D] text-[#888888] hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-2.5 font-bold">
                COLOR PALETTE
              </label>
              <div className="flex flex-wrap gap-2">
                {allColors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedColor(c.value)}
                    className={`px-3 py-1.5 font-mono-street text-xs border ${
                      selectedColor === c.value
                        ? 'bg-[#D6FF3F] text-[#0A0A0A] border-[#D6FF3F] font-bold'
                        : 'bg-[#1C1C1C] border-[#2D2D2D] text-[#888888] hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Secondary */}
            <div>
              <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-2.5 font-bold">
                THEMATIC GENRE
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.slice(1).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 font-mono-street text-xs border ${
                      selectedCategory === cat
                        ? 'bg-[#D6FF3F] text-[#0A0A0A] border-[#D6FF3F] font-bold'
                        : 'bg-[#1C1C1C] border-[#2D2D2D] text-[#888888] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="font-mono-street text-xs text-[#666666]">ACTIVE FILTERS:</span>

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-[#1B1B1B] border border-[#2D2D2D] px-2.5 py-1 text-xs font-mono-street text-[#D6FF3F]">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}

          {selectedSize !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-[#1B1B1B] border border-[#2D2D2D] px-2.5 py-1 text-xs font-mono-street text-[#D6FF3F]">
              Size: {selectedSize}
              <button onClick={() => setSelectedSize('All')}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}

          {selectedColor !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-[#1B1B1B] border border-[#2D2D2D] px-2.5 py-1 text-xs font-mono-street text-[#D6FF3F]">
              Color: {selectedColor}
              <button onClick={() => setSelectedColor('All')}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}

          {searchQuery.trim() !== '' && (
            <span className="inline-flex items-center gap-1.5 bg-[#1B1B1B] border border-[#2D2D2D] px-2.5 py-1 text-xs font-mono-street text-[#D6FF3F]">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>
                <X size={12} className="hover:text-white" />
              </button>
            </span>
          )}

          <button
            onClick={resetAllFilters}
            className="text-xs font-mono-street text-[#888888] hover:text-[#D6FF3F] underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="border border-[#222222] bg-[#111111] py-20 px-4 text-center space-y-4">
          <div className="w-16 h-16 border border-[#333333] flex items-center justify-center mx-auto text-[#666666]">
            <Filter size={24} />
          </div>
          <h3 className="font-heading text-3xl text-[#F5F3EF]">
            NO PIECES MATCH YOUR FILTER CRITERIA
          </h3>
          <p className="font-mono-street text-xs text-[#888888] max-w-md mx-auto">
            Try resetting your size or category selection to explore our full archive of heavyweight
            oversized tees.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-6 py-3 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-wider transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
