import { Product, JewelerShop, DashboardStats, JewelerProduct, ProductVisibility, JewelerSettings } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Brilliant Cut Diamond Ring',
    description: 'Exquisite 2-carat brilliant cut diamond set in 18k white gold. Perfect for engagement or special occasions.',
    price: 12500,
    category: 'Rings',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 5,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Princess Cut Solitaire',
    description: 'Elegant princess cut diamond solitaire necklace with platinum chain. A timeless classic.',
    price: 8900,
    category: 'Necklaces',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 3,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Diamond Tennis Bracelet',
    description: 'Stunning 5-carat total weight diamond tennis bracelet. Premium quality stones.',
    price: 15800,
    category: 'Bracelets',
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 2,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'Emerald Cut Studs',
    description: 'Sophisticated emerald cut diamond stud earrings. 1.5 carats each.',
    price: 6500,
    category: 'Earrings',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 10,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Oval Diamond Pendant',
    description: 'Beautiful oval cut diamond pendant with delicate gold chain. Perfect centerpiece.',
    price: 7200,
    category: 'Necklaces',
    imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop',
    inStock: false,
    minOrder: 5,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-10'
  },
  {
    id: '6',
    name: 'Marquise Diamond Ring',
    description: 'Vintage-inspired marquise cut diamond ring with intricate band detailing.',
    price: 9800,
    category: 'Rings',
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 4,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-08'
  }
];

const mockJewelerSettings: Record<string, JewelerSettings> = {
  '1': {
    shopId: '1',
    logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop',
    storeName: 'Diamond Palace',
    tagline: 'Where Brilliance Meets Elegance',
    email: 'robert@diamondpalace.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Lane, New York, NY',
    heroTitle: 'Discover Timeless Elegance',
    heroSubtitle: 'Curated collection of the finest diamonds and jewelry for the discerning customer',
    heroBannerUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=600&fit=crop',
    primaryColor: '#1e3a5f',
    accentColor: '#c9a961'
  },
  '2': {
    shopId: '2',
    logo: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop',
    storeName: 'Crown Jewelers',
    tagline: 'Royalty in Every Piece',
    email: 'sarah@crownjewelers.com',
    phone: '+1 (555) 234-5678',
    address: '456 Royal Street, Los Angeles, CA',
    heroTitle: 'Crown Your Moments',
    heroSubtitle: 'Exceptional jewelry for life\'s most precious occasions',
    heroBannerUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&h=600&fit=crop',
    primaryColor: '#4a1942',
    accentColor: '#d4af37'
  }
};

export const mockJewelerShops: JewelerShop[] = [
  {
    id: '1',
    name: 'Diamond Palace',
    ownerName: 'Robert Chen',
    email: 'robert@diamondpalace.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Lane',
    city: 'New York',
    state: 'NY',
    isActive: true,
    joinedDate: '2023-06-15',
    totalOrders: 156,
    settings: mockJewelerSettings['1']
  },
  {
    id: '2',
    name: 'Crown Jewelers',
    ownerName: 'Sarah Mitchell',
    email: 'sarah@crownjewelers.com',
    phone: '+1 (555) 234-5678',
    address: '456 Royal Street',
    city: 'Los Angeles',
    state: 'CA',
    isActive: true,
    joinedDate: '2023-08-20',
    totalOrders: 89,
    settings: mockJewelerSettings['2']
  },
  {
    id: '3',
    name: 'Eternal Gems',
    ownerName: 'Michael Johnson',
    email: 'michael@eternalgems.com',
    phone: '+1 (555) 345-6789',
    address: '789 Diamond Drive',
    city: 'Chicago',
    state: 'IL',
    isActive: true,
    joinedDate: '2023-10-05',
    totalOrders: 67
  },
  {
    id: '4',
    name: 'Radiant Treasures',
    ownerName: 'Emily Davis',
    email: 'emily@radianttreasures.com',
    phone: '+1 (555) 456-7890',
    address: '321 Sparkle Avenue',
    city: 'Miami',
    state: 'FL',
    isActive: false,
    joinedDate: '2023-11-12',
    totalOrders: 23
  },
  {
    id: '5',
    name: 'Prestige Diamonds',
    ownerName: 'James Wilson',
    email: 'james@prestigediamonds.com',
    phone: '+1 (555) 567-8901',
    address: '654 Elite Boulevard',
    city: 'Houston',
    state: 'TX',
    isActive: true,
    joinedDate: '2023-12-01',
    totalOrders: 45
  }
];

export const mockJewelerProducts: JewelerProduct[] = [
  {
    id: 'jp-1',
    jewelerShopId: '1',
    name: 'Custom Diamond Palace Signature Ring',
    description: 'Exclusive signature ring designed by Diamond Palace. One-of-a-kind craftsmanship.',
    price: 18500,
    category: 'Rings',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 1,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    isOwnProduct: true
  },
  {
    id: 'jp-2',
    jewelerShopId: '1',
    name: 'Palace Collection Earrings',
    description: 'Part of our exclusive Palace Collection. Handcrafted diamond earrings.',
    price: 7800,
    category: 'Earrings',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 2,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    isOwnProduct: true
  },
  {
    id: 'jp-3',
    jewelerShopId: '2',
    name: 'Crown Royal Necklace',
    description: 'The Crown Royal Collection centerpiece. A stunning statement necklace.',
    price: 22000,
    category: 'Necklaces',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    inStock: true,
    minOrder: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    isOwnProduct: true
  }
];

export const mockProductVisibility: ProductVisibility[] = [
  // Diamond Palace (shop 1) visibility settings
  { productId: '1', jewelerShopId: '1', isVisible: true },
  { productId: '2', jewelerShopId: '1', isVisible: true },
  { productId: '3', jewelerShopId: '1', isVisible: true },
  { productId: '4', jewelerShopId: '1', isVisible: false }, // Hidden from catalog
  { productId: '5', jewelerShopId: '1', isVisible: true },
  { productId: '6', jewelerShopId: '1', isVisible: true },
  
  // Crown Jewelers (shop 2) visibility settings
  { productId: '1', jewelerShopId: '2', isVisible: true },
  { productId: '2', jewelerShopId: '2', isVisible: false }, // Hidden from catalog
  { productId: '3', jewelerShopId: '2', isVisible: true },
  { productId: '4', jewelerShopId: '2', isVisible: true },
  { productId: '5', jewelerShopId: '2', isVisible: true },
  { productId: '6', jewelerShopId: '2', isVisible: false }, // Hidden from catalog
];

export const mockDashboardStats: DashboardStats = {
  totalProducts: 156,
  totalShops: 48,
  activeShops: 42,
  totalOrders: 1247,
  revenue: 2840000
};
