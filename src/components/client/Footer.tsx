import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Rocket Diamond" className="h-10 w-auto" />
              <span className="font-display text-xl font-semibold text-gradient">
                Rocket Diamond
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Your trusted B2B partner for premium diamonds and fine jewelry. 
              Connecting jewelers with exceptional quality stones since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Products', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@rocketdiamond.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Diamond District, NYC</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Rocket Diamond. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
