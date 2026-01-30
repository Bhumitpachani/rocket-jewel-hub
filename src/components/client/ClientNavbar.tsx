import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const ClientNavbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              src={logo} 
              alt="Rocket Diamond" 
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex flex-col">
              <span className="font-display text-xl font-semibold text-gradient">
                Rocket Diamond
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                B2B Excellence
              </span>
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
                  isActive(link.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}>
                  {link.label}
                </span>
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-secondary rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-all duration-300 shimmer"
            >
              Login
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-foreground">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ClientNavbar;
