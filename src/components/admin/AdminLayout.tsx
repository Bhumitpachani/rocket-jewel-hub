import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Store, ArrowLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.png';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/shops', icon: Store, label: 'Jeweler Shops' }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-sidebar border-r border-sidebar-border 
        z-50 transform transition-transform duration-300 lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-3">
                <img src={logo} alt="Rocket Diamond" className="h-10 w-auto" />
                <div className="flex flex-col">
                  <span className="font-display text-lg font-semibold text-gradient">
                    Rocket Diamond
                  </span>
                  <span className="text-xs text-muted-foreground">Admin Portal</span>
                </div>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Back to site */}
          <div className="p-4 border-t border-sidebar-border">
            <Link 
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
            <img src={logo} alt="Rocket Diamond" className="h-8 w-auto" />
            <div className="w-10" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
