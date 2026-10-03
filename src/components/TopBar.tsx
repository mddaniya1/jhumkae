import React from 'react';
import { Tag } from 'lucide-react';

interface TopBarProps {
  onOpenOffers: () => void;
  onOpenAdmin?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenOffers, onOpenAdmin }) => {
  return (
    <div className="bg-[#111116] text-[#F3F3F5] text-[11px] sm:text-xs py-2.5 px-4 tracking-wider transition-colors border-b border-[#23232C]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-center text-center gap-2 font-medium flex-wrap relative">
        <span className="text-[#E2E2E6]">
          FREE SHIPPING ON ALL ORDERS RS. 5,000, DON&apos;T MISS DISCOUNT.
        </span>
        <button
          onClick={onOpenOffers}
          className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 hover:text-[#FCDCC9] transition-colors cursor-pointer font-semibold ml-1 group"
        >
          <Tag className="w-3 h-3 text-[#FCDCC9] group-hover:rotate-12 transition-transform" />
          <span>GET OFFERS</span>
        </button>

        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="sm:absolute sm:right-0 text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#A4A4B4] hover:text-[#FCDCC9] transition-colors cursor-pointer flex items-center gap-1 py-0.5 px-2 rounded-xs border border-[#2D2D3A] bg-[#1A1A24]"
            title="Open Atelier Admin Console"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2BB673]" />
            <span>Admin Portal</span>
          </button>
        )}
      </div>
    </div>
  );
};
