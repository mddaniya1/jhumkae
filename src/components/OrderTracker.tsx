import React, { useState, useEffect } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency, Product } from '../data/storeData';
import { AdminOrder } from '../data/initialAdminData';
import productTwisterBangle from '../assets/images/product_gold_bangle_1790970555732.jpg';
import productGoldPendant from '../assets/images/product_gold_pendant_1790970651354.jpg';
import productGoldRing from '../assets/images/product_gold_ring_1790970568006.jpg';
import productJhumkaEarrings from '../assets/images/product_jhumka_earrings_1790970583590.jpg';

export interface TrackingStep {
  title: string;
  location: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
  description?: string;
}

export interface TrackedOrder {
  orderId: string;
  orderDate: string;
  statusText: string;
  statusCode: 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered';
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  destination: string;
  recipientName: string;
  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
    karat: string;
  }[];
  steps: TrackingStep[];
}

const PRESET_ORDERS: Record<string, TrackedOrder> = {
  'JK-9042': {
    orderId: 'JK-9042',
    orderDate: 'October 1, 2026',
    statusText: 'Dispatched & In Transit',
    statusCode: 'dispatched',
    courierName: 'TCS Overnight Express',
    trackingNumber: 'TCS-PK-9812401',
    estimatedDelivery: 'Tomorrow, Oct 3 by 2:00 PM',
    destination: 'Defence Phase 5, Karachi, Sindh',
    recipientName: 'Ali Hussain',
    items: [
      {
        name: 'Bespoke twister bangle',
        image: productTwisterBangle,
        quantity: 1,
        price: 29999,
        karat: '22K Solid Gold',
      },
    ],
    steps: [
      {
        title: 'Order Confirmed & Payment Verified',
        location: 'Jhumky Online Atelier',
        time: 'Oct 1, 10:30 AM',
        status: 'completed',
        description: 'Payment verified and sent to master jewelers.',
      },
      {
        title: 'Hallmarking & Quality Assurance',
        location: 'Lahore Vault & Laboratory',
        time: 'Oct 1, 04:15 PM',
        status: 'completed',
        description: 'Passed 91.6% gold purity spectrometer certification.',
      },
      {
        title: 'Secured & Dispatched',
        location: 'Lahore Central Logistics Hub',
        time: 'Oct 2, 09:00 AM',
        status: 'completed',
        description: 'En-route via insured air cargo.',
      },
      {
        title: 'Arrived at Regional Distribution Hub',
        location: 'Karachi Airport Facility',
        time: 'Oct 2, 02:45 PM',
        status: 'current',
        description: 'Shipment sorted and allocated to armored delivery van.',
      },
      {
        title: 'Out for Hand-Delivery',
        location: 'Defence Karachi Zone',
        time: 'Estimated Oct 3, 10:00 AM',
        status: 'pending',
        description: 'Recipient signature and ID verification required.',
      },
    ],
  },
  'JK-8821': {
    orderId: 'JK-8821',
    orderDate: 'September 30, 2026',
    statusText: 'Out for Delivery Today',
    statusCode: 'out_for_delivery',
    courierName: 'Leopards Courier Armored',
    trackingNumber: 'LEO-PK-882194',
    estimatedDelivery: 'Today by 5:30 PM',
    destination: 'Gulberg III, Lahore, Punjab',
    recipientName: 'Fatima Zahra',
    items: [
      {
        name: 'The migan pendant',
        image: productGoldPendant,
        quantity: 1,
        price: 34999,
        karat: '22K Solid Gold',
      },
      {
        name: 'Royal sherbi ring',
        image: productGoldRing,
        quantity: 1,
        price: 25000,
        karat: '18K Diamond Solitaire',
      },
    ],
    steps: [
      {
        title: 'Order Confirmed',
        location: 'Jhumky Flagship',
        time: 'Sep 30, 11:00 AM',
        status: 'completed',
      },
      {
        title: 'Custom Velvet Packaging & Hallmark',
        location: 'Lahore Atelier',
        time: 'Oct 1, 02:00 PM',
        status: 'completed',
      },
      {
        title: 'Handed Over to Courier Partner',
        location: 'Gulberg Sorting Hub',
        time: 'Oct 2, 08:30 AM',
        status: 'completed',
      },
      {
        title: 'Courier Agent on the Way',
        location: 'Local Delivery Van (Driver: Tariq M.)',
        time: 'Oct 2, 11:20 AM',
        status: 'current',
        description: 'Driver will contact before doorstep arrival.',
      },
      {
        title: 'Delivered to Recipient',
        location: 'Destination Address',
        time: 'Estimated Today by 5:30 PM',
        status: 'pending',
      },
    ],
  },
  'JK-7740': {
    orderId: 'JK-7740',
    orderDate: 'September 25, 2026',
    statusText: 'Delivered & Signed',
    statusCode: 'delivered',
    courierName: 'TCS Overnight Express',
    trackingNumber: 'TCS-PK-774011',
    estimatedDelivery: 'Delivered on Sep 28, 2026',
    destination: 'Sector F-7/2, Islamabad',
    recipientName: 'Sana Mir',
    items: [
      {
        name: 'Syndria huggie earrings',
        image: productJhumkaEarrings,
        quantity: 1,
        price: 22000,
        karat: '22K Yellow Gold',
      },
    ],
    steps: [
      {
        title: 'Order Confirmed',
        location: 'Jhumky Online',
        time: 'Sep 25, 03:00 PM',
        status: 'completed',
      },
      {
        title: 'Hallmarking & Insured Packaging',
        location: 'Lahore Vault',
        time: 'Sep 26, 11:00 AM',
        status: 'completed',
      },
      {
        title: 'Dispatched to Islamabad Hub',
        location: 'Islamabad Express Center',
        time: 'Sep 27, 07:45 AM',
        status: 'completed',
      },
      {
        title: 'Delivered & Signed by Sana Mir',
        location: 'Sector F-7/2, Islamabad',
        time: 'Sep 28, 01:15 PM',
        status: 'completed',
        description: 'Successfully received with hallmarked certificate card.',
      },
    ],
  },
};

interface OrderTrackerProps {
  initialOrderId?: string;
  adminOrders?: AdminOrder[];
  onSelectProductQuickView?: (product: Product) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  initialOrderId = 'JK-9042',
  adminOrders = [],
}) => {
  const getOrderFromSource = (id: string): TrackedOrder | null => {
    const cleanId = id.trim().toUpperCase();
    const adminMatch = adminOrders.find(
      (o) => o.orderNumber.toUpperCase() === cleanId
    );
    if (adminMatch) {
      const isDelivered = adminMatch.shippingStatus === 'delivered';
      const isOutForDelivery = adminMatch.shippingStatus === 'out_for_delivery';
      const isDispatched = adminMatch.shippingStatus === 'dispatched';

      return {
        orderId: adminMatch.orderNumber,
        orderDate: adminMatch.orderDate,
        statusText:
          adminMatch.shippingStatus === 'delivered'
            ? 'Delivered & Hand-Verified'
            : adminMatch.shippingStatus === 'out_for_delivery'
            ? 'Out for Doorstep Hand-Delivery'
            : adminMatch.shippingStatus === 'dispatched'
            ? 'Dispatched & In Transit'
            : 'Processing & Hallmarking in Atelier',
        statusCode: adminMatch.shippingStatus,
        courierName: adminMatch.courierName,
        trackingNumber: adminMatch.trackingNumber,
        estimatedDelivery: adminMatch.estimatedDelivery,
        destination: `${adminMatch.address}, ${adminMatch.city}`,
        recipientName: adminMatch.customerName,
        items: adminMatch.items.map((i) => ({
          name: i.productName,
          image: i.image,
          quantity: i.quantity,
          price: i.price,
          karat: i.karat || '22K Solid Gold',
        })),
        steps: [
          {
            title: 'Order Confirmed & Payment Verified',
            location: 'Jhumky Online Atelier',
            time: 'Payment Confirmed',
            status: 'completed',
          },
          {
            title: 'Hallmarking & Quality Assurance',
            location: 'Lahore Vault & Laboratory',
            time: 'Certified Purity',
            status: 'completed',
          },
          {
            title: 'Secured & Dispatched',
            location: 'National Logistics Hub',
            time: isDispatched || isOutForDelivery || isDelivered ? 'Dispatched' : 'Pending',
            status: isDispatched || isOutForDelivery || isDelivered ? 'completed' : 'pending',
          },
          {
            title: 'Out for Hand-Delivery',
            location: `${adminMatch.city} Delivery Center`,
            time: isOutForDelivery || isDelivered ? 'Out for Delivery' : 'Scheduled',
            status: isDelivered ? 'completed' : isOutForDelivery ? 'current' : 'pending',
          },
          {
            title: 'Delivered to Recipient',
            location: 'Client Address',
            time: isDelivered ? 'Signed & Delivered' : 'Pending Delivery',
            status: isDelivered ? 'completed' : 'pending',
          },
        ],
      };
    }

    if (PRESET_ORDERS[cleanId]) {
      return PRESET_ORDERS[cleanId];
    }
    return null;
  };

  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<TrackedOrder | null>(() => {
    return getOrderFromSource(initialOrderId) || PRESET_ORDERS['JK-9042'];
  });
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync if initialOrderId or adminOrders updates
  useEffect(() => {
    const found = getOrderFromSource(searchQuery || initialOrderId);
    if (found) {
      setActiveOrder(found);
    }
  }, [adminOrders, initialOrderId]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = searchQuery.trim().toUpperCase();

    if (!cleanId) {
      setErrorMessage('Please enter an order ID to track.');
      return;
    }

    const found = getOrderFromSource(cleanId);
    if (found) {
      setActiveOrder(found);
      setErrorMessage(null);
      return;
    }

    // Dynamic generation if user typed JK-XXXX or any custom order number
    if (cleanId.startsWith('JK-') || cleanId.startsWith('ORD-') || /^\d+$/.test(cleanId)) {
      const generatedOrder: TrackedOrder = {
        orderId: cleanId,
        orderDate: 'October 1, 2026',
        statusText: 'In Transit with TCS Courier',
        statusCode: 'dispatched',
        courierName: 'TCS Overnight Express',
        trackingNumber: `TCS-PK-${cleanId.replace(/[^0-9]/g, '') || '918234'}`,
        estimatedDelivery: 'Oct 4, 2026',
        destination: 'Karachi, Pakistan',
        recipientName: 'Valued Jhumky Patron',
        items: [
          {
            name: 'Handcrafted 22K Gold Jewellery Item',
            image: productTwisterBangle,
            quantity: 1,
            price: 29999,
            karat: '22K Hallmarked Gold',
          },
        ],
        steps: [
          {
            title: 'Order Verified & Authorized',
            location: 'Jhumky Lahore Atelier',
            time: 'Oct 1, 11:00 AM',
            status: 'completed',
          },
          {
            title: 'Hallmarked & Sealed in Velvet Vault',
            location: 'Quality Inspection',
            time: 'Oct 2, 09:30 AM',
            status: 'completed',
          },
          {
            title: 'In Transit to Destination City',
            location: 'National Logistics Hub',
            time: 'Oct 2, 03:00 PM',
            status: 'current',
            description: 'Transit secured by 24/7 GPS monitored cargo.',
          },
          {
            title: 'Scheduled Doorstep Delivery',
            location: 'Destination Address',
            time: 'Estimated Oct 4, 2026',
            status: 'pending',
          },
        ],
      };
      setActiveOrder(generatedOrder);
      setErrorMessage(null);
    } else {
      setErrorMessage(
        `Order "${cleanId}" was not found. Please try one of the example orders below or check your confirmation email.`
      );
    }
  };

  const handleCopyTracking = (trackingNum: string) => {
    navigator.clipboard.writeText(trackingNum);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const getStatusBadge = (status: TrackedOrder['statusCode']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Delivered
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-xs">
            <Truck className="w-3.5 h-3.5 text-blue-600" /> Out for Delivery
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> In Transit
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-neutral-100 text-neutral-800 rounded-xs">
            <Package className="w-3.5 h-3.5" /> Processing
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Input Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center border border-[#1A1A24] bg-white rounded-xs overflow-hidden shadow-2xs">
          <div className="pl-3.5 pr-1.5 text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Enter Order ID (e.g. JK-9042)"
            className="w-full py-2.5 px-2 text-xs sm:text-sm text-[#232323] placeholder-neutral-400 focus:outline-hidden font-medium"
          />
          <button
            type="submit"
            className="bg-[#1A1A24] text-white hover:bg-black px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            Track
          </button>
        </div>
      </form>

      {/* Suggested Quick Order IDs */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-neutral-500 font-medium">Try sample order:</span>
        {Object.keys(PRESET_ORDERS).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setSearchQuery(id);
              setActiveOrder(PRESET_ORDERS[id]);
              setErrorMessage(null);
            }}
            className={`px-2 py-0.5 border text-xs font-mono transition-colors rounded-xs ${
              activeOrder?.orderId === id
                ? 'bg-[#1A1A24] text-white border-[#1A1A24]'
                : 'bg-[#FAF9F7] text-neutral-700 hover:text-black border-neutral-200'
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Order Status Display */}
      {activeOrder && (
        <div className="space-y-4 pt-1">
          {/* Header Card */}
          <div className="bg-[#FAF9F7] border border-[#F0EFEB] p-4 sm:p-5 rounded-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-200/70">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A7A7A] block">
                  ORDER REFERENCE
                </span>
                <span className="text-base font-bold text-[#1A1A24] font-mono">
                  #{activeOrder.orderId}
                </span>
                <span className="text-xs text-neutral-500 ml-2">
                  Placed on {activeOrder.orderDate}
                </span>
              </div>
              {getStatusBadge(activeOrder.statusCode)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Courier Partner</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#1A1A24] mt-0.5">
                  <Truck className="w-3.5 h-3.5 text-[#1A1A24]" />
                  <span>{activeOrder.courierName}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-neutral-600">
                  <span>Tracking: {activeOrder.trackingNumber}</span>
                  <button
                    onClick={() => handleCopyTracking(activeOrder.trackingNumber)}
                    className="p-1 hover:text-black text-neutral-400 cursor-pointer"
                    title="Copy tracking number"
                  >
                    {copiedTracking ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px]">Estimated Delivery</span>
                <p className="font-semibold text-emerald-800 mt-0.5">
                  {activeOrder.estimatedDelivery}
                </p>
                <div className="flex items-start gap-1 mt-1 text-neutral-600 text-[11px]">
                  <MapPin className="w-3 h-3 text-neutral-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{activeOrder.destination}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Progress Timeline */}
          <div className="p-4 sm:p-5 border border-[#F0EFEB] rounded-xs bg-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A24] mb-4">
              Shipment Activity & Milestones
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-neutral-200">
              {activeOrder.steps.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';

                return (
                  <div key={idx} className="relative group">
                    {/* Step Dot */}
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-[#2BB673] text-white ring-4 ring-emerald-50'
                          : isCurrent
                          ? 'bg-[#1A1A24] text-white ring-4 ring-neutral-100 animate-pulse'
                          : 'bg-white border-2 border-neutral-300'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      ) : (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCurrent ? 'bg-white' : 'bg-transparent'
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex flex-col">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold ${
                            isCurrent
                              ? 'text-[#1A1A24] font-bold'
                              : isCompleted
                              ? 'text-[#333333]'
                              : 'text-neutral-400'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {step.time}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500 mt-0.5">
                        {step.location}
                      </span>
                      {step.description && (
                        <p className="text-[11px] text-neutral-600 bg-[#FAF9F7] p-2 mt-1.5 rounded-xs border border-neutral-100">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Itemized Order Package Details */}
          <div className="p-4 sm:p-5 border border-[#F0EFEB] rounded-xs bg-[#FAF9F7]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A7A] block mb-3">
              Included In This Consignment
            </span>
            <div className="space-y-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white p-1 border border-neutral-200 shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-medium text-[#1A1A24] truncate">
                      {item.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                      <span>Qty: {item.quantity}</span>
                      <span>·</span>
                      <span className="text-[#C49A45] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#2BB673]" /> {item.karat}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1A1A24] tabular-nums">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2BB673]" />
                Insured transit by Jhumky Atelier
              </span>
              <a
                href="tel:+923001234567"
                className="text-[#1A1A24] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Help with delivery</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
