import React from 'react';
import { Heart, Eye, Plus } from 'lucide-react';
import { Product, formatCurrency } from '../data/storeData';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="group flex flex-col items-center">
      {/* Blush Square Image Container */}
      <div className="relative w-full aspect-square bg-[#FEF8F5] overflow-hidden flex items-center justify-center p-6 sm:p-8 transition-colors duration-300 group-hover:bg-[#FDF3ED]">
        {/* SALE Badge Top-Left */}
        {product.isSale && (
          <span className="absolute top-3 left-3 z-10 bg-[#2BB673] text-white text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase">
            SALE
          </span>
        )}

        {/* Wishlist Heart Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            isInWishlist
              ? 'text-red-500 bg-white/90 shadow-xs'
              : 'text-[#8E8E93] hover:text-[#1A1A24] hover:bg-white/80 opacity-0 group-hover:opacity-100'
          }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : 'stroke-[1.75]'}`} />
        </button>

        {/* Product Image on blush background */}
        <div
          onClick={() => onQuickView(product)}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-108"
          />
        </div>

        {/* Hover Quick Actions Bar (Quick Add & Quick View) */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-center gap-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 py-2 sm:py-2.5 px-3 bg-white text-[#1A1A24] hover:bg-[#1A1A24] hover:text-white text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
            <span>Quick Add</span>
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="p-2 sm:p-2.5 bg-white text-[#1A1A24] hover:bg-[#1A1A24] hover:text-white shadow-sm transition-colors duration-200 cursor-pointer"
            aria-label="Quick preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Centered Below */}
      <div className="mt-4 text-center w-full px-2">
        <h4
          onClick={() => onQuickView(product)}
          className="text-[13.5px] sm:text-[14px] font-medium text-[#232323] hover:text-[#555] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h4>
        <div className="mt-1 flex items-center justify-center gap-2 text-[13px] font-medium tabular-nums">
          {product.originalPrice && (
            <span className="text-[#999999] line-through text-[12px]">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          <span className="text-[#232323] font-semibold">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};
