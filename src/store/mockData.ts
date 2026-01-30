import { Product, JewelerShop, DashboardStats } from './types';

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
    totalOrders: 156
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
    totalOrders: 89
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

export const mockDashboardStats: DashboardStats = {
  totalProducts: 156,
  totalShops: 48,
  activeShops: 42,
  totalOrders: 1247,
  revenue: 2840000
};
