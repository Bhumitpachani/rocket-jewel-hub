import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Diamond, Shield, Star } from 'lucide-react';
import { useAppSelector } from '@/store';

const JewelerHomePage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const shop = useAppSelector(state => 
    state.app.jewelerShops.find(s => s.id === shopId)
  );
  const settings = shop?.settings;

  const heroTitle = settings?.heroTitle || `Welcome to ${shop?.name}`;
  const heroSubtitle = settings?.heroSubtitle || 'Discover our exquisite collection of fine jewelry';
  const heroBanner = settings?.heroBannerUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=600&fit=crop';

  const features = [
    {
      icon: Diamond,
      title: 'Premium Quality',
      description: 'Every piece is carefully selected for exceptional quality and brilliance.'
    },
    {
      icon: Shield,
      title: 'Certified Authentic',
      description: 'All our diamonds come with certification and authenticity guarantees.'
    },
    {
      icon: Star,
      title: 'Expert Craftsmanship',
      description: 'Decades of expertise in creating timeless jewelry pieces.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to={`/shop/${shopId}/products`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shimmer"
            >
              Browse Catalog
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to providing the finest jewelry experience for our valued customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card p-8 rounded-2xl text-center group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Explore?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our complete catalog of premium diamonds and fine jewelry. 
            Contact us for wholesale pricing and bulk orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/shop/${shopId}/products`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300"
            >
              View Catalog
            </Link>
            <Link
              to={`/shop/${shopId}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground rounded-xl font-semibold hover:bg-secondary transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JewelerHomePage;
