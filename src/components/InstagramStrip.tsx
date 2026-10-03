import React from 'react';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_PHOTOS } from '../data/storeData';

interface InstagramStripProps {
  onInstagramClick?: () => void;
}

export const InstagramStrip: React.FC<InstagramStripProps> = ({ onInstagramClick }) => {
  return (
    <section className="relative w-full bg-white overflow-hidden" aria-label="Instagram Gallery">
      {/* Edge-to-Edge Row of 7 Photos with No Gaps */}
      <div className="relative w-full">
        <div className="flex w-full overflow-x-auto no-scrollbar scroll-smooth">
          {INSTAGRAM_PHOTOS.map((item, idx) => (
            <div
              key={item.id}
              className="relative w-[14.285%] min-w-[130px] sm:min-w-[150px] md:min-w-[14.285%] aspect-square shrink-0 overflow-hidden group cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              {/* Subtle hover wash */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Center of the row: White Circular Button with Instagram Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <a
            href="https://instagram.com/jhumky"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (onInstagramClick) {
                e.preventDefault();
                onInstagramClick();
              }
            }}
            className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-white text-[#232323] hover:text-[#E1306C] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-hidden group"
            aria-label="Follow Jhumky on Instagram @jhumky"
          >
            <Instagram className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75] transition-transform group-hover:scale-105" />
          </a>
        </div>
      </div>
    </section>
  );
};
