import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle pointer-events-none">
      <div className="bg-[#141414] border border-[#D6FF3F] text-[#F5F3EF] px-4 py-3 shadow-2xl flex items-center gap-3">
        <CheckCircle2 size={18} className="text-[#D6FF3F] flex-shrink-0" />
        <span className="font-mono-street text-xs font-bold uppercase tracking-wider">
          {toastMessage}
        </span>
      </div>
    </div>
  );
};
