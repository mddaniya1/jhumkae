import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, formatCurrency } from '../data/storeData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 5000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#F0EFEB]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1A1A24]" />
              <h2 className="text-lg font-semibold text-[#1A1A24] font-display">
                Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FEF8F5] p-4 border-b border-[#F5E6DC]">
            <div className="text-xs font-medium text-[#232323] flex justify-between mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong>{formatCurrency(remainingForFreeShipping)}</strong> more for FREE shipping!
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">
                  🎉 You have qualified for FREE nationwide delivery!
                </span>
              )}
            </div>
            <div className="w-full bg-[#E8DDD6] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2BB673] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[#FEF8F5] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#999999]" />
                </div>
                <h3 className="text-base font-medium text-[#232323]">Your bag is currently empty</h3>
                <p className="text-xs text-[#777777] mt-1 max-w-[240px]">
                  Explore handcrafted 22K gold jhumkas, bangles, and rings.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#1A1A24] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 pb-5 border-b border-neutral-100 last:border-b-0"
                >
                  {/* Thumbnail on blush background */}
                  <div className="w-20 h-20 bg-[#FEF8F5] p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-medium text-[#232323] leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-[#232323] mt-1">
                        {formatCurrency(product.price)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="p-1 px-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold tabular-nums text-[#232323]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="p-1 px-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs text-neutral-500 ml-auto font-medium tabular-nums">
                        {formatCurrency(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#FAF9F7] border-t border-[#F0EFEB] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666666]">Subtotal</span>
                <span className="text-base font-bold text-[#1A1A24] tabular-nums">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#777777]">
                <span>Taxes & Duties</span>
                <span>Included</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#777777]">
                <span>Shipping</span>
                <span>{subtotal >= freeShippingThreshold ? 'FREE' : formatCurrency(250)}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-[#1A1A24] text-white hover:bg-black transition-colors font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-neutral-500">
                Guaranteed safe checkout with 256-bit SSL encryption.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
