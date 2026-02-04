import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store';
import ThemeToggle from '@/components/ThemeToggle';

const JewelerStoreLayout = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const location = useLocation();
  const shop = useAppSelector(state => 
    state.app.jewelerShops.find(s => s.id === shopId)
  );

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Store Not Found</h1>
          <p className="text-muted-foreground">This jewelry store doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            Return to Rocket Diamond
          </Link>
        </div>
      </div>
    );
  }

  const settings = shop.settings;
  const storeName = settings?.storeName || shop.name;
  const logoUrl = settings?.logo;

  const navLinks = [
    { to: `/shop/${shopId}`, label: 'Home', exact: true },
    { to: `/shop/${shopId}/products`, label: 'Catalog' },
    { to: `/shop/${shopId}/contact`, label: 'Contact' }
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={`/shop/${shopId}`} className="flex items-center gap-3 group">
              {logoUrl ? (
                <motion.img 
                  src={logoUrl} 
                  alt={storeName} 
                  className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                  whileHover={{ scale: 1.05 }}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{storeName.charAt(0)}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold text-gradient">
                  {storeName}
                </span>
                {settings?.tagline && (
                  <span className="text-xs text-muted-foreground tracking-wide">
                    {settings.tagline}
                  </span>
                )}
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-5 py-2 rounded-lg transition-all duration-300"
                >
                  <span className={`text-sm font-medium transition-colors ${
                    isActive(link.to, link.exact) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    {link.label}
                  </span>
                  {isActive(link.to, link.exact) && (
                    <motion.div
                      layoutId={`activeTab-${shopId}`}
                      className="absolute inset-0 bg-secondary rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                to={`/shop/${shopId}/products`}
                className="hidden sm:flex px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View Catalog
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet context={{ shop, settings }} />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{storeName.charAt(0)}</span>
                </div>
              )}
              <span className="font-display font-semibold text-foreground">{storeName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by <Link to="/" className="text-primary hover:underline">Rocket Diamond</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JewelerStoreLayout;
