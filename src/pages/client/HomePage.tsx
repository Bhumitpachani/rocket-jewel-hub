import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Diamond, Gem, Award, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Diamond,
      title: 'Premium Quality',
      description: 'GIA certified diamonds with exceptional clarity and brilliance'
    },
    {
      icon: Gem,
      title: 'Wholesale Pricing',
      description: 'Competitive B2B rates with volume discounts available'
    },
    {
      icon: Award,
      title: 'Trusted Partner',
      description: 'Over 500 jeweler partners across North America'
    }
  ];

  const categories = [
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop' },
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop' },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop' },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center diamond-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-medium text-muted-foreground mb-6">
                B2B Diamond Excellence
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient">Premium Diamonds</span>
                <br />
                <span className="text-foreground">For Exceptional Jewelers</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Partner with Rocket Diamond for unparalleled access to GIA-certified stones, 
                competitive wholesale pricing, and dedicated B2B support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shimmer"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-all duration-300"
                >
                  Become a Partner
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative diamond shapes */}
        <motion.div 
          className="absolute right-10 top-1/4 w-64 h-64 border border-border/30 rotate-45 rounded-3xl"
          animate={{ rotate: [45, 55, 45], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute right-32 bottom-1/4 w-32 h-32 bg-secondary/50 rotate-45 rounded-2xl pulse-glow"
          animate={{ rotate: [45, 35, 45] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Why Choose Rocket Diamond</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the foundation for your jewelry business success with quality, value, and trust.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center hover:glow-diamond transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">Browse Categories</h2>
              <p className="text-muted-foreground">Discover our curated collection of fine jewelry</p>
            </div>
            <Link 
              to="/products" 
              className="hidden sm:flex items-center gap-2 text-primary hover:underline"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <Link to="/products">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-display text-xl font-semibold text-foreground">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Partner with Excellence?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join over 500 jewelers who trust Rocket Diamond for their wholesale needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
