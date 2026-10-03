import React, { useState } from 'react';
import { X, Heart, Plus, Minus, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { Product, formatCurrency } from '../data/storeData';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isInWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white max-w-3xl w-full rounded-xs shadow-2xl z-10 overflow-hidden my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image on blush background */}
          <div className="relative bg-[#FEF8F5] p-8 sm:p-12 flex items-center justify-center">
            {product.isSale && (
              <span className="absolute top-4 left-4 bg-[#2BB673] text-white text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase">
                SALE
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[300px] w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right: Details & Purchase actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#7A7A7A]">
                <span>Jhumky Luxury</span>
                <span>·</span>
                <span className="capitalize">{product.category}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-medium text-[#1A1A24] mt-2 font-display">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xl font-bold text-[#1A1A24] tabular-nums">
                  {formatCurrency(product.price)}
                </span>
                {product.isSale && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs">
                    Special Offer
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                {product.description ||
                  'Carefully hand-carved in 22K yellow gold with timeless heritage design and micro-pave stone setting.'}
              </p>

              {/* Trust markers */}
              <div className="mt-5 pt-4 border-t border-neutral-100 space-y-2 text-xs text-[#555555]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
                  <span>22 Karat Guaranteed Pure Gold</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2BB673]" />
                  <span>Lifetime Authenticity & Hallmarked Certificate</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-neutral-100 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-200">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 px-3 text-neutral-600 hover:bg-neutral-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 px-3 text-neutral-600 hover:bg-neutral-100"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Wishlist button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2.5 border transition-colors flex items-center justify-center ${
                    isInWishlist
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-neutral-200 text-neutral-600 hover:text-black'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-[#1A1A24] text-white hover:bg-black transition-colors font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
