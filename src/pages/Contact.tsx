import React, { useState } from 'react';
import { Mail, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { PageView } from '../types';

interface ContactProps {
  onNavigate: (page: PageView) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    category: 'Order Status',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setFormData({
      name: '',
      email: '',
      orderNumber: '',
      category: 'Order Status',
      message: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <span className="font-mono-street text-xs text-[#D6FF3F] uppercase tracking-widest font-bold">
          CONCIERGE & SUPPORT
        </span>
        <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-[#F5F3EF]">
          GET IN TOUCH.
        </h1>
        <p className="font-mono-street text-xs sm:text-sm text-[#A4A4A4] max-w-xl">
          Questions about sizing, your drop order status, or underground creative collaborations?
          Our concierge responds within 12 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#121212] border border-[#222222] p-6 sm:p-8 space-y-6">
          <h2 className="font-heading text-3xl text-[#F5F3EF]">SEND A MESSAGE</h2>

          {status === 'success' ? (
            <div className="bg-[#141F0C] border border-[#D6FF3F] p-6 text-center space-y-3">
              <CheckCircle2 size={32} className="text-[#D6FF3F] mx-auto" />
              <h3 className="font-heading text-2xl text-[#F5F3EF]">TRANSMISSION RECEIVED</h3>
              <p className="font-mono-street text-xs text-[#A4A4A4]">
                Your message has entered our priority queue. A concierge specialist will reach back
                via email shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 bg-[#D6FF3F] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-[#240E0E] border border-red-500/50 text-red-400 font-mono-street text-xs">
                  <AlertCircle size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Kabir Singh"
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                  />
                </div>

                <div>
                  <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="kabir@example.com"
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                    ORDER NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="e.g. ELP-2026-928124"
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                  />
                </div>

                <div>
                  <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                    INQUIRY CATEGORY
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F] cursor-pointer"
                  >
                    <option value="Order Status">Drop Order Status & Tracking</option>
                    <option value="Sizing Help">Size & Fit Recommendation</option>
                    <option value="Exchange Request">7-Day Size Exchange</option>
                    <option value="Collaboration">Artist & Subculture Collab</option>
                    <option value="Other">Other Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono-street text-xs text-[#A4A4A4] uppercase tracking-wider mb-1.5">
                  MESSAGE *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need assistance with..."
                  className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs font-mono-street text-[#F5F3EF] focus:outline-none focus:border-[#D6FF3F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D6FF3F] hover:bg-[#c2ed2c] text-[#0A0A0A] font-mono-street text-xs font-bold uppercase tracking-widest transition-all"
              >
                SUBMIT INQUIRY
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121212] border border-[#222222] p-6 space-y-4">
            <h3 className="font-heading text-2xl text-[#F5F3EF] border-b border-[#202020] pb-2">
              DIRECT REACH
            </h3>

            <div className="space-y-4 font-mono-street text-xs">
              <div className="flex items-start gap-3">
                <InstagramIcon size={18} className="text-[#D6FF3F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#888888] block">INSTAGRAM DIRECT MESSAGE</span>
                  <a
                    href="https://www.instagram.com/end10op.drips/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5F3EF] font-bold hover:text-[#D6FF3F] underline"
                  >
                    @end10op.drips
                  </a>
                  <p className="text-[#666666] text-[11px] mt-0.5">
                    Fastest response for drop styling & urgent queries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#D6FF3F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#888888] block">OFFICIAL EMAIL</span>
                  <span className="text-[#F5F3EF] font-bold">concierge@endloopdrips.com</span>
                  <p className="text-[#666666] text-[11px] mt-0.5">
                    For orders, exchanges, and press matters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[#D6FF3F] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#888888] block">CONCIERGE HOURS</span>
                  <span className="text-[#F5F3EF] font-bold">
                    Monday — Saturday, 10:00 AM – 7:00 PM IST
                  </span>
                  <p className="text-[#666666] text-[11px] mt-0.5">
                    Warehouse dispatches continue Monday through Saturday.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#262626] p-6 space-y-3">
            <h4 className="font-heading text-xl text-[#F5F3EF]">FREQUENTLY ASKED QUESTIONS</h4>
            <p className="font-mono-street text-xs text-[#888888]">
              Looking for size measurements, domestic shipping timelines, or wash care guidance?
            </p>
            <button
              onClick={() => onNavigate('faq')}
              className="font-mono-street text-xs text-[#D6FF3F] hover:underline flex items-center gap-1.5 font-bold uppercase"
            >
              VISIT FAQ SECTION <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
