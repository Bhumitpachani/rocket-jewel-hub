export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageUrls?: string[]; // Multiple images support
  inStock: boolean;
  minOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  id: string;
  username: string;
  password: string;
  role: 'super_admin' | 'jeweler_admin';
  jewelerShopId?: string;
}

export interface JewelerProduct extends Omit<Product, 'imageUrls'> {
  jewelerShopId: string;
  isOwnProduct: boolean; // true if created by jeweler, false if from super admin
  imageUrls?: string[]; // Multiple images support
}

export interface ProductVisibility {
  productId: string;
  jewelerShopId: string;
  isVisible: boolean;
}

export interface JewelerSettings {
  shopId: string;
  logo: string;
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBannerUrl: string;
  primaryColor: string;
  accentColor: string;
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
  settings?: JewelerSettings;
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
  jewelerProducts: JewelerProduct[];
  productVisibility: ProductVisibility[];
  dashboardStats: DashboardStats;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}
