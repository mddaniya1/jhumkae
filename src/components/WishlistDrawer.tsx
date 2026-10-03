import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, formatCurrency } from '../data/storeData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#F0EFEB]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <h2 className="text-lg font-semibold text-[#1A1A24] font-display">
                My Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[#FEF8F5] flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-[#999999]" />
                </div>
                <h3 className="text-base font-medium text-[#232323]">Your wishlist is empty</h3>
                <p className="text-xs text-[#777777] mt-1 max-w-[240px]">
                  Click the heart icon on any jewellery piece to save it here for later.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#1A1A24] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-[#FAF9F7] rounded-xs items-center justify-between"
                >
                  <div className="w-16 h-16 bg-[#FEF8F5] p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-medium text-[#232323] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#232323] mt-0.5">
                      {formatCurrency(product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="p-2 bg-[#1A1A24] text-white hover:bg-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      title="Move to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
