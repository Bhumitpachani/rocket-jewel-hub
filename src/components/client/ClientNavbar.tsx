import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import ThemeToggle from '@/components/ThemeToggle';

const ClientNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        isScrolled 
          ? 'pt-4 px-4 sm:px-6' 
          : 'pt-0 px-0'
      }`}
    >
      <div 
        className={`container mx-auto transition-all duration-500 ${
          isScrolled 
            ? 'glass-card border border-primary/10 rounded-2xl md:rounded-full shadow-lg shadow-primary/5 max-w-5xl px-4 md:px-8' 
            : 'bg-transparent border-b border-transparent px-6'
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-14 md:h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <motion.img 
              src={logo} 
              alt="Rocket Diamond" 
              className={`w-auto transition-all duration-500 ${
                isScrolled ? 'h-8 md:h-10' : 'h-12'
              }`}
              whileHover={{ scale: 1.05 }}
            />
            <div className={`flex flex-col transition-all duration-500 ${
              isScrolled ? 'hidden sm:flex' : 'flex'
            }`}>
              <span className={`font-display font-semibold text-gradient transition-all duration-500 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                Rocket Diamond
              </span>
              {!isScrolled && (
                <span className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">
                  B2B Excellence
                </span>
              )}
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-1.5 rounded-full transition-all duration-300"
              >
                <span className={`text-sm font-medium transition-colors ${
                  isActive(link.to) ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                }`}>
                  {link.label}
                </span>
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/5 rounded-full -z-10"
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
              to="/login"
              className={`hidden sm:flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all duration-500 shadow-sm shadow-primary/20 ${
                isScrolled ? 'px-4 py-1.5 rounded-full' : 'px-5 py-2.5 rounded-xl'
              }`}
            >
              Login
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 text-foreground hover:bg-primary/5 transition-colors ${
                isScrolled ? 'rounded-full' : 'rounded-lg'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-primary/5 overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl transition-all ${
                      isActive(link.to) 
                        ? 'bg-primary/5 text-primary' 
                        : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                    }`}
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
                <div className="pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-primary text-primary-foreground rounded-xl text-center font-medium text-sm shadow-lg shadow-primary/20"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default ClientNavbar;
