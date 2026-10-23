import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Check, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageView } from '../types';

interface CartDrawerProps {
  onNavigate: (page: PageView) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    remainingForFreeShipping,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark overlay backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping bag drawer"
          className="w-screen max-w-md bg-[#0D0D0D] border-l border-[#222222] text-[#F5F3EF] flex flex-col justify-between shadow-2xl relative"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#222222] flex items-center justify-between bg-[#111111]">
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl tracking-wider text-[#F5F3EF]">
                YOUR LOOP BAG
              </span>
              <span className="font-mono-street text-xs bg-[#242424] text-[#D6FF3F] px-2 py-0.5">
                {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#A4A4A4] hover:text-[#D6FF3F] hover:bg-[#1E1E1E] transition-colors"
              aria-label="Close bag drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#141414] px-5 py-3 border-b border-[#202020]">
            <div className="flex items-center justify-between text-xs font-mono-street mb-1.5">
              <span className="flex items-center gap-1.5 text-[#F5F3EF]">
                <Truck size={14} className="text-[#D6FF3F]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#D6FF3F] font-bold">
                    YOU UNLOCKED FREE EXPRESS SHIPPING!
                  </span>
                ) : (
                  <span>
                    ADD <strong className="text-[#D6FF3F]">₹{remainingForFreeShipping}</strong> MORE FOR FREE PAN-INDIA EXPRESS DELIVERY
                  </span>
                )}
              </span>
              <span className="text-[#888888]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#252525] rounded-none overflow-hidden">
              <div
                className="h-full bg-[#D6FF3F] transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 border border-[#2A2A2A] rounded-none flex items-center justify-center mb-4 bg-[#141414]">
                  <X size={28} className="text-[#666666]" />
                </div>
                <h4 className="font-heading text-2xl text-[#F5F3EF] mb-2">
                  YOUR BAG IS EMPTY
                </h4>
                <p className="font-mono-street text-xs text-[#888888] max-w-xs mb-6">
                  You haven’t added any pieces from our streetwear drop yet.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    onNavigate('shop');
                  }}
                  className="px-6 py-3 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  EXPLORE LATEST DROPS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#141414] border border-[#222222] relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover bg-[#1B1B1B] flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading text-lg text-[#F5F3EF] leading-tight truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#666666] hover:text-red-400 p-1 transition-colors flex-shrink-0"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 font-mono-street text-xs text-[#888888] mt-1">
                        <span>SIZE: <strong className="text-[#F5F3EF]">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>SHADE: <strong className="text-[#F5F3EF]">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#2D2D2D] bg-[#0A0A0A]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm text-[#A4A4A4] hover:text-[#D6FF3F] hover:bg-[#1E1E1E]"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-mono-street text-xs font-bold text-[#F5F3EF]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm text-[#A4A4A4] hover:text-[#D6FF3F] hover:bg-[#1E1E1E]"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono-street text-sm font-bold text-[#D6FF3F]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & CTAs */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#222222] bg-[#111111] space-y-4">
              {/* Promo code form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#17200E] border border-[#D6FF3F]/40 text-xs font-mono-street">
                  <div className="flex items-center gap-2 text-[#D6FF3F]">
                    <Tag size={14} />
                    <span>CODE: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#A4A4A4] hover:text-red-400 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="PROMO CODE (e.g. ENTERTHELOOP)"
                    className="flex-1 bg-[#171717] border border-[#2A2A2A] px-3 py-2 text-xs font-mono-street text-[#F5F3EF] placeholder-[#555555] uppercase focus:outline-none focus:border-[#D6FF3F]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#222222] hover:bg-[#D6FF3F] hover:text-[#0A0A0A] text-xs font-mono-street font-bold uppercase transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] font-mono-street text-red-400 -mt-2">
                  {couponError}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 font-mono-street text-xs border-t border-[#202020] pt-3">
                <div className="flex justify-between text-[#888888]">
                  <span>Subtotal</span>
                  <span className="text-[#F5F3EF]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#D6FF3F]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#888888]">
                  <span>Pan-India Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-[#D6FF3F]">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#F5F3EF] pt-2 border-t border-[#222222]">
                  <span>TOTAL DUE</span>
                  <span className="text-[#D6FF3F]">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    closeCart();
                    onNavigate('checkout');
                  }}
                  className="w-full py-3.5 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all pulse-accent"
                >
                  PROCEED TO CHECKOUT <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    closeCart();
                    onNavigate('cart');
                  }}
                  className="w-full py-2.5 bg-[#171717] hover:bg-[#222222] border border-[#282828] text-[#F5F3EF] font-mono-street text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  VIEW FULL CART DETAILS
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono-street text-[#666666] pt-1">
                <ShieldCheck size={13} className="text-[#D6FF3F]" />
                <span>SECURE CHECKOUT // DISPATCHED IN 24H ACROSS INDIA</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
