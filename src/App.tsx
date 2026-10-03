/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { ServiceFeatures } from './components/ServiceFeatures';
import { CategoryMasonry } from './components/CategoryMasonry';
import { ProductTabsGrid } from './components/ProductTabsGrid';
import { TrendingWeddingBlock } from './components/TrendingWeddingBlock';
import { FeaturedProductsRow } from './components/FeaturedProductsRow';
import { NewsletterStrip } from './components/NewsletterStrip';
import { InstagramStrip } from './components/InstagramStrip';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { OffersModal } from './components/OffersModal';
import { AccountModal } from './components/AccountModal';
import { Toast } from './components/Toast';
import { AdminPanel } from './components/admin/AdminPanel';
import {
  NEW_ARRIVALS_PRODUCTS,
  BEST_SELLERS_PRODUCTS,
  SECTION_FEATURED_PRODUCTS,
  TRENDING_PRODUCTS,
  Product,
} from './data/storeData';
import { INITIAL_ORDERS, AdminOrder } from './data/initialAdminData';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  // Admin View State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Products Catalog State (editable via Admin)
  const initialProductsList = useMemo(() => {
    const map = new Map<string, Product>();
    [
      ...NEW_ARRIVALS_PRODUCTS,
      ...BEST_SELLERS_PRODUCTS,
      ...SECTION_FEATURED_PRODUCTS,
      ...TRENDING_PRODUCTS,
    ].forEach((p) => {
      if (!map.has(p.id)) {
        map.set(p.id, p);
      }
    });
    return Array.from(map.values());
  }, []);

  const [products, setProducts] = useState<Product[]>(initialProductsList);

  // Orders State (editable via Admin)
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0] || NEW_ARRIVALS_PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['p3', 'bs2'])
  );
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals & Navigation state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<'profile' | 'tracker'>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenAccount = (tab: 'profile' | 'tracker' = 'profile') => {
    setAccountInitialTab(tab);
    setIsAccountOpen(true);
  };

  const handleOpenOrderTracking = () => {
    setAccountInitialTab('tracker');
    setIsAccountOpen(true);
  };

  // Look up all products for wishlist retrieval
  const allProductsMap = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((p) => map.set(p.id, p));
    return map;
  }, [products]);

  const wishlistProducts = useMemo(() => {
    return Array.from(wishlistIds)
      .map((id) => allProductsMap.get(id))
      .filter((p): p is Product => !!p);
  }, [wishlistIds, allProductsMap]);

  // Handlers for Storefront
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setToastMessage(`Added "${product.name}" to your shopping bag.`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        setToastMessage(`Removed "${product.name}" from wishlist.`);
      } else {
        next.add(product.id);
        setToastMessage(`Saved "${product.name}" to your wishlist.`);
      }
      return next;
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    handleNavigateSection('products-tabs');
    setToastMessage(`Showing collection for ${categoryName}`);
  };

  const handleCheckout = () => {
    const randomOrderNum = `JK-${Math.floor(9300 + Math.random() * 500)}`;
    const totalOrderAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newOrder: AdminOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: randomOrderNum,
      customerName: 'Ali Hussain',
      customerEmail: 'alihussain42234223@gmail.com',
      customerPhone: '+92 300 1234567',
      city: 'Karachi',
      address: 'House 42, Street 7, Phase 5, D.H.A',
      items: cartItems.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        image: c.product.image,
        price: c.product.price,
        quantity: c.quantity,
        karat: '22K Solid Gold',
      })),
      totalAmount: totalOrderAmount,
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      shippingStatus: 'processing',
      courierName: 'TCS Overnight Express',
      trackingNumber: `TCS-PK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      orderDate: 'Just now',
      estimatedDelivery: 'Oct 5, 2026',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    setToastMessage(`Order #${randomOrderNum} placed successfully! View in Order Tracker or Admin.`);
  };

  // Handlers for Admin Operations
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setToastMessage(`Published "${newProduct.name}" to storefront catalog.`);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setToastMessage(`Updated "${updatedProduct.name}" in catalog.`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setToastMessage('Removed piece from storefront catalog.');
  };

  const handleUpdateOrder = (updatedOrder: AdminOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
    setToastMessage(`Consignment #${updatedOrder.orderNumber} status updated to ${updatedOrder.shippingStatus}.`);
  };

  // If Admin Panel is open, render full-screen Admin workspace
  if (isAdminOpen) {
    return (
      <AdminPanel
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        orders={orders}
        onUpdateOrder={handleUpdateOrder}
      />
    );
  }

  // Otherwise render Storefront
  return (
    <div className="min-h-screen bg-[#1A1A24] flex justify-center selection:bg-[#FCDCC9] selection:text-[#232323]">
      {/* Container Frame with ~1200px max width */}
      <div className="w-full max-w-[1240px] bg-white shadow-2xl relative min-h-screen flex flex-col">
        {/* 1. Top Announcement Bar with Admin Portal link */}
        <TopBar
          onOpenOffers={() => setIsOffersOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 2. Navbar */}
        <Navbar
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlistIds.size}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAccount={() => handleOpenAccount('profile')}
          onOpenOrderTracking={handleOpenOrderTracking}
          onNavigateSection={handleNavigateSection}
        />

        <main className="flex-1">
          {/* 3. Hero (Split Slider) */}
          <HeroSlider
            onShopCollection={() => handleNavigateSection('products-tabs')}
          />

          {/* 4. Service Features Strip */}
          <ServiceFeatures />

          {/* 5. Shop by Categories (Masonry Grid) */}
          <CategoryMasonry onSelectCategory={handleSelectCategory} />

          {/* 6. Product Tabs Grid (Synchronized with Admin Catalog) */}
          <ProductTabsGrid
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            allProducts={products}
          />

          {/* 7. Wedding Collection / Trending Block */}
          <TrendingWeddingBlock
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* 8. Featured Products Row */}
          <FeaturedProductsRow
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* 9. Newsletter Strip */}
          <NewsletterStrip
            onSubscribed={(_email) => {
              setToastMessage('20% coupon code JHUMKY20 activated!');
            }}
          />

          {/* 10. Instagram Strip */}
          <InstagramStrip
            onInstagramClick={() => {
              setToastMessage('Follow @jhumky on Instagram for daily looks!');
            }}
          />
        </main>

        {/* 11. Footer with Admin Portal link */}
        <Footer
          onNavigateSection={handleNavigateSection}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={() => handleOpenAccount('profile')}
          onOpenOrderTracking={handleOpenOrderTracking}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Floating Admin Button for easy access */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-[#1A1A24] text-white hover:bg-black px-4 py-2.5 rounded-full shadow-2xl border border-[#3A3A4A] text-xs font-semibold flex items-center gap-2 group transition-all duration-300 hover:scale-105 cursor-pointer"
          title="Open Atelier Admin Console"
        >
          <span className="w-2 h-2 rounded-full bg-[#2BB673] animate-pulse" />
          <span className="font-display">Admin Panel</span>
          <ShieldCheck className="w-3.5 h-3.5 text-[#FCDCC9] group-hover:rotate-12 transition-transform" />
        </button>

        {/* Drawers & Modals */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          onRemoveFromWishlist={(id) => {
            setWishlistIds((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            });
          }}
          onMoveToCart={handleMoveWishlistToCart}
        />

        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          isInWishlist={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          products={products}
        />

        <OffersModal
          isOpen={isOffersOpen}
          onClose={() => setIsOffersOpen(false)}
          onCodeCopied={() => setToastMessage('Discount code JHUMKY20 copied to clipboard!')}
        />

        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          initialTab={accountInitialTab}
          adminOrders={orders}
        />

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </div>
  );
}
