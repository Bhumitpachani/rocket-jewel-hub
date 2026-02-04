import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from '@/store';
import { initializeApp } from '@/store/appSlice';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from '@/components/LoadingScreen';
import ThemeProvider from '@/components/ThemeProvider';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';

// Client pages
import ClientLayout from '@/components/client/ClientLayout';
import HomePage from '@/pages/client/HomePage';
import AboutPage from '@/pages/client/AboutPage';
import ProductsPage from '@/pages/client/ProductsPage';
import ContactPage from '@/pages/client/ContactPage';

// Admin pages
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import ManageProductsPage from '@/pages/admin/ManageProductsPage';
import ManageShopsPage from '@/pages/admin/ManageShopsPage';
import ThemeSettingsPage from '@/pages/admin/ThemeSettingsPage';

// Jeweler Store pages
import JewelerStoreLayout from '@/components/jeweler/JewelerStoreLayout';
import JewelerHomePage from '@/pages/jeweler/JewelerHomePage';
import JewelerProductsPage from '@/pages/jeweler/JewelerProductsPage';
import JewelerContactPage from '@/pages/jeweler/JewelerContactPage';

// Jeweler Admin pages
import JewelerAdminLayout from '@/components/jeweler/JewelerAdminLayout';
import JewelerDashboardPage from '@/pages/jeweler/JewelerDashboardPage';
import JewelerManageProductsPage from '@/pages/jeweler/JewelerManageProductsPage';
import JewelerSettingsPage from '@/pages/jeweler/JewelerSettingsPage';

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// App content that uses Redux
const AppContent = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isInitialized } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeApp());
    }
  }, [dispatch, isInitialized]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Client Routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Super Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ManageProductsPage />} />
            <Route path="shops" element={<ManageShopsPage />} />
            <Route path="theme" element={<ThemeSettingsPage />} />
          </Route>

          {/* Jeweler Store Routes (Client-facing) */}
          <Route path="/shop/:shopId" element={<JewelerStoreLayout />}>
            <Route index element={<JewelerHomePage />} />
            <Route path="products" element={<JewelerProductsPage />} />
            <Route path="contact" element={<JewelerContactPage />} />
          </Route>

          {/* Jeweler Admin Routes */}
          <Route path="/jeweler-admin/:shopId" element={<JewelerAdminLayout />}>
            <Route index element={<JewelerDashboardPage />} />
            <Route path="products" element={<JewelerManageProductsPage />} />
            <Route path="settings" element={<JewelerSettingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
