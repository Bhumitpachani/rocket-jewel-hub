export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  minOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface JewelerShop {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  isActive: boolean;
  joinedDate: string;
  totalOrders: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalShops: number;
  activeShops: number;
  totalOrders: number;
  revenue: number;
}

export interface AppState {
  products: Product[];
  jewelerShops: JewelerShop[];
  dashboardStats: DashboardStats;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}
