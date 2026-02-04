import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Diamond, Gem, Award, ArrowRight, Shield, Globe, Users, Sparkles, Star, CheckCircle } from 'lucide-react';
import { useAppSelector } from '@/store';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const { dashboardStats } = useAppSelector((state) => state.app);

  const features = [
    {
      icon: Diamond,
      title: 'Premium Quality',
      description: 'GIA certified diamonds with exceptional clarity and brilliance for your discerning customers.'
    },
    {
      icon: Gem,
      title: 'Wholesale Pricing',
      description: 'Competitive B2B rates with volume discounts that help grow your profit margins.'
    },
    {
      icon: Award,
      title: 'Trusted Partner',
      description: 'Over 500 jeweler partners across North America trust us for their inventory needs.'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Every piece backed by our satisfaction guarantee and certification of authenticity.'
    },
    {
      icon: Globe,
      title: 'Global Sourcing',
      description: 'Ethically sourced diamonds from premier mines worldwide with full traceability.'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: '24/7 partner support with dedicated account managers for personalized service.'
    }
  ];

  const categories = [
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop', count: 120 },
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop', count: 85 },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop', count: 64 },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop', count: 92 }
  ];

  const stats = [
    { value: '500+', label: 'Partner Jewelers', icon: Users },
    { value: '$50M+', label: 'Annual Volume', icon: Gem },
    { value: '99.8%', label: 'Satisfaction Rate', icon: Star },
    { value: '24/7', label: 'Partner Support', icon: Shield }
  ];

  const testimonials = [
    {
      quote: "Rocket Diamond transformed our inventory sourcing. Their quality and pricing are unmatched in the industry.",
      author: "Sarah Chen",
      role: "Owner, Diamond Palace NYC",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      quote: "The B2B platform is incredibly intuitive. We've increased our margins by 15% since partnering.",
      author: "Michael Torres",
      role: "CEO, Crown Jewelers",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      quote: "Exceptional service and premium quality. Our customers notice the difference immediately.",
      author: "Jennifer Smith",
      role: "Director, Prestige Gems",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  const benefits = [
    "Access to exclusive GIA-certified inventory",
    "Volume-based pricing tiers with up to 40% savings",
    "Fast shipping with white-label packaging",
    "Real-time inventory and pricing updates",
    "Flexible payment terms for qualified partners",
    "Marketing materials and product imagery included"
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 diamond-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/10" />
        
        {/* Animated Background Shapes */}
        <motion.div 
          style={{ y }}
          className="absolute right-[10%] top-[20%] w-72 h-72 border border-primary/20 rotate-45 rounded-3xl opacity-60"
          animate={{ rotate: [45, 55, 45], scale: [1, 1.02, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute right-[20%] bottom-[25%] w-40 h-40 bg-primary/5 rotate-45 rounded-2xl"
          animate={{ rotate: [45, 35, 45], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute left-[5%] bottom-[20%] w-24 h-24 border border-primary/10 rotate-12 rounded-xl"
          animate={{ rotate: [12, 22, 12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  B2B Diamond Excellence
                </span>
              </motion.div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                <span className="text-gradient">Premium Diamonds</span>
                <br />
                <span className="text-foreground">For Exceptional</span>
                <br />
                <span className="text-foreground">Jewelers</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Partner with Rocket Diamond for unparalleled access to GIA-certified stones, 
                competitive wholesale pricing, and dedicated B2B support that scales with your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shimmer shadow-lg"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-foreground rounded-xl font-semibold text-lg hover:bg-secondary transition-all duration-300"
                >
                  Become a Partner
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>GIA Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Ethically Sourced</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Insured Shipping</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=700&fit=crop"
                    alt="Premium Diamond Jewelry"
                    className="rounded-3xl shadow-2xl object-cover w-full max-w-lg mx-auto"
                  />
                </motion.div>
                
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -left-8 bottom-20 glass-card rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">500+</p>
                      <p className="text-sm text-muted-foreground">Partner Jewelers</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Quality Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-4 top-20 glass-card rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">99.8%</p>
                      <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-display text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Built for <span className="text-gradient">Professional Jewelers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We provide the foundation for your jewelry business success with quality, value, and trust.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:glow-diamond transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Collections
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">Browse Categories</h2>
              <p className="text-muted-foreground text-lg">Discover our curated collection of fine jewelry</p>
            </div>
            <Link 
              to="/products" 
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl hover:bg-secondary transition-colors text-foreground font-medium"
            >
              View All Products <ArrowRight className="w-4 h-4" />
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
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count}+ Products</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Partner Benefits
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Everything You Need to <span className="text-gradient">Grow Your Business</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Join our partner network and unlock exclusive benefits designed to help your jewelry business thrive in today's competitive market.
              </p>
              
              <div className="grid gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shimmer"
              >
                Apply for Partnership
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=700&fit=crop"
                alt="Jewelry Collection"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 glass-card rounded-2xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Trusted jewelers partnering with us nationwide</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-gradient">Partners Say</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Hear from jewelers who have transformed their business with Rocket Diamond
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 diamond-pattern opacity-20" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Diamond className="w-10 h-10 text-primary" />
              </motion.div>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Partner with <span className="text-gradient">Excellence?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join over 500 jewelers who trust Rocket Diamond for their wholesale needs. 
                Apply today and start transforming your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all shimmer"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-foreground rounded-xl font-semibold text-lg hover:bg-secondary transition-all"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
