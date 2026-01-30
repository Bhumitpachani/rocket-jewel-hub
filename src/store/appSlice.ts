import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Product, JewelerShop, JewelerProduct, ProductVisibility, JewelerSettings } from './types';
import { mockProducts, mockJewelerShops, mockDashboardStats, mockJewelerProducts, mockProductVisibility } from './mockData';

const initialState: AppState = {
  products: [],
  jewelerShops: [],
  jewelerProducts: [],
  productVisibility: [],
  dashboardStats: {
    totalProducts: 0,
    totalShops: 0,
    activeShops: 0,
    totalOrders: 0,
    revenue: 0
  },
  isLoading: true,
  isInitialized: false,
  error: null
};

// Simulate fetching data from Firebase
export const initializeApp = createAsyncThunk(
  'app/initialize',
  async () => {
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      products: mockProducts,
      jewelerShops: mockJewelerShops,
      jewelerProducts: mockJewelerProducts,
      productVisibility: mockProductVisibility,
      dashboardStats: mockDashboardStats
    };
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Product actions
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.dashboardStats.totalProducts += 1;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.dashboardStats.totalProducts -= 1;
    },
    
    // Jeweler Shop actions
    addJewelerShop: (state, action: PayloadAction<JewelerShop>) => {
      state.jewelerShops.push(action.payload);
      state.dashboardStats.totalShops += 1;
      if (action.payload.isActive) {
        state.dashboardStats.activeShops += 1;
      }
    },
    updateJewelerShop: (state, action: PayloadAction<JewelerShop>) => {
      const index = state.jewelerShops.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        const wasActive = state.jewelerShops[index].isActive;
        const isNowActive = action.payload.isActive;
        state.jewelerShops[index] = action.payload;
        
        if (wasActive && !isNowActive) {
          state.dashboardStats.activeShops -= 1;
        } else if (!wasActive && isNowActive) {
          state.dashboardStats.activeShops += 1;
        }
      }
    },
    deleteJewelerShop: (state, action: PayloadAction<string>) => {
      const shop = state.jewelerShops.find(s => s.id === action.payload);
      if (shop) {
        if (shop.isActive) {
          state.dashboardStats.activeShops -= 1;
        }
        state.dashboardStats.totalShops -= 1;
      }
      state.jewelerShops = state.jewelerShops.filter(s => s.id !== action.payload);
    },

    // Jeweler Settings actions
    updateJewelerSettings: (state, action: PayloadAction<{ shopId: string; settings: JewelerSettings }>) => {
      const index = state.jewelerShops.findIndex(s => s.id === action.payload.shopId);
      if (index !== -1) {
        state.jewelerShops[index].settings = action.payload.settings;
      }
    },

    // Jeweler Product actions
    addJewelerProduct: (state, action: PayloadAction<JewelerProduct>) => {
      state.jewelerProducts.push(action.payload);
    },
    updateJewelerProduct: (state, action: PayloadAction<JewelerProduct>) => {
      const index = state.jewelerProducts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.jewelerProducts[index] = action.payload;
      }
    },
    deleteJewelerProduct: (state, action: PayloadAction<string>) => {
      state.jewelerProducts = state.jewelerProducts.filter(p => p.id !== action.payload);
    },

    // Product Visibility actions
    toggleProductVisibility: (state, action: PayloadAction<{ productId: string; shopId: string }>) => {
      const { productId, shopId } = action.payload;
      const existingIndex = state.productVisibility.findIndex(
        pv => pv.productId === productId && pv.jewelerShopId === shopId
      );
      
      if (existingIndex !== -1) {
        state.productVisibility[existingIndex].isVisible = !state.productVisibility[existingIndex].isVisible;
      } else {
        // If no visibility setting exists, create one (default to visible, then toggle to hidden)
        state.productVisibility.push({
          productId,
          jewelerShopId: shopId,
          isVisible: false
        });
      }
    },
    setProductVisibility: (state, action: PayloadAction<ProductVisibility>) => {
      const { productId, jewelerShopId, isVisible } = action.payload;
      const existingIndex = state.productVisibility.findIndex(
        pv => pv.productId === productId && pv.jewelerShopId === jewelerShopId
      );
      
      if (existingIndex !== -1) {
        state.productVisibility[existingIndex].isVisible = isVisible;
      } else {
        state.productVisibility.push(action.payload);
      }
    },
    
    // Error handling
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.jewelerShops = action.payload.jewelerShops;
        state.jewelerProducts = action.payload.jewelerProducts;
        state.productVisibility = action.payload.productVisibility;
        state.dashboardStats = action.payload.dashboardStats;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load data';
      });
  }
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  addJewelerShop,
  updateJewelerShop,
  deleteJewelerShop,
  updateJewelerSettings,
  addJewelerProduct,
  updateJewelerProduct,
  deleteJewelerProduct,
  toggleProductVisibility,
  setProductVisibility,
  clearError
} = appSlice.actions;

export default appSlice.reducer;
