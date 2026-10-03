import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { FOOTER_DATA } from '../data/storeData';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenWishlist?: () => void;
  onOpenCart?: () => void;
  onOpenAccount?: () => void;
  onOpenOrderTracking?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenWishlist,
  onOpenCart,
  onOpenAccount,
  onOpenOrderTracking,
  onOpenAdmin,
}) => {
  return (
    <footer id="footer" className="bg-gradient-to-b from-[#FEF8F5] via-[#FDF3ED] to-[#FCE8DC] text-[#333333] pt-16 sm:pt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#EBDCD3]">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="flex flex-col items-start space-y-4 lg:col-span-1">
            {/* Logo with peach circle highlight */}
            <div className="relative inline-flex items-center">
              <span
                aria-hidden="true"
                className="absolute -left-1.5 -top-1 w-7 h-7 rounded-full bg-[#FCDCC9] -z-0"
              />
              <span className="relative z-10 text-[24px] font-medium tracking-tight text-[#1A1A24] font-display">
                Jhumky
              </span>
            </div>

            <p className="text-[13px] text-[#666666] leading-relaxed pt-1">
              {FOOTER_DATA.brandDescription}
            </p>

            <div className="space-y-2 pt-2 text-[13px] text-[#444444]">
              <a
                href={`tel:${FOOTER_DATA.phone}`}
                className="flex items-center gap-2.5 hover:text-black transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1A1A24] shrink-0" />
                <span>{FOOTER_DATA.phone}</span>
              </a>

              <a
                href={`mailto:${FOOTER_DATA.email}`}
                className="flex items-center gap-2.5 hover:text-black transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#1A1A24] shrink-0" />
                <span>{FOOTER_DATA.email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-[14px] font-bold text-[#1A1A24] tracking-wide mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#666666]">
              {FOOTER_DATA.categories.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigateSection && onNavigateSection('categories')}
                    className="hover:text-black transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <h4 className="text-[14px] font-bold text-[#1A1A24] tracking-wide mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#666666]">
              <li>
                <button onClick={onOpenAccount} className="hover:text-black transition-colors">
                  My profile
                </button>
              </li>
              <li>
                <button onClick={onOpenAccount} className="hover:text-black transition-colors">
                  My order history
                </button>
              </li>
              <li>
                <button onClick={onOpenWishlist} className="hover:text-black transition-colors">
                  My wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOrderTracking || onOpenAccount}
                  className="hover:text-black transition-colors"
                >
                  Order tracking
                </button>
              </li>
              <li>
                <button onClick={onOpenCart} className="hover:text-black transition-colors">
                  Shopping cart
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-[#C49A45] font-semibold text-[#1A1A24] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2BB673]" />
                    <span>Admin Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Information */}
          <div>
            <h4 className="text-[14px] font-bold text-[#1A1A24] tracking-wide mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#666666]">
              {FOOTER_DATA.information.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigateSection && onNavigateSection('hero')}
                    className="hover:text-black transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect with us & Secure payment */}
          <div>
            <h4 className="text-[14px] font-bold text-[#1A1A24] tracking-wide mb-4">
              Connect with us
            </h4>

            {/* 4 Round Outlined Social Icons */}
            <div className="flex items-center gap-2 mb-6">
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#D5C2B6] flex items-center justify-center text-[#4A4A4A] hover:text-black hover:border-black hover:bg-white/60 transition-all text-xs font-semibold"
              >
                f
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/jhumky"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#D5C2B6] flex items-center justify-center text-[#4A4A4A] hover:text-black hover:border-black hover:bg-white/60 transition-all text-xs font-semibold"
              >
                ig
              </a>
              {/* X */}
              <a
                href="#x"
                aria-label="X (formerly Twitter)"
                className="w-8 h-8 rounded-full border border-[#D5C2B6] flex items-center justify-center text-[#4A4A4A] hover:text-black hover:border-black hover:bg-white/60 transition-all text-xs font-semibold"
              >
                𝕏
              </a>
              {/* Dribbble */}
              <a
                href="#dribbble"
                aria-label="Dribbble"
                className="w-8 h-8 rounded-full border border-[#D5C2B6] flex items-center justify-center text-[#4A4A4A] hover:text-black hover:border-black hover:bg-white/60 transition-all text-xs font-semibold"
              >
                dr
              </a>
            </div>

            {/* Secure Payment Label & Icons */}
            <div className="space-y-2">
              <span className="text-[12px] font-semibold text-[#1A1A24] uppercase tracking-wider block">
                Secure payment
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Clean Payment Badges */}
                <div className="px-2 py-1 bg-white border border-[#E0D0C6] text-[10px] font-bold text-[#1A1A24] rounded-xs shadow-2xs">
                  VISA
                </div>
                <div className="px-2 py-1 bg-white border border-[#E0D0C6] text-[10px] font-bold text-[#EB001B] rounded-xs shadow-2xs">
                  MC
                </div>
                <div className="px-2 py-1 bg-white border border-[#E0D0C6] text-[10px] font-bold text-[#006FCF] rounded-xs shadow-2xs">
                  AMEX
                </div>
                <div className="px-2 py-1 bg-white border border-[#E0D0C6] text-[10px] font-bold text-[#FF6000] rounded-xs shadow-2xs">
                  DISC
                </div>
                <div className="px-2 py-1 bg-white border border-[#E0D0C6] text-[10px] font-bold text-[#004A97] rounded-xs shadow-2xs">
                  DINERS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#7A7A7A]">
          <div>
            <span>{FOOTER_DATA.copyright}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-black transition-colors">
              {FOOTER_DATA.termsLink}
            </a>
            <a href="#privacy" className="hover:text-black transition-colors">
              {FOOTER_DATA.privacyLink}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
