import React, { useState, useEffect } from 'react';
import { X, Truck, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { AdminOrder } from '../../data/initialAdminData';
import { formatCurrency } from '../../data/storeData';

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: AdminOrder | null;
  onSave: (updatedOrder: AdminOrder) => void;
}

export const EditOrderModal: React.FC<EditOrderModalProps> = ({
  isOpen,
  onClose,
  order,
  onSave,
}) => {
  const [shippingStatus, setShippingStatus] = useState<AdminOrder['shippingStatus']>('processing');
  const [courierName, setCourierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    if (order) {
      setShippingStatus(order.shippingStatus);
      setCourierName(order.courierName);
      setTrackingNumber(order.trackingNumber);
      setEstimatedDelivery(order.estimatedDelivery);
    }
  }, [order, isOpen]);

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...order,
      shippingStatus,
      courierName,
      trackingNumber,
      estimatedDelivery,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white max-w-lg w-full rounded-xs shadow-2xl z-10 overflow-hidden my-6">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#1A1A24]" />
            <h3 className="text-base font-semibold text-[#1A1A24] font-display">
              Update Consignment & Tracking: #{order.orderNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Order Details Header */}
          <div className="p-3 bg-[#FAF9F7] border border-neutral-200 rounded-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#1A1A24]">{order.customerName}</span>
              <span className="font-mono font-bold text-[#1A1A24] tabular-nums">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
            <div className="text-neutral-500 text-[11px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span>{order.address}, {order.city}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Shipping & Delivery Status
            </label>
            <select
              value={shippingStatus}
              onChange={(e) => setShippingStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs sm:text-sm text-[#232323] focus:border-[#1A1A24] focus:outline-hidden bg-white"
            >
              <option value="processing">Processing & Quality Hallmarking in Atelier</option>
              <option value="dispatched">Dispatched & In Transit (Armored Cargo)</option>
              <option value="out_for_delivery">Out for Doorstep Hand-Delivery</option>
              <option value="delivered">Delivered & Verified</option>
            </select>
            <p className="text-[11px] text-neutral-500 mt-1">
              Updating this status updates the client&apos;s live milestone timeline in the Order Tracker.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Courier Partner
              </label>
              <input
                type="text"
                required
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                placeholder="e.g. TCS Overnight Express"
                className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. TCS-PK-9812401"
                className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs font-mono text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
              Estimated Delivery Window
            </label>
            <input
              type="text"
              required
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
              placeholder="e.g. Tomorrow, Oct 3 by 2:00 PM"
              className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
            />
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
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
              Save & Broadcast Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
