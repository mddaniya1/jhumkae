import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Tag, Gift, Truck } from 'lucide-react';

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeCopied: () => void;
}

export const OffersModal: React.FC<OffersModalProps> = ({
  isOpen,
  onClose,
  onCodeCopied,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('JHUMKY20');
    setCopied(true);
    onCodeCopied();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white max-w-md w-full rounded-xs shadow-2xl z-10 overflow-hidden text-center p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close offers"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Accent */}
        <div className="w-14 h-14 bg-[#FEF8F5] border border-[#FCDCC9] rounded-full mx-auto flex items-center justify-center text-[#1A1A24] mb-4">
          <Tag className="w-6 h-6 stroke-[1.5] text-[#1A1A24]" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C49A45]">
          Special Offer
        </span>

        <h3 className="text-2xl font-medium text-[#1A1A24] mt-1 font-display">
          Enjoy 20% Off Your Order
        </h3>

        <p className="text-xs text-[#666666] mt-2 leading-relaxed">
          Celebrate handcrafted Pakistani luxury with 22K gold bangles, bridal jhumkas, and diamond rings.
        </p>

        {/* Promo Code Box */}
        <div className="my-6 p-4 bg-[#FEF8F5] border border-dashed border-[#F5C7AF] rounded-xs flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
              Promo Code
            </span>
            <span className="text-lg font-mono font-bold text-[#1A1A24] tracking-widest">
              JHUMKY20
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#1A1A24] text-white hover:bg-black text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Perks list */}
        <div className="space-y-2 text-left text-xs text-[#555555] border-t border-neutral-100 pt-4">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#2BB673] shrink-0" />
            <span>Free nationwide insured shipping on orders over Rs. 5,000</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#C49A45] shrink-0" />
            <span>Complimentary luxury velvet jewellery case with every piece</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neutral-600 shrink-0" />
            <span>Lifetime warranty & certification card included</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-[#1A1A24] text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};
