import { motion } from 'framer-motion';
import { useAppSelector } from '@/store';
import { Package, ShoppingBag, Filter } from 'lucide-react';
import { useState } from 'react';

const ProductsPage = () => {
  const { products } = useAppSelector((state) => state.app);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 diamond-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-5xl font-bold mb-4">
              Our <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse our curated selection of premium diamonds and fine jewelry, 
              available exclusively for B2B partners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group glass-card rounded-2xl overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      {product.inStock ? (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                          In Stock
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-xs font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-1 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gradient">
                          ${product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground block">
                          Min. order: {product.minOrder} units
                        </span>
                      </div>
                      <button className="p-3 bg-secondary rounded-xl hover:bg-accent transition-colors">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl font-semibold mb-2">No Products Yet</h3>
              <p className="text-muted-foreground">
                Products will appear here once added by the admin.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
