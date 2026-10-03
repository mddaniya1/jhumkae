import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-3 bg-[#1A1A24] text-white px-4 py-3 shadow-2xl rounded-xs border border-[#33333E] max-w-sm">
      <div className="w-5 h-5 rounded-full bg-[#2BB673] flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
      </div>
      <p className="text-xs font-medium text-[#F0EFEB] flex-1 leading-snug">
        {message}
      </p>
      <button
        onClick={onClose}
        className="text-neutral-400 hover:text-white p-0.5"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
