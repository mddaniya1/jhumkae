import React, { useState, useEffect, useCallback } from 'react';
import { HERO_SLIDES, HeroSlide } from '../data/storeData';

interface HeroSliderProps {
  onShopCollection: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopCollection }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = HERO_SLIDES;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlideIndex((index + slides.length) % slides.length);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 450);
  }, [isTransitioning, slides.length]);

  const handleNext = useCallback(() => {
    goToSlide(currentSlideIndex + 1);
  }, [goToSlide, currentSlideIndex]);

  const handlePrev = useCallback(() => {
    goToSlide(currentSlideIndex - 1);
  }, [goToSlide, currentSlideIndex]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, 6500);
    return () => clearInterval(interval);
  }, [goToSlide, currentSlideIndex, isPaused]);

  const currentSlide: HeroSlide = slides[currentSlideIndex];

  return (
    <section
      id="hero"
      aria-label="Hero Collection Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-white overflow-hidden select-none"
    >
      <div className="flex flex-col lg:flex-row min-h-[560px] lg:h-[600px] w-full">
        {/* Left Half: Lifestyle Photo with Overlapping NEW ARRIVAL text */}
        <div className="relative w-full lg:w-1/2 h-[380px] sm:h-[460px] lg:h-full overflow-hidden bg-neutral-900 group">
          <div
            className={`w-full h-full transition-transform duration-700 ease-out ${
              isTransitioning ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
            }`}
          >
            <img
              src={currentSlide.leftImage}
              alt="Jhumky Jewellery New Arrival Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-1000"
            />
          </div>

          {/* Subtle contrast gradient for editorial legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent pointer-events-none" />

          {/* Huge White Uppercase Text Overlay "NEW ARRIVAL" */}
          <div className="absolute inset-x-8 sm:inset-x-12 bottom-12 sm:bottom-16 lg:bottom-20 z-10">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#FCDCC9] uppercase mb-2">
              {currentSlide.leftSubtitle}
            </p>
            <h1 className="text-white font-extrabold text-[44px] sm:text-[62px] md:text-[70px] lg:text-[74px] leading-[0.92] tracking-tight font-display drop-shadow-xs">
              <span className="block">{currentSlide.leftTitleLine1}</span>
              <span className="block">{currentSlide.leftTitleLine2}</span>
            </h1>
          </div>
        </div>

        {/* Right Half: Solid Peach background with Tall Portrait Bangle + Overlapping Button */}
        <div className="relative w-full lg:w-1/2 flex bg-[#FCDCC9] min-h-[460px] lg:min-h-full">
          {/* Main Peach Content Zone */}
          <div className="flex-1 flex flex-col items-center justify-between pt-10 sm:pt-12 pb-10 sm:pb-12 px-6 sm:px-10">
            {/* Top Center: Letter-Spaced Uppercase Label */}
            <div className="text-center">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#232323] uppercase">
                {currentSlide.rightLabel}
              </span>
            </div>

            {/* Tall Portrait Image with overlapping white rectangular button */}
            <div className="relative my-auto flex flex-col items-center">
              <div className="w-[200px] sm:w-[240px] md:w-[260px] h-[270px] sm:h-[320px] md:h-[340px] shadow-sm overflow-hidden bg-white/40">
                <img
                  src={currentSlide.rightImage}
                  alt={currentSlide.rightLabel}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105 ${
                    isTransitioning ? 'opacity-80 scale-102' : 'opacity-100 scale-100'
                  }`}
                />
              </div>

              {/* White rectangular "SHOP THIS COLLECTION" button overlapping bottom edge */}
              <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                <button
                  onClick={onShopCollection}
                  className="px-6 sm:px-8 py-3.5 bg-white text-[#232323] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#1A1A24] hover:text-white transition-colors duration-200 shadow-md cursor-pointer border border-transparent"
                >
                  {currentSlide.rightCta}
                </button>
              </div>
            </div>

            {/* Slide Indicators for mobile/tablet */}
            <div className="flex items-center gap-2 pt-6 lg:hidden">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentSlideIndex === idx ? 'w-6 bg-[#1A1A24]' : 'w-2 bg-neutral-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Far Right Edge: Narrow Vertical Strip with rotated NEXT / PREV */}
          <div className="w-10 sm:w-12 bg-[#FBD5C0] border-l border-[#F0C5AE] flex flex-col justify-between items-center py-8 z-10 shrink-0">
            {/* NEXT control at top */}
            <button
              onClick={handleNext}
              className="group p-2 cursor-pointer focus:outline-hidden"
              aria-label="Next slide"
            >
              <span className="block transform rotate-90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#333333] group-hover:text-black transition-colors">
                NEXT
              </span>
            </button>

            {/* Slide Index Counter */}
            <div className="flex flex-col items-center text-[10px] font-mono tabular-nums text-[#666666] select-none my-auto">
              <span className="font-semibold text-[#1A1A24]">0{currentSlideIndex + 1}</span>
              <span className="w-3 h-px bg-[#D9A588] my-1" />
              <span>0{slides.length}</span>
            </div>

            {/* PREV control at bottom */}
            <button
              onClick={handlePrev}
              className="group p-2 cursor-pointer focus:outline-hidden"
              aria-label="Previous slide"
            >
              <span className="block transform rotate-90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#333333] group-hover:text-black transition-colors">
                PREV
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
