import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import {
  NEW_ARRIVALS_PRODUCTS,
  BEST_SELLERS_PRODUCTS,
  SECTION_FEATURED_PRODUCTS,
  TRENDING_PRODUCTS,
  Product,
  formatCurrency,
} from '../data/storeData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  products?: Product[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  products,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Combine and deduplicate all products
  const allProducts = useMemo(() => {
    if (products && products.length > 0) {
      return products;
    }
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
  }, [products]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [allProducts, query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white max-w-2xl w-full rounded-xs shadow-2xl z-10 overflow-hidden my-4">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#F0EFEB] flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bangles, rings, jhumkas, necklaces..."
            autoFocus
            className="w-full text-base sm:text-lg text-[#232323] placeholder-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black ml-1 text-xs uppercase font-bold"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 bg-[#FAF9F7] border-b border-[#F0EFEB] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['all', 'bangles', 'rings', 'earrings', 'necklaces'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors capitalize shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1A1A24] text-white'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All Collections' : cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-6 max-h-[420px] overflow-y-auto space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 text-sm">
              No jewellery matching &quot;{query}&quot; found.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 hover:bg-[#FAF9F7] transition-colors border border-neutral-100 rounded-xs group cursor-pointer"
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#FEF8F5] p-1.5 shrink-0 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#232323] group-hover:text-black">
                      {p.name}
                    </h4>
                    <p className="text-xs text-neutral-500 capitalize">{p.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#1A1A24] tabular-nums">
                    {formatCurrency(p.price)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p);
                    }}
                    className="p-2 bg-[#1A1A24] text-white hover:bg-black text-[10px] uppercase font-bold tracking-wider rounded-xs flex items-center gap-1 shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
