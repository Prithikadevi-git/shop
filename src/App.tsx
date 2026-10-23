import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { PageView } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { NewDrops } from './pages/NewDrops';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { ShippingReturns } from './pages/ShippingReturns';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

export const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('abstract-face-tee');
  const [shopCategory, setShopCategory] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Update document title dynamically based on page
  useEffect(() => {
    const titles: Record<PageView, string> = {
      home: 'ENDLOOP DRIPS™ — Wear Your Mind | Underground Streetwear',
      shop: 'Shop All Drops | ENDLOOP DRIPS',
      'new-drops': 'Drop 04 // Limited Releases | ENDLOOP DRIPS',
      'product-detail': 'Product Details | ENDLOOP DRIPS',
      about: 'About ENDLOOP DRIPS — Wear Your Mind',
      cart: 'Your Loop Bag | ENDLOOP DRIPS',
      checkout: 'Secure Checkout | ENDLOOP DRIPS',
      contact: 'Concierge & Support | ENDLOOP DRIPS',
      faq: 'FAQ & Sizing Guide | ENDLOOP DRIPS',
      'shipping-returns': 'Shipping & Returns | ENDLOOP DRIPS',
      privacy: 'Privacy Policy | ENDLOOP DRIPS',
      terms: 'Terms & Conditions | ENDLOOP DRIPS',
      'not-found': '404 Outside the Loop | ENDLOOP DRIPS',
    };
    document.title = titles[currentPage] || 'ENDLOOP DRIPS';
  }, [currentPage]);

  const handleNavigate = (page: PageView, param?: string) => {
    if (page === 'shop' && param) {
      setShopCategory(param);
    } else if (page === 'shop' && !param) {
      setShopCategory('All');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-[#F5F3EF] relative selection:bg-[#D6FF3F] selection:text-[#0A0A0A]">
      {/* Top Banner & Navigation */}
      <div>
        <AnnouncementBar />
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      </div>

      {/* Main Dynamic Page Outlet */}
      <main className="flex-1 w-full animate-fadeIn">
        {currentPage === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'shop' && (
          <Shop
            key={shopCategory}
            initialCategory={shopCategory}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'new-drops' && (
          <NewDrops
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetail
            productId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <About onNavigate={handleNavigate} />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <Contact onNavigate={handleNavigate} />
        )}

        {currentPage === 'faq' && (
          <FAQ onNavigate={handleNavigate} />
        )}

        {currentPage === 'shipping-returns' && (
          <ShippingReturns onNavigate={handleNavigate} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicy onNavigate={handleNavigate} />
        )}

        {currentPage === 'terms' && (
          <Terms onNavigate={handleNavigate} />
        )}

        {currentPage === 'not-found' && (
          <NotFound onNavigate={handleNavigate} />
        )}
      </main>

      {/* Reusable Global Modals & Notifications */}
      <CartDrawer onNavigate={handleNavigate} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />
      <Toast />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
