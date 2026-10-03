import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image, Check } from 'lucide-react';
import { Product } from '../../data/storeData';
import { AVAILABLE_IMAGE_PRESETS } from '../../data/initialAdminData';

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
  initialProduct?: Product | null;
}

export const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'bangles' | 'rings' | 'earrings' | 'necklaces'>('bangles');
  const [price, setPrice] = useState<number>(25000);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [isSale, setIsSale] = useState(false);
  const [image, setImage] = useState(AVAILABLE_IMAGE_PRESETS[0].value);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setOriginalPrice(initialProduct.originalPrice);
      setIsSale(!!initialProduct.isSale);
      setImage(initialProduct.image);
      setDescription(initialProduct.description || '');
      setInStock(initialProduct.inStock !== false);
    } else {
      setName('');
      setCategory('bangles');
      setPrice(25000);
      setOriginalPrice(undefined);
      setIsSale(false);
      setImage(AVAILABLE_IMAGE_PRESETS[0].value);
      setCustomImageUrl('');
      setDescription('');
      setInStock(true);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: initialProduct?.id,
      name: name.trim(),
      category,
      price: Number(price),
      originalPrice: isSale && originalPrice ? Number(originalPrice) : undefined,
      isSale,
      image: customImageUrl.trim() ? customImageUrl.trim() : image,
      description: description.trim(),
      inStock,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white max-w-xl w-full rounded-xs shadow-2xl z-10 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C49A45]" />
            <h3 className="text-base font-semibold text-[#1A1A24] font-display">
              {initialProduct ? 'Edit Handcrafted Piece' : 'Add New Jewellery to Atelier'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Piece Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mughal Nizam Jhumka"
              className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs sm:text-sm text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs sm:text-sm text-[#232323] focus:border-[#1A1A24] focus:outline-hidden bg-white"
              >
                <option value="bangles">Bangles & Bracelets</option>
                <option value="rings">Rings & Bands</option>
                <option value="earrings">Earrings & Jhumkas</option>
                <option value="necklaces">Necklaces & Pendants</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Selling Price (PKR Rs.) *
              </label>
              <input
                type="number"
                required
                min={1000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs sm:text-sm font-semibold tabular-nums text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Sale Toggle & Original Price */}
          <div className="p-3 bg-[#FAF9F7] border border-neutral-200 rounded-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#1A1A24] block">Mark as Promotional Sale</span>
                <span className="text-neutral-500 text-[11px]">
                  Displays green SALE badge and struck-through original price on storefront
                </span>
              </div>
              <input
                type="checkbox"
                checked={isSale}
                onChange={(e) => setIsSale(e.target.checked)}
                className="w-4 h-4 accent-[#1A1A24] cursor-pointer"
              />
            </div>

            {isSale && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Original Regular Price (PKR Rs.)
                </label>
                <input
                  type="number"
                  min={price}
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  placeholder="e.g. 35000"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs sm:text-sm tabular-nums text-[#232323] bg-white focus:outline-hidden"
                />
              </div>
            )}
          </div>

          {/* Image Selection Presets */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1 flex items-center justify-between">
              <span>Select High-Resolution Photograph</span>
              <span className="text-neutral-400 font-normal">8 Atelier Presets</span>
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {AVAILABLE_IMAGE_PRESETS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setImage(preset.value);
                    setCustomImageUrl('');
                  }}
                  className={`relative aspect-square p-1 border rounded-xs flex items-center justify-center bg-[#FEF8F5] transition-all cursor-pointer ${
                    image === preset.value && !customImageUrl
                      ? 'border-[#1A1A24] ring-2 ring-neutral-400'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                  title={preset.label}
                >
                  <img
                    src={preset.value}
                    alt={preset.label}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                  {image === preset.value && !customImageUrl && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#1A1A24] text-white rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-2">
              <label className="block text-[11px] text-neutral-500 mb-1">
                Or enter custom image URL:
              </label>
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-1.5 border border-neutral-300 rounded-xs text-xs text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Jewellery Description & Atelier Craftsmanship Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Handcrafted in 22K yellow solid gold with intricate filigree details..."
              className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs text-[#232323] focus:border-[#1A1A24] focus:outline-hidden resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xs">
            <div>
              <span className="font-semibold text-[#1A1A24] block">In Stock Status</span>
              <span className="text-neutral-500 text-[11px]">
                Available for immediate shipping from vault
              </span>
            </div>
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 accent-[#1A1A24] cursor-pointer"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1A1A24] text-white hover:bg-black text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              {initialProduct ? 'Save Changes' : 'Publish to Storefront'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
