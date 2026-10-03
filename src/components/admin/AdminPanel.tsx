import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  Tag,
  Settings,
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  DollarSign,
  Copy,
  Check,
  RefreshCw,
  Coins,
} from 'lucide-react';
import { Product, formatCurrency } from '../../data/storeData';
import {
  AdminOrder,
  PromoCode,
  INITIAL_PROMO_CODES,
  INITIAL_ORDERS,
} from '../../data/initialAdminData';
import { AddEditProductModal } from './AddEditProductModal';
import { EditOrderModal } from './EditOrderModal';

interface AdminPanelProps {
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: AdminOrder[];
  onUpdateOrder: (order: AdminOrder) => void;
}

type AdminTab = 'dashboard' | 'products' | 'orders' | 'inventory' | 'discounts' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrder,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMO_CODES);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Modal States
  const [isAddEditProductOpen, setIsAddEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);

  // New Promo Code Form state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState(15);
  const [newPromoDesc, setNewPromoDesc] = useState('');

  // Store Settings State
  const [goldRate24K, setGoldRate24K] = useState(295000);
  const [goldRate22K, setGoldRate22K] = useState(270400);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(5000);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Financial calculations
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  }, [orders]);

  const activeShipmentsCount = useMemo(() => {
    return orders.filter(
      (o) => o.shippingStatus === 'dispatched' || o.shippingStatus === 'out_for_delivery'
    ).length;
  }, [orders]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCategory =
        productCategoryFilter === 'all' || p.category === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, productSearch, productCategoryFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.trackingNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.city.toLowerCase().includes(orderSearch.toLowerCase());
      const matchesStatus =
        orderStatusFilter === 'all' || o.shippingStatus === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Handle Save Product
  const handleSaveProduct = (productData: Partial<Product>) => {
    if (productData.id) {
      // Editing existing
      const existing = products.find((p) => p.id === productData.id);
      if (existing) {
        onUpdateProduct({
          ...existing,
          ...productData,
        } as Product);
      }
    } else {
      // Creating new
      const newProduct: Product = {
        id: `custom-prod-${Date.now()}`,
        name: productData.name || 'New Jewellery Piece',
        category: productData.category || 'bangles',
        price: productData.price || 25000,
        originalPrice: productData.originalPrice,
        isSale: productData.isSale,
        image: productData.image || '',
        description: productData.description,
        inStock: productData.inStock !== false,
      };
      onAddProduct(newProduct);
    }
  };

  // Handle Promo Codes
  const handleTogglePromo = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    const codeObj: PromoCode = {
      id: `promo-${Date.now()}`,
      code: newPromoCode.trim().toUpperCase(),
      discountPercent: Number(newPromoDiscount),
      description: newPromoDesc.trim() || `${newPromoDiscount}% off collection`,
      usageCount: 0,
      isActive: true,
    };
    setPromoCodes((prev) => [codeObj, ...prev]);
    setNewPromoCode('');
    setNewPromoDesc('');
  };

  const handleDeletePromo = (id: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== id));
  };

  const getOrderStatusBadge = (status: AdminOrder['shippingStatus']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Delivered
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-xs">
            <Truck className="w-3 h-3 text-blue-600" /> Out for Delivery
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">
            <Clock className="w-3 h-3 text-amber-600" /> Dispatched
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-neutral-100 text-neutral-800 rounded-xs">
            <Package className="w-3 h-3" /> Processing in Atelier
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#232323] flex flex-col font-sans antialiased">
      {/* Top Navigation Bar */}
      <header className="bg-[#1A1A24] text-white border-b border-[#2C2C38] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Logo with peach accent */}
          <div className="relative inline-flex items-center">
            <span
              aria-hidden="true"
              className="absolute -left-1.5 -top-1 w-7 h-7 rounded-full bg-[#FCDCC9] -z-0"
            />
            <span className="relative z-10 text-xl font-medium tracking-tight text-white font-display">
              Jhumky
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 border-l border-neutral-700 pl-4 text-xs text-neutral-300">
            <span className="font-semibold text-[#FCDCC9]">Atelier Console</span>
            <span className="text-neutral-500">·</span>
            <span>Vault & Operations</span>
          </div>
        </div>

        {/* Live Gold Ticker & Return to Storefront */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs">
          <div className="hidden lg:flex items-center gap-3 bg-[#242432] px-3 py-1.5 rounded-xs border border-neutral-700/80">
            <div className="flex items-center gap-1 text-[#FCDCC9]">
              <Coins className="w-3.5 h-3.5" />
              <span className="font-bold">24K Bullion:</span>
              <span className="font-mono">{formatCurrency(goldRate24K)}/Tola</span>
            </div>
            <span className="text-neutral-600">|</span>
            <div className="flex items-center gap-1 text-neutral-300">
              <span className="font-medium text-neutral-400">22K Jewelry:</span>
              <span className="font-mono">{formatCurrency(goldRate22K)}/Tola</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FCDCC9] hover:bg-[#fbd5c0] text-[#1A1A24] font-bold text-xs uppercase tracking-wider transition-colors rounded-xs shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront View</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-[1440px] w-full mx-auto">
        {/* Left Sidebar */}
        <aside className="w-full md:w-60 bg-white border-r border-[#E8E6E1] p-4 flex md:flex-col justify-between shrink-0 shadow-2xs">
          <nav className="space-y-1 w-full flex md:flex-col gap-1 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xs text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#1A1A24] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#FAF9F7] hover:text-black'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#1A1A24] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#FAF9F7] hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Jewellery Catalog</span>
              </div>
              <span className="text-[10px] font-mono bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded-xs">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#1A1A24] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#FAF9F7] hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Orders & Dispatch</span>
              </div>
              <span className="text-[10px] font-mono bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded-xs">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xs text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-[#1A1A24] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#FAF9F7] hover:text-black'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Vault & Hallmarking</span>
            </button>

            <button
              onClick={() => setActiveTab('discounts')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xs text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'discounts'
                  ? 'bg-[#1A1A24] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#FAF9F7] hover:text-black'
              }`}
            >
              <Tag className="w-4 h-4 shrink-0" />
              <span>Coupons & Offers</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xs text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#1A1A24] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#FAF9F7] hover:text-black'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Store Settings</span>
            </button>
          </nav>

          {/* Master Jeweler Badge */}
          <div className="hidden md:block pt-4 border-t border-neutral-100 text-xs text-neutral-500">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span className="font-bold text-[#1A1A24]">Atelier HQ</span>
            </div>
            <p className="text-[11px] text-neutral-400">Lahore Vault & Laboratory</p>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A24] font-display">
                    Atelier Executive Dashboard
                  </h1>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Real-time sales, consignment logistics, and gold vault reserves.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddEditProductOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1A24] text-white hover:bg-black text-xs font-bold uppercase tracking-wider transition-colors rounded-xs shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Piece</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Gross Revenue */}
                <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold">
                    <span>Gross Sales (PKR)</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A24] mt-2 font-mono tabular-nums">
                    {formatCurrency(totalRevenue)}
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                    +18.4% from last week
                  </span>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold">
                    <span>Total Consignments</span>
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A24] mt-2 font-mono tabular-nums">
                    {orders.length} Orders
                  </h3>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    100% verified hallmarked
                  </span>
                </div>

                {/* Active In-Transit */}
                <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold">
                    <span>In-Transit Logistics</span>
                    <Truck className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A24] mt-2 font-mono tabular-nums">
                    {activeShipmentsCount} In Transit
                  </h3>
                  <span className="text-[11px] text-amber-700 font-medium mt-1 block">
                    Armored TCS / Leopards
                  </span>
                </div>

                {/* Catalog Count */}
                <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold">
                    <span>Jewellery Catalog</span>
                    <Sparkles className="w-4 h-4 text-[#C49A45]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A24] mt-2 font-mono tabular-nums">
                    {products.length} Designs
                  </h3>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    Across 4 primary categories
                  </span>
                </div>
              </div>

              {/* Recent Orders with Quick Tracking Updater */}
              <div className="bg-white border border-[#E8E6E1] rounded-xs shadow-2xs p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A24] font-display">
                      Recent High-Value Consignments
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      Click any order to update courier status, tracking number, or dispatch stage.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#1A1A24] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Order Ref</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">City</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Courier</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF9F7] transition-colors">
                          <td className="py-3 px-3 font-mono font-semibold text-[#1A1A24]">
                            #{ord.orderNumber}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-medium text-[#1A1A24] block">{ord.customerName}</span>
                            <span className="text-[10px] text-neutral-400">{ord.customerPhone}</span>
                          </td>
                          <td className="py-3 px-3 text-neutral-600">{ord.city}</td>
                          <td className="py-3 px-3 font-semibold tabular-nums text-[#1A1A24]">
                            {formatCurrency(ord.totalAmount)}
                          </td>
                          <td className="py-3 px-3 text-neutral-600 font-mono text-[11px]">
                            {ord.courierName}
                          </td>
                          <td className="py-3 px-3">{getOrderStatusBadge(ord.shippingStatus)}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                setEditingOrder(ord);
                                setIsEditOrderOpen(true);
                              }}
                              className="px-2.5 py-1 bg-neutral-100 hover:bg-[#1A1A24] hover:text-white rounded-xs font-semibold text-[11px] transition-colors cursor-pointer"
                            >
                              Update Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS CATALOG (CRUD) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A24] font-display">
                    Jewellery Catalog Management
                  </h1>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Create, edit pricing, toggle sale badges, or remove handcrafted designs.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddEditProductOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1A1A24] text-white hover:bg-black text-xs font-bold uppercase tracking-wider transition-colors rounded-xs shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Piece</span>
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white p-4 border border-[#E8E6E1] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by name or category..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xs text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                  {['all', 'bangles', 'rings', 'earrings', 'necklaces'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 ${
                        productCategoryFilter === cat
                          ? 'bg-[#1A1A24] text-white'
                          : 'bg-[#FAF9F7] text-neutral-600 hover:text-black border border-neutral-200'
                      }`}
                    >
                      {cat === 'all' ? 'All Pieces' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white border border-[#E8E6E1] rounded-xs shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F7] border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Piece</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price (PKR)</th>
                        <th className="py-3 px-4">Sale Tag</th>
                        <th className="py-3 px-4">Stock Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF9F7] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-[#FEF8F5] p-1 border border-neutral-200 shrink-0 flex items-center justify-center">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-[#1A1A24] block">{p.name}</span>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  ID: {p.id}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 capitalize text-neutral-600">{p.category}</td>
                          <td className="py-3.5 px-4 font-semibold tabular-nums text-[#1A1A24]">
                            <div>
                              <span>{formatCurrency(p.price)}</span>
                              {p.originalPrice && (
                                <span className="text-neutral-400 text-[10px] line-through block">
                                  {formatCurrency(p.originalPrice)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            {p.isSale ? (
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-xs border border-emerald-200">
                                Active SALE
                              </span>
                            ) : (
                              <span className="text-neutral-400 text-[11px]">Regular</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {p.inStock !== false ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-semibold">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Available
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-600 text-[11px] font-semibold">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                Vault Backorder
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsAddEditProductOpen(true);
                                }}
                                className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-xs transition-colors"
                                title="Edit piece"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove "${p.name}" from storefront catalog?`)) {
                                    onDeleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors"
                                title="Delete piece"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & LOGISTICS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A24] font-display">
                    Consignment & Order Tracking Dispatch
                  </h1>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Update logistics milestones. Client Order Trackers update in real-time.
                  </p>
                </div>
              </div>

              {/* Search & Status Filter */}
              <div className="bg-white p-4 border border-[#E8E6E1] rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by order #, customer, tracking..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xs text-[#232323] focus:border-[#1A1A24] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                  {[
                    { label: 'All Orders', val: 'all' },
                    { label: 'Processing', val: 'processing' },
                    { label: 'Dispatched', val: 'dispatched' },
                    { label: 'Out for Delivery', val: 'out_for_delivery' },
                    { label: 'Delivered', val: 'delivered' },
                  ].map((filter) => (
                    <button
                      key={filter.val}
                      onClick={() => setOrderStatusFilter(filter.val)}
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 ${
                        orderStatusFilter === filter.val
                          ? 'bg-[#1A1A24] text-white'
                          : 'bg-[#FAF9F7] text-neutral-600 hover:text-black border border-neutral-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white border border-[#E8E6E1] rounded-xs shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F7] border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Customer & City</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Tracking Code</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF9F7] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#1A1A24]">
                            #{ord.orderNumber}
                          </td>
                          <td className="py-3.5 px-4 text-neutral-500">{ord.orderDate}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#1A1A24] block">{ord.customerName}</span>
                            <span className="text-[11px] text-neutral-500">{ord.city}, Pakistan</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-neutral-700">
                              {ord.items.map((i) => i.productName).join(', ')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold tabular-nums text-[#1A1A24]">
                            {formatCurrency(ord.totalAmount)}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600">
                            <div>
                              <span className="block font-semibold">{ord.trackingNumber}</span>
                              <span className="text-[10px] text-neutral-400">{ord.courierName}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">{getOrderStatusBadge(ord.shippingStatus)}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setEditingOrder(ord);
                                setIsEditOrderOpen(true);
                              }}
                              className="px-3 py-1.5 bg-[#1A1A24] text-white hover:bg-black rounded-xs text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Update Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY & VAULT */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A24] font-display">
                  Gold Vault & Karat Purity QA
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Lahore & Karachi atelier inventory with spectrometer certificate verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                  <div className="flex items-center gap-2 text-neutral-600 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#C49A45]" />
                    <span>22K Solid Gold Reserves</span>
                  </div>
                  <h4 className="text-2xl font-bold font-mono text-[#1A1A24] mt-2">
                    91.6% Certified
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Bangles, Kundan sets & heritage rings
                  </p>
                </div>

                <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                  <div className="flex items-center gap-2 text-neutral-600 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>18K Diamond Solitaires</span>
                  </div>
                  <h4 className="text-2xl font-bold font-mono text-[#1A1A24] mt-2">
                    75.0% Fine Gold
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Channel-set eternity bands & huggies
                  </p>
                </div>

                <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                  <div className="flex items-center gap-2 text-neutral-600 text-xs font-bold uppercase tracking-wider">
                    <Coins className="w-4 h-4 text-emerald-600" />
                    <span>Quality Assurance Rate</span>
                  </div>
                  <h4 className="text-2xl font-bold font-mono text-emerald-700 mt-2">
                    100% Hallmarked
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Each shipment accompanied by serialized card
                  </p>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="bg-white border border-[#E8E6E1] rounded-xs shadow-2xs p-5">
                <h3 className="text-sm font-bold text-[#1A1A24] mb-3 font-display">
                  Piece Inventory Breakdown
                </h3>
                <div className="space-y-3">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#FAF9F7] border border-neutral-200/80 rounded-xs gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white p-1 border border-neutral-200 shrink-0">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-[#1A1A24] block">{prod.name}</span>
                          <span className="text-[11px] text-neutral-500 capitalize">
                            Category: {prod.category} · 22K Solid Gold
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className="font-bold text-[#1A1A24] tabular-nums">
                          {formatCurrency(prod.price)}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-xs">
                          In Atelier Vault
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DISCOUNTS & PROMO CODES */}
          {activeTab === 'discounts' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A24] font-display">
                  Promotions & Coupon Management
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage active discount codes for marketing campaigns and storefront announcements.
                </p>
              </div>

              {/* Create Promo Code Form */}
              <div className="bg-white p-5 border border-[#E8E6E1] rounded-xs shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A24] mb-3">
                  Create New Promo Code
                </h3>
                <form onSubmit={handleCreatePromo} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                      Code (e.g. SUMMER10)
                    </label>
                    <input
                      type="text"
                      required
                      value={newPromoCode}
                      onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                      placeholder="PROMOCODE"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xs font-mono font-bold text-xs uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={70}
                      value={newPromoDiscount}
                      onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xs font-bold text-xs"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                      Description / Campaign
                    </label>
                    <input
                      type="text"
                      value={newPromoDesc}
                      onChange={(e) => setNewPromoDesc(e.target.value)}
                      placeholder="e.g. Eid Festival Special"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#1A1A24] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                    >
                      Publish Code
                    </button>
                  </div>
                </form>
              </div>

              {/* Promo Codes Table */}
              <div className="bg-white border border-[#E8E6E1] rounded-xs shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF9F7] border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Coupon Code</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Campaign Description</th>
                      <th className="py-3 px-4">Redemptions</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {promoCodes.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF9F7] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#1A1A24]">
                          {c.code}
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-700">
                          {c.discountPercent}% OFF
                        </td>
                        <td className="py-3 px-4 text-neutral-600">{c.description}</td>
                        <td className="py-3 px-4 font-mono text-neutral-500 tabular-nums">
                          {c.usageCount} uses
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleTogglePromo(c.id)}
                            className={`px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                              c.isActive
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                            }`}
                          >
                            {c.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeletePromo(c.id)}
                            className="p-1 text-neutral-400 hover:text-red-500"
                            title="Delete promo code"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A24] font-display">
                  Store Operations & Policy Settings
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Configure live gold benchmark rates, delivery thresholds, and contact information.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E8E6E1] rounded-xs shadow-2xs space-y-5 text-xs max-w-2xl">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    24K Gold Price per Tola (Benchmark PKR)
                  </label>
                  <input
                    type="number"
                    value={goldRate24K}
                    onChange={(e) => setGoldRate24K(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    22K Jewellery Gold Rate per Tola (Benchmark PKR)
                  </label>
                  <input
                    type="number"
                    value={goldRate22K}
                    onChange={(e) => setGoldRate22K(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Nationwide Free Shipping Minimum Threshold (PKR Rs.)
                  </label>
                  <input
                    type="number"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs font-mono font-semibold"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  {settingsSaved && (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Settings updated successfully.
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSettingsSaved(true);
                      setTimeout(() => setSettingsSaved(false), 2500);
                    }}
                    className="ml-auto px-6 py-2.5 bg-[#1A1A24] text-white hover:bg-black font-bold text-xs uppercase tracking-wider transition-colors rounded-xs cursor-pointer"
                  >
                    Save Operational Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      <AddEditProductModal
        isOpen={isAddEditProductOpen}
        onClose={() => {
          setIsAddEditProductOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      {/* Edit Order Modal */}
      <EditOrderModal
        isOpen={isEditOrderOpen}
        onClose={() => {
          setIsEditOrderOpen(false);
          setEditingOrder(null);
        }}
        order={editingOrder}
        onSave={(updated) => {
          onUpdateOrder(updated);
        }}
      />
    </div>
  );
};
