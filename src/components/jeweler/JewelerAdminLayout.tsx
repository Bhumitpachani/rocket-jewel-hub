import { NavLink, Outlet, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Settings, ArrowLeft, Menu, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useAppSelector } from '@/store';
import ThemeToggle from '@/components/ThemeToggle';

const JewelerAdminLayout = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const shop = useAppSelector(state => 
    state.app.jewelerShops.find(s => s.id === shopId)
  );

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Shop Not Found</h1>
          <p className="text-muted-foreground">This shop doesn't exist.</p>
          <Link to="/admin" className="mt-4 inline-block text-primary hover:underline">
            Return to Admin
          </Link>
        </div>
      </div>
    );
  }

  const settings = shop.settings;
  const storeName = settings?.storeName || shop.name;
  const logoUrl = settings?.logo;

  const navItems = [
    { to: `/jeweler-admin/${shopId}`, icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: `/jeweler-admin/${shopId}/products`, icon: Package, label: 'Manage Products' },
    { to: `/jeweler-admin/${shopId}/settings`, icon: Settings, label: 'Store Settings' }
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
              <Link to={`/jeweler-admin/${shopId}`} className="flex items-center gap-3">
                {logoUrl ? (
                  <img src={logoUrl} alt={storeName} className="h-10 w-10 rounded-full object-cover border-2 border-primary/20" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{storeName.charAt(0)}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-display text-lg font-semibold text-gradient line-clamp-1">
                    {storeName}
                  </span>
                  <span className="text-xs text-muted-foreground">Jeweler Admin</span>
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
            
            {/* View Store Link */}
            <a
              href={`/shop/${shopId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium">View Store</span>
            </a>
          </nav>

          {/* Back to Main Admin */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <Link 
              to="/admin/shops"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Admin</span>
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
            <span className="font-display font-semibold text-foreground">{storeName}</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href={`/shop/${shopId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border p-4 justify-end">
          <ThemeToggle />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet context={{ shop, settings }} />
        </main>
      </div>
    </div>
  );
};

export default JewelerAdminLayout;
