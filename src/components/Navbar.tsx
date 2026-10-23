import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { PageView } from '../types';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, param?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenSearch }) => {
  const { cartCount, openCart, wishlist } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageView; tag?: string }[] = [
    { label: 'SHOP ALL', page: 'shop' },
    { label: 'NEW DROPS', page: 'new-drops', tag: 'HOT' },
    { label: 'OUR STORY', page: 'about' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222222] py-3.5 shadow-2xl'
          : 'bg-[#0A0A0A] border-b border-[#1A1A1A] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#F5F3EF] hover:text-[#D6FF3F] p-2 -ml-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Brand Logo & Signature */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-sm bg-[#161616] border border-[#2D2D2D] flex items-center justify-center group-hover:border-[#D6FF3F] transition-colors">
                <svg
                  className="w-5 h-5 text-[#D6FF3F] group-hover:scale-110 transition-transform"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                >
                  <path d="M30,50 C30,38 42,35 50,50 C58,65 70,62 70,50 C70,38 58,35 50,50 C42,65 30,62 30,50 Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl sm:text-3xl tracking-wider text-[#F5F3EF] leading-none group-hover:text-[#D6FF3F] transition-colors">
                  ENDLOOP <span className="text-[#A4A4A4] group-hover:text-[#F5F3EF]">DRIPS</span>
                </span>
                <span className="font-mono-street text-[9px] tracking-[0.25em] text-[#A4A4A4] uppercase -mt-0.5">
                  Wear Your Mind
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`relative font-heading text-lg tracking-wider transition-colors duration-200 py-1 ${
                    isActive ? 'text-[#D6FF3F]' : 'text-[#F5F3EF] hover:text-[#D6FF3F]'
                  }`}
                >
                  {link.label}
                  {link.tag && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-[#D6FF3F] text-[#0A0A0A] font-mono-street text-[9px] font-bold rounded-xs align-middle">
                      {link.tag}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6FF3F]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors"
              aria-label="Search catalog"
              title="Search products"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Saved */}
            <button
              onClick={() => handleLinkClick('shop')}
              className="p-2 text-[#A4A4A4] hover:text-[#D6FF3F] transition-colors relative hidden sm:block"
              aria-label="Saved items"
              title="Saved items"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#262626] border border-[#D6FF3F] text-[#D6FF3F] text-[10px] font-bold rounded-full flex items-center justify-center font-mono-street">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              className="group flex items-center gap-2 bg-[#171717] hover:bg-[#222222] border border-[#2A2A2A] hover:border-[#D6FF3F] px-3.5 py-2 rounded-none transition-all duration-200"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag size={18} className="text-[#F5F3EF] group-hover:text-[#D6FF3F] transition-colors" />
              <span className="font-heading text-base tracking-wider text-[#F5F3EF] group-hover:text-[#D6FF3F]">
                BAG
              </span>
              <span className="bg-[#D6FF3F] text-[#0A0A0A] text-xs font-bold font-mono-street px-1.5 py-0.5 rounded-none min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#0A0A0A]/98 backdrop-blur-xl z-50 border-t border-[#222222] p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <p className="font-mono-street text-xs text-[#A4A4A4] uppercase tracking-widest border-b border-[#222222] pb-2">
              Menu // Drop Catalog
            </p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className="flex items-center justify-between text-left font-heading text-3xl tracking-wider text-[#F5F3EF] hover:text-[#D6FF3F] border-b border-[#1A1A1A] pb-3"
                >
                  <span className="flex items-center gap-3">
                    {link.label}
                    {link.tag && (
                      <span className="px-2 py-0.5 bg-[#D6FF3F] text-[#0A0A0A] font-mono-street text-[10px] font-bold">
                        {link.tag}
                      </span>
                    )}
                  </span>
                  <ArrowRight size={20} className="text-[#A4A4A4]" />
                </button>
              ))}

              <button
                onClick={() => handleLinkClick('faq')}
                className="text-left font-mono-street text-sm text-[#A4A4A4] hover:text-[#F5F3EF] pt-2"
              >
                FAQs & Sizing Info
              </button>
              <button
                onClick={() => handleLinkClick('shipping-returns')}
                className="text-left font-mono-street text-sm text-[#A4A4A4] hover:text-[#F5F3EF]"
              >
                Pan-India Shipping & 7-Day Exchange
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#222222] space-y-4">
            <div className="bg-[#141414] p-4 border border-[#222222]">
              <p className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-wider mb-1">
                BRAND PHILOSOPHY
              </p>
              <p className="text-xs text-[#A4A4A4] italic">
                “Designed for the awakened. Streetwear without boundaries.”
              </p>
            </div>

            <a
              href="https://www.instagram.com/end10op.drips/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#1A1A1A] hover:bg-[#252525] text-xs font-mono-street uppercase tracking-wider text-[#F5F3EF]"
            >
              Instagram: @end10op.drips
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
