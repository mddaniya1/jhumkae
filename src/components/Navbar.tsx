import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, User, Truck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenOrderTracking?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenOrderTracking,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Shop', target: 'products-tabs' },
    { label: 'Categories', target: 'categories' },
    { label: 'Pages', target: 'trending' },
    { label: 'Blog', target: 'featured' },
    { label: 'Contact', target: 'footer' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-200 border-b ${
          isScrolled ? 'border-[#EAEAEA] shadow-xs py-3' : 'border-[#F0EFEB] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 items-center">
            {/* Zone 1: Left Menu Links (Desktop) / Mobile Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 -ml-1 text-[#232323] hover:text-black focus:outline-hidden"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>

              <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13px] font-medium text-[#4A4A4A]">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => onNavigateSection(link.target)}
                    className="relative py-1 hover:text-[#111116] transition-colors cursor-pointer group"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#111116] transition-all duration-200 group-hover:w-full" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Zone 2: Center Logo with peach circle highlight behind first letter */}
            <div className="flex justify-center">
              <button
                onClick={() => onNavigateSection('hero')}
                className="group inline-flex items-center cursor-pointer focus:outline-hidden"
                aria-label="Jhumky Jewellery Home"
              >
                <div className="relative flex items-center justify-center">
                  {/* Peach circle highlight behind the 'J' */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-1.5 -top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FCDCC9] transition-transform duration-300 group-hover:scale-110 -z-0"
                  />
                  <span className="relative z-10 text-[26px] sm:text-[30px] font-medium tracking-tight text-[#1A1A24] font-display">
                    Jhumky
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 3: Right Actions (Wishlist, My Account, Search, Cart) */}
            <div className="flex items-center justify-end gap-3 sm:gap-5 text-[13px] font-medium text-[#4A4A4A]">
              <button
                onClick={onOpenWishlist}
                className="hidden md:inline-flex items-center gap-1.5 hover:text-[#111116] transition-colors cursor-pointer"
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="text-[11px] font-semibold text-[#111116] bg-[#FCDCC9] px-1.5 py-0.2 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenAccount}
                className="hidden md:inline-flex items-center gap-1 hover:text-[#111116] transition-colors cursor-pointer"
              >
                <span>My account</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={onOpenWishlist}
                  className="md:hidden p-1.5 text-[#232323] hover:text-black relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5 stroke-[1.5]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#111116] text-[#FCDCC9] text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={onOpenSearch}
                  className="p-1.5 text-[#232323] hover:text-black transition-colors cursor-pointer"
                  aria-label="Search collection"
                >
                  <Search className="w-5 h-5 stroke-[1.75]" />
                </button>

                <button
                  onClick={onOpenCart}
                  className="p-1.5 text-[#232323] hover:text-black relative transition-colors cursor-pointer flex items-center"
                  aria-label="Shopping bag"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-[#1A1A24] text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#F0EFEB]">
                <div className="relative inline-flex items-center">
                  <span className="absolute -left-1 w-7 h-7 rounded-full bg-[#FCDCC9] -z-0" />
                  <span className="relative z-10 text-2xl font-medium tracking-tight text-[#1A1A24]">
                    Jhumky
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#4A4A4A] hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      onNavigateSection(link.target);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-base font-medium text-[#232323] hover:text-[#111116] py-1 border-b border-neutral-100"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-4 border-t border-neutral-100 space-y-3 text-sm">
                <button
                  onClick={() => {
                    onOpenWishlist();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full text-left py-2 text-[#4A4A4A]"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Wishlist
                  </span>
                  <span className="bg-[#FCDCC9] text-xs font-semibold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onOpenAccount();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left py-2 text-[#4A4A4A]"
                >
                  <User className="w-4 h-4" /> My account
                </button>

                <button
                  onClick={() => {
                    if (onOpenOrderTracking) onOpenOrderTracking();
                    else onOpenAccount();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left py-2 text-[#4A4A4A]"
                >
                  <Truck className="w-4 h-4" /> Track order
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 text-xs text-[#7A7A7A]">
              <p>Handcrafted luxury jewellery in 22K gold & diamonds.</p>
              <p className="mt-1 font-medium text-[#232323]">info@jhumky.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
