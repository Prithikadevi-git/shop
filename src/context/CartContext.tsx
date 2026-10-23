import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductSize, CartItem } from '../types';

interface Coupon {
  code: string;
  discountPercent: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, color: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'endloop_cart_v1';
const WISHLIST_STORAGE_KEY = 'endloop_wishlist_v1';
const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 99;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // localStorage may fail in private mode
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // localStorage may fail in private mode
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (product: Product, size: ProductSize, color: string, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    showToast(`Added ${product.name} (${size}) to loop bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from loop bag');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your loop list');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'ENTERTHELOOP' || normalized === 'ENDLOOP10') {
      setAppliedCoupon({ code: normalized, discountPercent: 10 });
      showToast('Code applied: 10% OFF your entire drop');
      return { success: true, message: '10% discount applied!' };
    }
    if (normalized === 'AWAKENED15') {
      setAppliedCoupon({ code: normalized, discountPercent: 15 });
      showToast('Code applied: 15% VIP drop discount');
      return { success: true, message: '15% VIP discount applied!' };
    }
    return { success: false, message: 'Invalid or expired drop code' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        isCartOpen,
        openCart,
        closeCart,
        toastMessage,
        showToast,
        wishlist,
        toggleWishlist,
        isWishlisted,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
