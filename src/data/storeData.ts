// Image imports
import heroModelLifestyle from '../assets/images/hero_model_lifestyle_1790970438564.jpg';
import heroBangleWrist from '../assets/images/hero_bangle_wrist_1790970459085.jpg';
import categoryEarrings from '../assets/images/category_earrings_1790970473373.jpg';
import categoryRings from '../assets/images/category_rings_1790970525405.jpg';
import categoryBracelet from '../assets/images/category_bracelet_1790970543095.jpg';
import categoryNecklace from '../assets/images/category_necklace_1790970504036.jpg';
import trendingWeddingModel from '../assets/images/trending_wedding_model_1790970487559.jpg';

import productTwisterBangle from '../assets/images/product_gold_bangle_1790970555732.jpg';
import productGoldRing from '../assets/images/product_gold_ring_1790970568006.jpg';
import productJhumkaEarrings from '../assets/images/product_jhumka_earrings_1790970583590.jpg';
import productGoldPendant from '../assets/images/product_gold_pendant_1790970651354.jpg';
import productOvalBangle from '../assets/images/product_oval_bangle_1790970695832.jpg';
import productDiamondBand from '../assets/images/product_diamond_band_1790970710805.jpg';
import productHoopEarrings from '../assets/images/product_hoop_earrings_1790970726070.jpg';
import productTangoBangle from '../assets/images/product_tango_bangle_1790970741476.jpg';

import instaFlatlay from '../assets/images/insta_flatlay_1790970603507.jpg';
import instaSweaterHand from '../assets/images/insta_sweater_hand_1790970622538.jpg';
import instaCandle from '../assets/images/insta_candle_1790970635634.jpg';
import instaSkate from '../assets/images/insta_sneakers_skate_1790970759872.jpg';
import instaFeetDenim from '../assets/images/insta_feet_denim_1790970774534.jpg';
import instaCamera from '../assets/images/insta_camera_1790970790951.jpg';
import instaPlantVase from '../assets/images/insta_plant_vase_1790970806509.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  isSale?: boolean;
  image: string;
  category: 'bangles' | 'rings' | 'earrings' | 'necklaces';
  description?: string;
  sku?: string;
  rating?: number;
  inStock?: boolean;
}

export interface CategoryCard {
  id: string;
  title: string;
  itemCount: string;
  image: string;
  href: string;
  aspectClass: string;
}

export interface HeroSlide {
  id: string;
  leftImage: string;
  leftTitleLine1: string;
  leftTitleLine2: string;
  leftSubtitle: string;
  rightLabel: string;
  rightImage: string;
  rightCta: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    leftImage: heroModelLifestyle,
    leftTitleLine1: 'NEW',
    leftTitleLine2: 'ARRIVAL',
    leftSubtitle: 'Handcrafted Luxury Gold Essentials',
    rightLabel: 'CLASSIC JEWELLERY',
    rightImage: heroBangleWrist,
    rightCta: 'SHOP THIS COLLECTION',
  },
  {
    id: 'slide-2',
    leftImage: trendingWeddingModel,
    leftTitleLine1: 'BRIDAL',
    leftTitleLine2: 'ROYALE',
    leftSubtitle: 'Heirloom Kundan & Solid Gold Bangles',
    rightLabel: 'EXCLUSIVE HERITAGE',
    rightImage: productJhumkaEarrings,
    rightCta: 'EXPLORE BRIDAL',
  },
  {
    id: 'slide-3',
    leftImage: categoryEarrings,
    leftTitleLine1: 'MODERN',
    leftTitleLine2: 'ELEGANCE',
    leftSubtitle: 'Contemporary 22K Rings & Huggie Hoops',
    rightLabel: 'FINE CRAFTSMANSHIP',
    rightImage: productDiamondBand,
    rightCta: 'DISCOVER RINGS',
  },
];

export const SERVICE_FEATURES = [
  {
    icon: 'truck',
    title: 'Free shipping',
    subtitle: 'On order over Rs. 5,000',
  },
  {
    icon: 'headset',
    title: 'Online support',
    subtitle: 'Customer service 24/7',
  },
  {
    icon: 'refresh-cw',
    title: '30 Days return',
    subtitle: 'If goods have problems',
  },
  {
    icon: 'credit-card',
    title: 'Secure payment',
    subtitle: '100% secure payment',
  },
];

export const CATEGORIES_DATA = [
  {
    id: 'cat-earrings',
    title: 'Earrings',
    image: categoryEarrings,
    colSpan: 'left',
  },
  {
    id: 'cat-rings',
    title: 'Rings',
    image: categoryRings,
    colSpan: 'center-top',
  },
  {
    id: 'cat-bracelet',
    title: 'Bracelet',
    image: categoryBracelet,
    colSpan: 'center-bottom',
  },
  {
    id: 'cat-necklace',
    title: 'Necklace',
    image: categoryNecklace,
    colSpan: 'right',
  },
];

// Product Tabs Grid Products
export const NEW_ARRIVALS_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bespoke twister bangle',
    price: 29999,
    image: productTwisterBangle,
    category: 'bangles',
    description: 'Sculpted in 22K yellow gold with a graceful organic twist and polished pearl finial.',
    inStock: true,
  },
  {
    id: 'p2',
    name: 'The migan pendant',
    price: 34999,
    originalPrice: 40000,
    isSale: true,
    image: productGoldPendant,
    category: 'necklaces',
    description: 'Intricate filigree openwork medallion with radiant gold shimmer on a fine chain.',
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Sarahruby ring',
    price: 29999,
    image: productGoldRing,
    category: 'rings',
    description: 'Criss-cross diamond micropavé band in polished 18K gold for effortless glamour.',
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Treasured callie band',
    price: 18000,
    originalPrice: 29999,
    isSale: true,
    image: productDiamondBand,
    category: 'rings',
    description: 'Diamond pave honeycomb lattice band with warm yellow gold polish.',
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Sansa oval bangle',
    price: 24500,
    originalPrice: 29999,
    isSale: true,
    image: productOvalBangle,
    category: 'bangles',
    description: 'Sleek oval bangle featuring an architectural shell-motif centerpiece.',
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Royal sherbi ring',
    price: 25000,
    originalPrice: 29999,
    isSale: true,
    image: productGoldRing,
    category: 'rings',
    description: 'Classic solitaire brilliant cut stone elevated on a handcrafted claw setting.',
    inStock: true,
  },
  {
    id: 'p7',
    name: 'Syndria huggie earrings',
    price: 22000,
    image: productJhumkaEarrings,
    category: 'earrings',
    description: 'Artisanal floral stud motif adorned with radiant accents for all-day comfort.',
    inStock: true,
  },
  {
    id: 'p8',
    name: 'Adney hoop earrings',
    price: 22000,
    originalPrice: 29999,
    isSale: true,
    image: productHoopEarrings,
    category: 'earrings',
    description: 'Timeless channel-set diamond huggie hoops crafted for subtle daily elegance.',
    inStock: true,
  },
];

export const BEST_SELLERS_PRODUCTS: Product[] = [
  {
    id: 'bs1',
    name: 'Magdalena band',
    price: 24999,
    image: productDiamondBand,
    category: 'rings',
    description: 'Tri-color intertwined gold band embellished with handset pavé diamonds.',
    inStock: true,
  },
  {
    id: 'bs2',
    name: 'Tango oval bangle',
    price: 25000,
    image: productTangoBangle,
    category: 'bangles',
    description: 'Modern open cuff with teardrop crystal motif and high-polish finish.',
    inStock: true,
  },
  {
    id: 'bs3',
    name: 'The ruon earrings',
    price: 22000,
    image: productHoopEarrings,
    category: 'earrings',
    description: 'Graceful tapered sweep earrings with pave accents in luminous 18K yellow gold.',
    inStock: true,
  },
  {
    id: 'bs4',
    name: 'Bespoke twister bangle',
    price: 29999,
    image: productTwisterBangle,
    category: 'bangles',
    description: 'Sculpted in 22K yellow gold with a graceful organic twist.',
    inStock: true,
  },
  {
    id: 'bs5',
    name: 'The evianna ring',
    price: 26999,
    originalPrice: 29999,
    isSale: true,
    image: productGoldRing,
    category: 'rings',
    description: 'Geometric interlocking band with baguette-cut and round crystals.',
    inStock: true,
  },
  {
    id: 'bs6',
    name: 'The migan pendant',
    price: 34999,
    originalPrice: 40000,
    isSale: true,
    image: productGoldPendant,
    category: 'necklaces',
    description: 'Intricate filigree openwork medallion with radiant gold shimmer.',
    inStock: true,
  },
  {
    id: 'bs7',
    name: 'Adney hoop earrings',
    price: 22000,
    originalPrice: 29999,
    isSale: true,
    image: productHoopEarrings,
    category: 'earrings',
    description: 'Channel-set sparkling huggie hoops crafted for daily elegance.',
    inStock: true,
  },
  {
    id: 'bs8',
    name: 'Sansa oval bangle',
    price: 24500,
    originalPrice: 29999,
    isSale: true,
    image: productOvalBangle,
    category: 'bangles',
    description: 'Sleek oval bangle featuring an architectural shell-motif centerpiece.',
    inStock: true,
  },
];

export const FEATURED_PRODUCTS_TAB: Product[] = [
  {
    id: 'ft1',
    name: 'Bespoke twister bangle',
    price: 29999,
    image: productTwisterBangle,
    category: 'bangles',
    description: 'Signature hand-finished 22K gold bangle with pearl accent.',
    inStock: true,
  },
  {
    id: 'ft2',
    name: 'Magdalena band',
    price: 24999,
    image: productDiamondBand,
    category: 'rings',
    description: 'Interwoven tri-tone band representing enduring elegance.',
    inStock: true,
  },
  {
    id: 'ft3',
    name: 'Treasured callie band',
    price: 18000,
    originalPrice: 29999,
    isSale: true,
    image: productDiamondBand,
    category: 'rings',
    description: 'Intricate filigree honeycomb ring band with diamond sparkle.',
    inStock: true,
  },
  {
    id: 'ft4',
    name: 'The evianna ring',
    price: 26999,
    originalPrice: 29999,
    isSale: true,
    image: productGoldRing,
    category: 'rings',
    description: 'Art-deco inspired double loop gold band with pave diamonds.',
    inStock: true,
  },
  {
    id: 'ft5',
    name: 'Royal sherbi ring',
    price: 25000,
    originalPrice: 29999,
    isSale: true,
    image: productGoldRing,
    category: 'rings',
    description: 'Royal solitaire ring with hand-chiseled prong setting.',
    inStock: true,
  },
  {
    id: 'ft6',
    name: 'Syndria huggie earrings',
    price: 22000,
    image: productJhumkaEarrings,
    category: 'earrings',
    description: 'Floral rosette studs with signature Jhumky craftsmanship.',
    inStock: true,
  },
  {
    id: 'ft7',
    name: 'Tango oval bangle',
    price: 25000,
    image: productTangoBangle,
    category: 'bangles',
    description: 'Polished open bracelet with gleaming teardrop end-cap.',
    inStock: true,
  },
  {
    id: 'ft8',
    name: 'The ruon earrings',
    price: 22000,
    image: productHoopEarrings,
    category: 'earrings',
    description: 'Sculptural curved earring studs with diamond accent.',
    inStock: true,
  },
];

// Trending products slider (Section 7)
export const TRENDING_PRODUCTS: Product[] = [
  {
    id: 'trend-1',
    name: 'Tango oval bangle',
    price: 25000,
    image: productTangoBangle,
    category: 'bangles',
    description: 'Elegantly contoured oval silhouette with bezel-set teardrop crystal.',
    inStock: true,
  },
  {
    id: 'trend-2',
    name: 'The ruon earrings',
    price: 22000,
    image: productHoopEarrings,
    category: 'earrings',
    description: 'Tapered wave earrings with micropavé accents, sold as a pair.',
    inStock: true,
  },
  {
    id: 'trend-3',
    name: 'Bespoke twister bangle',
    price: 29999,
    image: productTwisterBangle,
    category: 'bangles',
    description: 'Signature twisted gold cuff with luminous freshwater pearl finish.',
    inStock: true,
  },
  {
    id: 'trend-4',
    name: 'Royal sherbi ring',
    price: 25000,
    originalPrice: 29999,
    isSale: true,
    image: productGoldRing,
    category: 'rings',
    description: 'Royal solitaire ring with hand-chiseled prong setting.',
    inStock: true,
  },
];

// Section 8 Featured Products Row
export const SECTION_FEATURED_PRODUCTS: Product[] = [
  {
    id: 'feat-1',
    name: 'Bespoke twister bangle',
    price: 29999,
    image: productTwisterBangle,
    category: 'bangles',
    description: 'Signature twisted gold cuff with luminous freshwater pearl finish.',
    inStock: true,
  },
  {
    id: 'feat-2',
    name: 'Magdalena band',
    price: 24999,
    image: productDiamondBand,
    category: 'rings',
    description: 'Tri-tone layered gold ring with pave crystal accents.',
    inStock: true,
  },
  {
    id: 'feat-3',
    name: 'Treasured callie band',
    price: 18000,
    originalPrice: 29999,
    isSale: true,
    image: productDiamondBand,
    category: 'rings',
    description: 'Honeycomb mesh band with handset brilliant cut stones.',
    inStock: true,
  },
  {
    id: 'feat-4',
    name: 'The evianna ring',
    price: 26999,
    originalPrice: 29999,
    isSale: true,
    image: productGoldRing,
    category: 'rings',
    description: 'Architectural twin band ring with diamond accent bar.',
    inStock: true,
  },
];

// Instagram Strip Images
export const INSTAGRAM_PHOTOS = [
  {
    id: 'insta-1',
    src: instaFlatlay,
    alt: 'Jhumky lookbook flatlay with notebook and gold bracelet',
  },
  {
    id: 'insta-2',
    src: instaSweaterHand,
    alt: 'Hand wearing gold stackable rings with knit sweater',
  },
  {
    id: 'insta-3',
    src: instaCandle,
    alt: 'Artisanal candle and jewellery tray',
  },
  {
    id: 'insta-4',
    src: instaSkate,
    alt: 'Casual lifestyle and street fashion',
  },
  {
    id: 'insta-5',
    src: instaFeetDenim,
    alt: 'Denim and boutique shopping bag',
  },
  {
    id: 'insta-6',
    src: instaCamera,
    alt: 'Editorial photographer capturing new collection',
  },
  {
    id: 'insta-7',
    src: instaPlantVase,
    alt: 'Monstera plant and gold hoop earrings',
  },
];

// Footer links and data
export const FOOTER_DATA = {
  brandDescription: 'Please reach out to when you need support.',
  phone: '+92 300 1234567',
  email: 'info@jhumky.com',
  instagram: '@jhumky',
  categories: [
    { label: 'Women collection', href: '#' },
    { label: 'Men collection', href: '#' },
    { label: 'Accessories', href: '#' },
    { label: 'Diamond', href: '#' },
    { label: 'Gold jewellery', href: '#' },
  ],
  account: [
    { label: 'My profile', href: '#' },
    { label: 'My order history', href: '#' },
    { label: 'My wishlist', href: '#' },
    { label: 'Order tracking', href: '#' },
    { label: 'Shopping cart', href: '#' },
  ],
  information: [
    { label: 'About us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Articles', href: '#' },
    { label: 'Contact us', href: '#' },
  ],
  socials: [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: 'https://instagram.com/jhumky', icon: 'instagram' },
    { name: 'X', href: '#', icon: 'twitter' },
    { name: 'Dribbble', href: '#', icon: 'dribbble' },
  ],
  paymentMethods: ['VISA', 'Mastercard', 'Amex', 'Discover', 'Diners'],
  copyright: '© Jhumky - 2025 is Proudly Powered by Jhumky',
  termsLink: 'Terms and conditions',
  privacyLink: 'Privacy policy',
};

// Helper for formatting Pakistani Rupee currency
export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}
