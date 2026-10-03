import React, { useState } from 'react';
import trendingWeddingModel from '../assets/images/trending_wedding_model_1790970487559.jpg';
import { TRENDING_PRODUCTS, Product, formatCurrency } from '../data/storeData';
import { Heart, Plus } from 'lucide-react';

interface TrendingWeddingBlockProps {
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const TrendingWeddingBlock: React.FC<TrendingWeddingBlockProps> = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [slideOffset, setSlideOffset] = useState(0);

  // 2 products per view
  const totalItems = TRENDING_PRODUCTS.length;
  const maxOffset = Math.max(0, totalItems - 2);

  const handlePrev = () => {
    setSlideOffset((prev) => (prev > 0 ? prev - 1 : maxOffset));
  };

  const handleNext = () => {
    setSlideOffset((prev) => (prev < maxOffset ? prev + 1 : 0));
  };

  const visibleProducts = TRENDING_PRODUCTS.slice(slideOffset, slideOffset + 2);

  return (
    <section id="trending" className="relative bg-white overflow-hidden py-10 sm:py-14 border-b border-[#F0EFEB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        <div className="relative flex flex-col lg:flex-row items-stretch">
          
          {/* Left Block with Peach Strip & Large Model Photo */}
          <div className="relative w-full lg:w-[48%] flex shrink-0 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
            {/* Peach vertical background strip on far left */}
            <div className="absolute top-0 bottom-12 left-0 w-12 sm:w-16 bg-[#FCDCC9] -z-0" />

            {/* Large Portrait Photo of Model */}
            <div className="relative z-10 ml-6 sm:ml-8 w-full max-w-[420px] sm:max-w-[460px] h-[400px] sm:h-[460px] lg:h-[500px] shadow-sm overflow-hidden bg-neutral-200">
              <img
                src={trendingWeddingModel}
                alt="Jhumky Wedding & Bridal Jewellery Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-700"
              />
            </div>

            {/* Bottom Peach Banner with Giant Cropped "wedding collection" text */}
            <div className="absolute -bottom-2 sm:bottom-0 left-0 right-0 sm:right-[-60px] lg:right-[-120px] h-[80px] sm:h-[100px] lg:h-[110px] bg-[#FCDCC9] z-20 flex items-center overflow-hidden pointer-events-none shadow-xs">
              <span className="text-white font-extralight text-[60px] sm:text-[85px] lg:text-[115px] leading-none tracking-tight whitespace-nowrap pl-4 sm:pl-8 select-none opacity-95">
                wedding collection
              </span>
            </div>
          </div>

          {/* Right Block: Warm Light-Grey Panel with Trending Products */}
          <div className="w-full lg:w-[52%] bg-[#F2F0EC] p-8 sm:p-10 lg:p-12 flex flex-col justify-between z-10 mt-12 lg:mt-0 relative">
            {/* Centered Heading */}
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-[26px] sm:text-[30px] font-medium text-[#232323] tracking-tight font-display">
                Trending products
              </h3>
            </div>

            {/* Slider Row with Rotated Left / Right Controls */}
            <div className="relative flex items-center justify-between gap-2 sm:gap-4 my-auto">
              {/* Left Rotated PREV control */}
              <button
                onClick={handlePrev}
                className="p-1 sm:p-2 cursor-pointer focus:outline-hidden hover:opacity-75 transition-opacity shrink-0"
                aria-label="Previous trending products"
              >
                <span className="block transform -rotate-90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#333333] whitespace-nowrap">
                  ← PREV
                </span>
              </button>

              {/* 2-Card Product Slider Container */}
              <div className="flex-1 grid grid-cols-2 gap-4 sm:gap-6">
                {visibleProducts.map((product) => {
                  const isInWishlist = wishlistIds.has(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col items-center bg-transparent transition-all duration-300"
                    >
                      {/* Product Image Card on Clean White / Blush Surface */}
                      <div className="relative w-full aspect-square bg-white flex items-center justify-center p-4 sm:p-6 overflow-hidden shadow-2xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product);
                          }}
                          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                            isInWishlist
                              ? 'text-red-500 bg-white/90 shadow-xs'
                              : 'text-[#8E8E93] hover:text-[#1A1A24] hover:bg-white/80 opacity-0 group-hover:opacity-100'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current' : 'stroke-[1.75]'}`} />
                        </button>

                        <div
                          onClick={() => onQuickView(product)}
                          className="w-full h-full flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
                          />
                        </div>

                        {/* Quick Add Overlay on Hover */}
                        <div className="absolute inset-x-2 bottom-2 z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => onAddToCart(product)}
                            className="w-full py-2 bg-[#1A1A24] text-white hover:bg-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>

                      {/* Product Title and Price Below */}
                      <div className="mt-3.5 text-center px-1">
                        <h4
                          onClick={() => onQuickView(product)}
                          className="text-[13px] sm:text-[14px] font-medium text-[#232323] hover:text-black transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <p className="mt-1 text-[13px] text-[#232323] font-semibold tabular-nums">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Rotated NEXT control */}
              <button
                onClick={handleNext}
                className="p-1 sm:p-2 cursor-pointer focus:outline-hidden hover:opacity-75 transition-opacity shrink-0"
                aria-label="Next trending products"
              >
                <span className="block transform rotate-90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#333333] whitespace-nowrap">
                  NEXT →
                </span>
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: maxOffset + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideOffset(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    slideOffset === idx ? 'w-5 bg-[#1A1A24]' : 'w-1.5 bg-[#C0BEB8]'
                  }`}
                  aria-label={`Trending slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
