import { Product } from './storeData';
import productTwisterBangle from '../assets/images/product_gold_bangle_1790970555732.jpg';
import productGoldRing from '../assets/images/product_gold_ring_1790970568006.jpg';
import productJhumkaEarrings from '../assets/images/product_jhumka_earrings_1790970583590.jpg';
import productGoldPendant from '../assets/images/product_gold_pendant_1790970651354.jpg';
import productOvalBangle from '../assets/images/product_oval_bangle_1790970695832.jpg';
import productDiamondBand from '../assets/images/product_diamond_band_1790970710805.jpg';
import productHoopEarrings from '../assets/images/product_hoop_earrings_1790970726070.jpg';
import productTangoBangle from '../assets/images/product_tango_bangle_1790970741476.jpg';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city: string;
  address: string;
  items: {
    productId: string;
    productName: string;
    image: string;
    price: number;
    quantity: number;
    karat: string;
  }[];
  totalAmount: number;
  paymentMethod: 'COD' | 'Bank Transfer' | 'Credit Card';
  paymentStatus: 'Paid' | 'Pending Verification';
  shippingStatus: 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered';
  courierName: string;
  trackingNumber: string;
  orderDate: string;
  estimatedDelivery: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  description: string;
  usageCount: number;
  isActive: boolean;
  minOrderAmount?: number;
}

export interface InventoryItem {
  productId: string;
  sku: string;
  stockCount: number;
  lowStockThreshold: number;
  goldWeightGrams: number;
  karatPurity: '22K' | '18K' | '24K';
  hallmarkCertified: boolean;
}

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'JHUMKY20',
    discountPercent: 20,
    description: 'Welcome promotion for new clientele',
    usageCount: 142,
    isActive: true,
    minOrderAmount: 5000,
  },
  {
    id: 'promo-2',
    code: 'BRIDAL15',
    discountPercent: 15,
    description: 'Bridal season special discount',
    usageCount: 68,
    isActive: true,
    minOrderAmount: 25000,
  },
  {
    id: 'promo-3',
    code: 'VIPGOLD10',
    discountPercent: 10,
    description: 'Exclusive tier discount for recurring buyers',
    usageCount: 39,
    isActive: true,
  },
];

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-1',
    orderNumber: 'JK-9042',
    customerName: 'Ali Hussain',
    customerEmail: 'alihussain42234223@gmail.com',
    customerPhone: '+92 300 1234567',
    city: 'Karachi',
    address: 'House 42, Street 7, Phase 5, D.H.A',
    items: [
      {
        productId: 'p1',
        productName: 'Bespoke twister bangle',
        image: productTwisterBangle,
        price: 29999,
        quantity: 1,
        karat: '22K Solid Gold',
      },
    ],
    totalAmount: 29999,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    shippingStatus: 'dispatched',
    courierName: 'TCS Overnight Express',
    trackingNumber: 'TCS-PK-9812401',
    orderDate: 'Oct 1, 2026',
    estimatedDelivery: 'Tomorrow, Oct 3 by 2:00 PM',
  },
  {
    id: 'ord-2',
    orderNumber: 'JK-8821',
    customerName: 'Fatima Zahra',
    customerEmail: 'fatima.zahra@domain.pk',
    customerPhone: '+92 321 9876543',
    city: 'Lahore',
    address: '14-A, Block C-3, Gulberg III',
    items: [
      {
        productId: 'p2',
        productName: 'The migan pendant',
        image: productGoldPendant,
        price: 34999,
        quantity: 1,
        karat: '22K Solid Gold',
      },
      {
        productId: 'p6',
        productName: 'Royal sherbi ring',
        image: productGoldRing,
        price: 25000,
        quantity: 1,
        karat: '18K Diamond Solitaire',
      },
    ],
    totalAmount: 59999,
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    shippingStatus: 'out_for_delivery',
    courierName: 'Leopards Courier Armored',
    trackingNumber: 'LEO-PK-882194',
    orderDate: 'Sep 30, 2026',
    estimatedDelivery: 'Today by 5:30 PM',
  },
  {
    id: 'ord-3',
    orderNumber: 'JK-7740',
    customerName: 'Sana Mir',
    customerEmail: 'sana.mir@yahoo.com',
    customerPhone: '+92 333 4567890',
    city: 'Islamabad',
    address: 'Sector F-7/2, Street 19, House 8',
    items: [
      {
        productId: 'p7',
        productName: 'Syndria huggie earrings',
        image: productJhumkaEarrings,
        price: 22000,
        quantity: 1,
        karat: '22K Yellow Gold',
      },
    ],
    totalAmount: 22000,
    paymentMethod: 'COD',
    paymentStatus: 'Paid',
    shippingStatus: 'delivered',
    courierName: 'TCS Overnight Express',
    trackingNumber: 'TCS-PK-774011',
    orderDate: 'Sep 25, 2026',
    estimatedDelivery: 'Delivered on Sep 28',
  },
  {
    id: 'ord-4',
    orderNumber: 'JK-9104',
    customerName: 'Bilal Qureshi',
    customerEmail: 'bilal.q@outlook.com',
    customerPhone: '+92 301 5551234',
    city: 'Faisalabad',
    address: 'Kohinoor City, Commercial Boulevard',
    items: [
      {
        productId: 'p5',
        productName: 'Sansa oval bangle',
        image: productOvalBangle,
        price: 24500,
        quantity: 1,
        karat: '22K Solid Gold',
      },
    ],
    totalAmount: 24500,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    shippingStatus: 'processing',
    courierName: 'TCS Armored Vault',
    trackingNumber: 'TCS-PK-910400',
    orderDate: 'Oct 2, 2026',
    estimatedDelivery: 'Oct 5, 2026',
  },
  {
    id: 'ord-5',
    orderNumber: 'JK-9218',
    customerName: 'Ayesha Malik',
    customerEmail: 'ayesha.m@gmail.com',
    customerPhone: '+92 345 8899001',
    city: 'Rawalpindi',
    address: 'Bahria Town Phase 4, Safari Valley',
    items: [
      {
        productId: 'p4',
        productName: 'Treasured callie band',
        image: productDiamondBand,
        price: 18000,
        quantity: 2,
        karat: '18K Gold & Pavé',
      },
    ],
    totalAmount: 36000,
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    shippingStatus: 'processing',
    courierName: 'Trax Secure Cargo',
    trackingNumber: 'TRX-PK-921833',
    orderDate: 'Oct 3, 2026',
    estimatedDelivery: 'Oct 6, 2026',
  },
];

export const AVAILABLE_IMAGE_PRESETS = [
  { label: 'Twister Bangle (22K Gold)', value: productTwisterBangle },
  { label: 'Diamond Pavé Ring', value: productGoldRing },
  { label: 'Jhumka Chandelier Earrings', value: productJhumkaEarrings },
  { label: 'Filigree Gold Pendant', value: productGoldPendant },
  { label: 'Sansa Oval Bangle', value: productOvalBangle },
  { label: 'Triple-Strand Diamond Band', value: productDiamondBand },
  { label: 'Huggie Hoop Earrings', value: productHoopEarrings },
  { label: 'Tango Bangle with Crystal', value: productTangoBangle },
];
