import React, { useState } from 'react';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageView } from '../types';

interface CartPageProps {
  onNavigate: (page: PageView) => void;
  onSelectProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    cart,
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
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
        <div className="w-20 h-20 border border-[#2B2B2B] bg-[#121212] flex items-center justify-center mx-auto text-[#666666]">
          <ShoppingBag size={32} />
        </div>
        <h1 className="font-heading text-5xl sm:text-6xl text-[#F5F3EF]">
          YOUR LOOP BAG IS EMPTY
        </h1>
        <p className="font-mono-street text-xs sm:text-sm text-[#888888] max-w-md mx-auto leading-relaxed">
          Looks like you haven't selected any streetwear pieces from our latest drop archive.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-8 py-4 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
        >
          EXPLORE THE CATALOG <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#222222] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
            CHECKOUT PREPARATION
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl text-[#F5F3EF]">
            YOUR LOOP BAG ({cart.length})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="font-mono-street text-xs text-[#888888] hover:text-red-400 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw size={13} /> Clear Bag
        </button>
      </div>

      {/* Free Shipping Banner */}
      <div className="bg-[#141414] border border-[#242424] p-4 space-y-2">
        <div className="flex items-center justify-between font-mono-street text-xs">
          <span className="flex items-center gap-2 text-[#F5F3EF]">
            <Truck size={15} className="text-[#D6FF3F]" />
            {remainingForFreeShipping === 0 ? (
              <span className="text-[#D6FF3F] font-bold">
                QUALIFIED FOR FREE EXPRESS PAN-INDIA DELIVERY!
              </span>
            ) : (
              <span>
                ADD <strong className="text-[#D6FF3F]">₹{remainingForFreeShipping}</strong> MORE FOR FREE EXPRESS DISPATCH
              </span>
            )}
          </span>
          <span className="text-[#888888]">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#252525]">
          <div
            className="h-full bg-[#D6FF3F] transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 p-4 bg-[#121212] border border-[#202020] hover:border-[#303030] transition-colors"
            >
              {/* Product Thumbnail */}
              <div
                onClick={() => onSelectProduct(item.product.id)}
                className="w-24 h-32 sm:w-28 sm:h-36 bg-[#161616] flex-shrink-0 cursor-pointer overflow-hidden group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover img-zoom"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono-street text-[10px] bg-[#1E1E1E] text-[#D6FF3F] px-2 py-0.5 uppercase">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => onSelectProduct(item.product.id)}
                        className="font-heading text-2xl text-[#F5F3EF] hover:text-[#D6FF3F] transition-colors cursor-pointer mt-1"
                      >
                        {item.product.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#666666] hover:text-red-400 p-1.5 transition-colors"
                      title="Remove piece"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 font-mono-street text-xs text-[#888888] mt-2">
                    <span>
                      SIZE: <strong className="text-[#F5F3EF]">{item.selectedSize}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      COLOR: <strong className="text-[#F5F3EF]">{item.selectedColor}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      WEIGHT: <strong className="text-[#F5F3EF]">{item.product.fabricWeight}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#1C1C1C] pt-4 mt-4">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#2D2D2D] bg-[#0A0A0A]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-sm text-[#A4A4A4] hover:text-[#D6FF3F]"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-mono-street text-xs font-bold text-[#F5F3EF]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-sm text-[#A4A4A4] hover:text-[#D6FF3F]"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="font-mono-street text-lg font-bold text-[#F5F3EF]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    {item.quantity > 1 && (
                      <span className="block font-mono-street text-[10px] text-[#666666]">
                        (₹{item.product.price} each)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Delivery Note / Special Requests */}
          <div className="bg-[#121212] border border-[#202020] p-4">
            <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-2 font-bold">
              ORDER INSTRUCTIONS // DISPATCH NOTES (OPTIONAL)
            </label>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Leave with security / Call upon arrival / Gift packaging"
              rows={2}
              className="w-full bg-[#181818] border border-[#2A2A2A] p-3 text-xs font-mono-street text-[#F5F3EF] placeholder-[#555555] focus:outline-none focus:border-[#D6FF3F]"
            />
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#121212] border border-[#242424] p-6 space-y-6 sticky top-24">
            <h2 className="font-heading text-2xl text-[#F5F3EF] tracking-wider border-b border-[#222222] pb-3">
              ORDER SUMMARY
            </h2>

            {/* Promo Code Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#18230D] border border-[#D6FF3F]/40 text-xs font-mono-street">
                  <div className="flex items-center gap-2 text-[#D6FF3F]">
                    <Tag size={15} />
                    <span>
                      PROMO: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#A4A4A4] hover:text-red-400 underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="PROMO CODE"
                      className="flex-1 bg-[#181818] border border-[#2A2A2A] px-3 py-2.5 text-xs font-mono-street text-[#F5F3EF] placeholder-[#555555] uppercase focus:outline-none focus:border-[#D6FF3F]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#202020] hover:bg-[#D6FF3F] hover:text-[#0A0A0A] font-mono-street text-xs font-bold uppercase transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] font-mono-street text-red-400">{couponError}</p>
                  )}
                  <p className="text-[10px] font-mono-street text-[#666666]">
                    TIP: TRY CODE <strong className="text-[#D6FF3F]">ENTERTHELOOP</strong>
                  </p>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 font-mono-street text-xs border-t border-[#202020] pt-4">
              <div className="flex justify-between text-[#888888]">
                <span>Item Subtotal ({cart.length} items)</span>
                <span className="text-[#F5F3EF]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#D6FF3F]">
                  <span>Discount Applied ({appliedCoupon?.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-[#888888]">
                <span>Pan-India Express Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#D6FF3F]">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#F5F3EF] pt-4 border-t border-[#242424]">
                <span>TOTAL DUE (INR)</span>
                <span className="text-[#D6FF3F]">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-4 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all pulse-accent shadow-xl"
            >
              PROCEED TO CHECKOUT <ArrowRight size={16} />
            </button>

            <div className="space-y-2 pt-2 border-t border-[#1C1C1C] text-[11px] font-mono-street text-[#777777]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#D6FF3F]" />
                <span>Encrypted 256-bit Indian payment channels</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[#D6FF3F]" />
                <span>Dispatches from warehouse within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-[#D6FF3F]" />
                <span>7-Day size replacement pickup guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
