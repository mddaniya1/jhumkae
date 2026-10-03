import React from 'react';
import categoryEarrings from '../assets/images/category_earrings_1790970473373.jpg';
import categoryRings from '../assets/images/category_rings_1790970525405.jpg';
import categoryBracelet from '../assets/images/category_bracelet_1790970543095.jpg';
import categoryNecklace from '../assets/images/category_necklace_1790970504036.jpg';

interface CategoryMasonryProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryMasonry: React.FC<CategoryMasonryProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="bg-white py-16 sm:py-20 border-b border-[#F0EFEB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-[32px] sm:text-[36px] font-medium text-[#232323] tracking-tight font-display">
            Shop by categories
          </h2>
          <p className="mt-3 text-[13px] sm:text-[14px] text-[#7A7A7A] leading-relaxed">
            Lorem ipsum dolor amet consectetur adipiscing dictum placerat diam in vestibulum vivamus in eros.
          </p>
        </div>

        {/* 3-Column Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-4.5">
          {/* Column 1: Left Tall Card - Earrings */}
          <div
            onClick={() => onSelectCategory('earrings')}
            className="group relative h-[380px] sm:h-[460px] md:h-[500px] overflow-hidden cursor-pointer bg-neutral-100"
          >
            <img
              src={categoryEarrings}
              alt="Handcrafted Earrings and Jhumkas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
            
            {/* Centered Large Semi-bold Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-white text-2xl sm:text-3xl font-semibold tracking-wide drop-shadow-sm group-hover:tracking-wider transition-all duration-300 font-display">
                Earrings
              </h3>
              <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#FCDCC9] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium">
                View Collection →
              </span>
            </div>
          </div>

          {/* Column 2: Center Stacked Cards - Rings & Bracelet */}
          <div className="flex flex-col gap-4 sm:gap-4.5 h-[380px] sm:h-[460px] md:h-[500px]">
            {/* Top Card: Rings */}
            <div
              onClick={() => onSelectCategory('rings')}
              className="group relative flex-1 overflow-hidden cursor-pointer bg-neutral-100 min-h-[180px]"
            >
              <img
                src={categoryRings}
                alt="22K Gold and Diamond Rings"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white text-2xl sm:text-3xl font-semibold tracking-wide drop-shadow-sm group-hover:tracking-wider transition-all duration-300 font-display">
                  Rings
                </h3>
                <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#FCDCC9] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium">
                  View Collection →
                </span>
              </div>
            </div>

            {/* Bottom Card: Bracelet */}
            <div
              onClick={() => onSelectCategory('bangles')}
              className="group relative flex-1 overflow-hidden cursor-pointer bg-neutral-100 min-h-[180px]"
            >
              <img
                src={categoryBracelet}
                alt="Solid Gold Bangles and Bracelets"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white text-2xl sm:text-3xl font-semibold tracking-wide drop-shadow-sm group-hover:tracking-wider transition-all duration-300 font-display">
                  Bracelet
                </h3>
                <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#FCDCC9] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium">
                  View Collection →
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Right Tall Card - Necklace */}
          <div
            onClick={() => onSelectCategory('necklaces')}
            className="group relative h-[380px] sm:h-[460px] md:h-[500px] overflow-hidden cursor-pointer bg-neutral-100"
          >
            <img
              src={categoryNecklace}
              alt="Layered Gold Necklaces & Pendants"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-white text-2xl sm:text-3xl font-semibold tracking-wide drop-shadow-sm group-hover:tracking-wider transition-all duration-300 font-display">
                Necklace
              </h3>
              <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#FCDCC9] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium">
                View Collection →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
