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
    <BrowserRouter>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ManageProductsPage />} />
          <Route path="shops" element={<ManageShopsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
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
