import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle,
  Truck,
  CreditCard,
  QrCode,
  AlertTriangle,
  Building2,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { PageView, OrderDetails } from '../types';

interface CheckoutProps {
  onNavigate: (page: PageView) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Chandigarh',
  'Jammu & Kashmir',
  'Ladakh',
];

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const {
    cart,
    subtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    finalTotal,
    clearCart,
  } = useCart();

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'razorpay', // 'razorpay' | 'cod'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = 'Valid email is required for tracking updates';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errs.phone = '10-digit Indian mobile number starting with 6-9 is required';
    }

    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';

    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pincode.trim() || !pinRegex.test(formData.pincode)) {
      errs.pincode = 'Valid 6-digit Indian postal pincode is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate order creation on backend
    setTimeout(() => {
      const orderNumber = `ELP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderNumber,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod:
          formData.paymentMethod === 'razorpay'
            ? 'Razorpay Gateway (UPI / Cards / Net Banking)'
            : 'Cash on Delivery (COD)',
        items: [...cart],
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: finalTotal,
        createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      clearCart();

      // Streetwear acid lime confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6FF3F', '#F5F3EF', '#333333'],
        });
      } catch {
        // Fallback if confetti fails
      }
    }, 1200);
  };

  // If order confirmed, show editorial order receipt
  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-8 animate-fadeIn">
        <div className="bg-[#111111] border border-[#2B2B2B] p-8 sm:p-12 space-y-6 text-[#F5F3EF]">
          <div className="flex items-center gap-3 text-[#D6FF3F]">
            <CheckCircle size={32} />
            <div>
              <span className="font-mono-street text-xs uppercase tracking-widest text-[#D6FF3F] font-bold">
                ORDER DISPATCH QUEUED
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl text-[#F5F3EF]">
                WELCOME TO THE LOOP.
              </h1>
            </div>
          </div>

          <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] leading-relaxed">
            Thank you, <strong className="text-[#F5F3EF]">{confirmedOrder.customerName}</strong>. Your
            order has been recorded in our dispatch registry. You will receive SMS & WhatsApp tracking
            updates at <strong className="text-[#F5F3EF]">+91 {confirmedOrder.phone}</strong>.
          </p>

          <div className="bg-[#171717] border border-[#262626] p-4 font-mono-street text-xs space-y-2">
            <div className="flex justify-between border-b border-[#242424] pb-2">
              <span className="text-[#888888]">ORDER REFERENCE:</span>
              <span className="text-[#D6FF3F] font-bold">{confirmedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#242424] pb-2">
              <span className="text-[#888888]">PAYMENT MODE:</span>
              <span>{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b border-[#242424] pb-2">
              <span className="text-[#888888]">DESTINATION:</span>
              <span className="text-right max-w-xs">
                {confirmedOrder.address}, {confirmedOrder.city}, {confirmedOrder.state} —{' '}
                {confirmedOrder.pincode}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#F5F3EF] pt-2">
              <span>TOTAL BILLED:</span>
              <span className="text-[#D6FF3F]">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Ordered items breakdown */}
          <div className="space-y-3 border-t border-[#222222] pt-4">
            <h3 className="font-mono-street text-xs uppercase tracking-wider text-[#A4A4A4] font-bold">
              PIECES IN THIS SHIPMENT:
            </h3>
            <div className="divide-y divide-[#1F1F1F]">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between font-mono-street text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-12 object-cover bg-[#222222]"
                    />
                    <div>
                      <p className="font-bold text-[#F5F3EF]">{item.product.name}</p>
                      <p className="text-[10px] text-[#777777]">
                        Size: {item.selectedSize} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#D6FF3F]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('shop')}
              className="flex-1 py-3.5 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-wider text-center"
            >
              RETURN TO CATALOG
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 bg-[#1C1C1C] hover:bg-[#282828] border border-[#333333] text-[#F5F3EF] font-mono-street text-xs font-bold uppercase tracking-wider"
            >
              PRINT RECEIPT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-heading text-4xl text-[#F5F3EF]">NO ACTIVE ITEMS TO CHECKOUT</h1>
        <p className="font-mono-street text-xs text-[#888888]">
          Add pieces to your bag before visiting checkout.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 bg-[#D6FF3F] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase"
        >
          GO TO SHOP
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-[#222222] pb-6 mb-10 flex items-center justify-between">
        <div>
          <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
            CHECKOUT DISPATCH
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl text-[#F5F3EF]">
            SECURE CHECKOUT
          </h1>
        </div>
        <div className="flex items-center gap-2 font-mono-street text-xs text-[#888888]">
          <Lock size={14} className="text-[#D6FF3F]" />
          <span>256-BIT ENCRYPTED</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Customer & Shipping Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact Details */}
          <section className="bg-[#121212] border border-[#222222] p-6 space-y-4">
            <h2 className="font-heading text-2xl text-[#F5F3EF] tracking-wider border-b border-[#202020] pb-2">
              01 // CONTACT INFORMATION
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  EMAIL ADDRESS (FOR ORDER TRACKING) *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                />
                {errors.email && (
                  <p className="text-[11px] font-mono-street text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  PHONE NUMBER (+91 DISPATCH SMS) *
                </label>
                <div className="flex">
                  <span className="bg-[#1D1D1D] border border-r-0 border-[#2B2B2B] px-3 py-3 text-xs font-mono-street text-[#888888]">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    maxLength={10}
                    className="flex-1 bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] font-mono-street text-red-400 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </section>

          {/* Delivery Address */}
          <section className="bg-[#121212] border border-[#222222] p-6 space-y-4">
            <h2 className="font-heading text-2xl text-[#F5F3EF] tracking-wider border-b border-[#202020] pb-2">
              02 // PAN-INDIA SHIPPING ADDRESS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Aarav"
                  className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                />
                {errors.firstName && (
                  <p className="text-[11px] font-mono-street text-red-400 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  LAST NAME *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Sharma"
                  className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                />
                {errors.lastName && (
                  <p className="text-[11px] font-mono-street text-red-400 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                HOUSE / FLAT / BUILDING / STREET ADDRESS *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Flat 402, Lotus Tower, Off Link Road"
                className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
              />
              {errors.address && (
                <p className="text-[11px] font-mono-street text-red-400 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                LANDMARK / APARTMENT / SUITE (OPTIONAL)
              </label>
              <input
                type="text"
                value={formData.apartment}
                onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                placeholder="Near Starbucks / Opp Metro Pillar 128"
                className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  CITY *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Mumbai"
                  className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                />
                {errors.city && (
                  <p className="text-[11px] font-mono-street text-red-400 mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  STATE *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F] cursor-pointer"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s} className="bg-[#121212] text-[#F5F3EF]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  PINCODE (6-DIGIT) *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="400053"
                  maxLength={6}
                  className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                />
                {errors.pincode && (
                  <p className="text-[11px] font-mono-street text-red-400 mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>
          </section>

          {/* Payment Selection & Gateway Integration Architecture */}
          <section className="bg-[#121212] border border-[#222222] p-6 space-y-4">
            <h2 className="font-heading text-2xl text-[#F5F3EF] tracking-wider border-b border-[#202020] pb-2">
              03 // PAYMENT INTEGRATION ARCHITECTURE
            </h2>

            {/* Architectural disclosure banner */}
            <div className="bg-[#171717] border-l-2 border-[#D6FF3F] p-4 font-mono-street text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D6FF3F] font-bold">
                <Info size={15} />
                <span>PRODUCTION PAYMENT GATEWAY INTEGRATION READY</span>
              </div>
              <p className="text-[#A4A4A4] leading-relaxed">
                As per strict e-commerce security standards, client cards and UPI MPINs are never
                collected or stored directly on this frontend. When deployed, this triggers the
                server-side Razorpay Order API with webhook HMAC SHA256 signature verification.
              </p>
            </div>

            {/* Payment Method Radio Options */}
            <div className="space-y-3 pt-2">
              <label
                className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'razorpay'
                    ? 'bg-[#181F10] border-[#D6FF3F]'
                    : 'bg-[#151515] border-[#262626] hover:border-[#444444]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={formData.paymentMethod === 'razorpay'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                  className="mt-1 text-[#D6FF3F]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-street text-xs font-bold text-[#F5F3EF]">
                      RAZORPAY SECURE GATEWAY (RECOMMENDED)
                    </span>
                    <span className="font-mono-street text-[10px] text-[#D6FF3F] bg-[#242E16] px-2 py-0.5">
                      FAST DISPATCH
                    </span>
                  </div>
                  <p className="font-mono-street text-[11px] text-[#888888] mt-1">
                    Instant verification via UPI (Google Pay, PhonePe, Paytm, CRED), Credit/Debit
                    Cards (Visa, Mastercard, RuPay), and Net Banking across all Indian banks.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'bg-[#181F10] border-[#D6FF3F]'
                    : 'bg-[#151515] border-[#262626] hover:border-[#444444]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="mt-1 text-[#D6FF3F]"
                />
                <div className="flex-1">
                  <span className="font-mono-street text-xs font-bold text-[#F5F3EF]">
                    CASH ON DELIVERY (COD)
                  </span>
                  <p className="font-mono-street text-[11px] text-[#888888] mt-1">
                    Pay in cash or QR code to the courier delivery agent upon receiving the package.
                    OTP verification required prior to dispatch.
                  </p>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary & Place Order CTA */}
        <div className="lg:col-span-5">
          <div className="bg-[#121212] border border-[#222222] p-6 space-y-6 sticky top-24">
            <h2 className="font-heading text-2xl text-[#F5F3EF] tracking-wider border-b border-[#202020] pb-2">
              DISPATCH SUMMARY
            </h2>

            {/* Cart Items List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 font-mono-street text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover bg-[#1A1A1A] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#F5F3EF] truncate">{item.product.name}</p>
                    <p className="text-[10px] text-[#777777]">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-[#D6FF3F] font-bold">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="border-t border-[#202020] pt-4 space-y-2 font-mono-street text-xs">
              <div className="flex justify-between text-[#888888]">
                <span>Bag Subtotal</span>
                <span className="text-[#F5F3EF]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#D6FF3F]">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
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

              <div className="flex justify-between text-lg font-bold text-[#F5F3EF] pt-3 border-t border-[#222222]">
                <span>FINAL AMOUNT</span>
                <span className="text-[#D6FF3F]">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50 pulse-accent"
            >
              {isSubmitting ? (
                <>PROCESSING DISPATCH...</>
              ) : (
                <>
                  PLACE ORDER & PAY ₹{finalTotal.toLocaleString('en-IN')} <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 text-[10px] font-mono-street text-[#777777] border-t border-[#1C1C1C]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#D6FF3F]" />
                <span>100% Genuine streetwear manufactured in limited runs</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[#D6FF3F]" />
                <span>Dispatch notification sent to SMS & Email within 24h</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
