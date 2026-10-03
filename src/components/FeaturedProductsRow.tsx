import React from 'react';
import { ProductCard } from './ProductCard';
import { SECTION_FEATURED_PRODUCTS, Product } from '../data/storeData';

interface FeaturedProductsRowProps {
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FeaturedProductsRow: React.FC<FeaturedProductsRowProps> = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <section id="featured" className="bg-white py-16 sm:py-20 border-b border-[#F0EFEB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-[32px] sm:text-[36px] font-medium text-[#232323] tracking-tight font-display">
            Featured products
          </h2>
          <p className="mt-3 text-[13px] sm:text-[14px] text-[#7A7A7A] leading-relaxed">
            Lorem ipsum dolor amet consectetur adipiscing dictum placerat diam in vestibulum vivamus in eros.
          </p>
        </div>

        {/* 4-column single-row grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {SECTION_FEATURED_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
