import React, { useState } from 'react';
import { X, User, Package, MapPin, Shield, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { OrderTracker } from './OrderTracker';
import { AdminOrder } from '../data/initialAdminData';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWishlist: () => void;
  initialTab?: 'profile' | 'tracker';
  adminOrders?: AdminOrder[];
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenWishlist,
  initialTab = 'profile',
  adminOrders = [],
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'tracker'>(initialTab);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('JK-9042');

  // Reset tab when modal opens with specific initialTab
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white max-w-xl w-full rounded-xs shadow-2xl z-10 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#FEF8F5] border border-[#FCDCC9] flex items-center justify-center text-[#1A1A24] shrink-0">
              <User className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[#1A1A24] font-display">
                  Ali Hussain
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FCDCC9] text-[#1A1A24] px-2 py-0.5 rounded-full">
                  Gold Patron
                </span>
              </div>
              <p className="text-xs text-[#7A7A7A]">alihussain42234223@gmail.com</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors rounded-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-200 bg-[#FAF9F7] px-6 shrink-0">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tracker'
                ? 'border-[#1A1A24] text-[#1A1A24]'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#1A1A24] text-[#1A1A24]'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Profile & Orders</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'tracker' ? (
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-[#1A1A24] font-display">
                  Live Consignment & Shipment Tracker
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Input your Jhumky order number to follow courier dispatch and hand-delivery in real-time.
                </p>
              </div>

              <OrderTracker
                initialOrderId={selectedOrderId}
                adminOrders={adminOrders}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Active Recent Order with Direct Track Action */}
              <div className="p-4 bg-[#FAF9F7] border border-neutral-200 rounded-xs">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-200/60">
                  <span className="font-bold text-[#1A1A24] flex items-center gap-1.5 font-mono">
                    <Package className="w-4 h-4 text-[#1A1A24]" /> Order #JK-9042
                  </span>
                  <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-xs font-semibold flex items-center gap-1 text-[11px] border border-amber-200">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" /> In Transit
                  </span>
                </div>
                <div className="pt-2 text-xs text-[#555555]">
                  <p className="font-medium text-[#1A1A24]">
                    Bespoke twister bangle (22K Solid Gold)
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Shipped via TCS Express (Tracking: TCS-PK-9812401)
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    Estimated arrival: Tomorrow, Oct 3 by 2:00 PM
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedOrderId('JK-9042');
                    setActiveTab('tracker');
                  }}
                  className="mt-3.5 w-full py-2 bg-[#1A1A24] text-white hover:bg-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>View Live Shipping Tracker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Order History Summary */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Past Orders
                </h5>
                <div className="border border-neutral-100 rounded-xs divide-y divide-neutral-100 text-xs">
                  <div
                    onClick={() => {
                      setSelectedOrderId('JK-7740');
                      setActiveTab('tracker');
                    }}
                    className="p-3 flex items-center justify-between hover:bg-[#FAF9F7] cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-mono font-semibold text-[#1A1A24]">#JK-7740</span>
                      <span className="text-neutral-400 ml-2">Sep 25, 2026</span>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Syndria huggie earrings · Delivered
                      </p>
                    </div>
                    <span className="text-emerald-700 font-medium text-[11px]">
                      View Status →
                    </span>
                  </div>
                </div>
              </div>

              {/* Saved Delivery Address */}
              <div className="flex items-start gap-3 p-3.5 border border-neutral-200/80 rounded-xs text-xs text-[#555555] bg-white">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold text-[#1A1A24] block">Default Shipping Address:</span>
                  <span className="text-neutral-600">
                    House 42, Street 7, Phase 5, D.H.A, Karachi, Pakistan
                  </span>
                  <span className="block text-[11px] text-neutral-400 mt-0.5">
                    Phone: +92 300 1234567
                  </span>
                </div>
              </div>

              {/* Hallmarking Trust Badge */}
              <div className="flex items-start gap-3 p-3.5 border border-neutral-200/80 rounded-xs text-xs text-[#555555] bg-[#FEF8F5]">
                <Shield className="w-4 h-4 text-[#2BB673] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold text-[#1A1A24] block">
                    Gold Purity & Lifetime Guarantee
                  </span>
                  <span className="text-neutral-600 text-[11px] leading-relaxed">
                    Every piece purchased with this account is backed by certified hallmarking and our lifetime exchange/buyback policy.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 px-6 bg-[#FAF9F7] border-t border-neutral-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenWishlist();
            }}
            className="text-xs font-semibold text-neutral-600 hover:text-black underline underline-offset-4"
          >
            Saved Wishlist Items
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1A1A24] text-white hover:bg-black text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
