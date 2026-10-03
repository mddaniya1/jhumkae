import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import {
  NEW_ARRIVALS_PRODUCTS,
  BEST_SELLERS_PRODUCTS,
  FEATURED_PRODUCTS_TAB,
  Product,
} from '../data/storeData';

interface ProductTabsGridProps {
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  allProducts?: Product[];
}

type TabType = 'new-arrivals' | 'best-sellers' | 'featured';

export const ProductTabsGrid: React.FC<ProductTabsGridProps> = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  allProducts,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('new-arrivals');
  const [isFading, setIsFading] = useState(false);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsFading(false);
    }, 180);
  };

  const getActiveProducts = (): Product[] => {
    if (allProducts && allProducts.length > 0) {
      if (activeTab === 'new-arrivals') {
        return allProducts.slice(0, 8);
      }
      if (activeTab === 'best-sellers') {
        return allProducts.filter((p) => p.isSale || p.price > 24000).slice(0, 8);
      }
      if (activeTab === 'featured') {
        return allProducts.slice().reverse().slice(0, 8);
      }
    }

    switch (activeTab) {
      case 'new-arrivals':
        return NEW_ARRIVALS_PRODUCTS;
      case 'best-sellers':
        return BEST_SELLERS_PRODUCTS;
      case 'featured':
        return FEATURED_PRODUCTS_TAB;
      default:
        return NEW_ARRIVALS_PRODUCTS;
    }
  };

  const products = getActiveProducts();

  return (
    <section id="products-tabs" className="bg-white py-16 sm:py-20 border-b border-[#F0EFEB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Centered Tab Menu */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mb-12 sm:mb-14">
          <button
            onClick={() => handleTabChange('new-arrivals')}
            className={`relative pb-2 text-[15px] sm:text-[16px] font-medium transition-colors cursor-pointer ${
              activeTab === 'new-arrivals' ? 'text-[#1A1A24]' : 'text-[#7A7A7A] hover:text-[#1A1A24]'
            }`}
          >
            <span>New arrivals</span>
            {activeTab === 'new-arrivals' && (
              <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#1A1A24] transition-all" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('best-sellers')}
            className={`relative pb-2 text-[15px] sm:text-[16px] font-medium transition-colors cursor-pointer ${
              activeTab === 'best-sellers' ? 'text-[#1A1A24]' : 'text-[#7A7A7A] hover:text-[#1A1A24]'
            }`}
          >
            <span>Best sellers</span>
            {activeTab === 'best-sellers' && (
              <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#1A1A24] transition-all" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('featured')}
            className={`relative pb-2 text-[15px] sm:text-[16px] font-medium transition-colors cursor-pointer ${
              activeTab === 'featured' ? 'text-[#1A1A24]' : 'text-[#7A7A7A] hover:text-[#1A1A24]'
            }`}
          >
            <span>Featured products</span>
            {activeTab === 'featured' && (
              <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#1A1A24] transition-all" />
            )}
          </button>
        </div>

        {/* 4-column x 2-row Product Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 transition-opacity duration-200 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {products.map((product) => (
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
