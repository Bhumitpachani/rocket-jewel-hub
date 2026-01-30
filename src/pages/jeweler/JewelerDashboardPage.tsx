import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Eye, EyeOff, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react';
import { useAppSelector } from '@/store';

const JewelerDashboardPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  
  const shop = useAppSelector(state => 
    state.app.jewelerShops.find(s => s.id === shopId)
  );
  const products = useAppSelector(state => state.app.products);
  const jewelerProducts = useAppSelector(state => 
    state.app.jewelerProducts.filter(jp => jp.jewelerShopId === shopId)
  );
  const productVisibility = useAppSelector(state => 
    state.app.productVisibility.filter(pv => pv.jewelerShopId === shopId)
  );

  // Calculate stats
  const ownProductsCount = jewelerProducts.length;
  const visibleProductsCount = products.filter(p => {
    const visibility = productVisibility.find(pv => pv.productId === p.id);
    return visibility ? visibility.isVisible : true;
  }).length + jewelerProducts.length;
  const hiddenProductsCount = products.length - (visibleProductsCount - jewelerProducts.length);

  const stats = [
    {
      icon: Package,
      label: 'Your Products',
      value: ownProductsCount,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Eye,
      label: 'Visible in Catalog',
      value: visibleProductsCount,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: EyeOff,
      label: 'Hidden Products',
      value: hiddenProductsCount,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: shop?.totalOrders || 0,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-foreground mb-2"
        >
          Welcome back!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Manage your store, products, and settings from here.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={`/jeweler-admin/${shopId}/products`}
            className="p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-center"
          >
            <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium text-foreground">Manage Products</p>
            <p className="text-sm text-muted-foreground">Add or hide products</p>
          </a>
          <a
            href={`/jeweler-admin/${shopId}/settings`}
            className="p-4 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors text-center"
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="font-medium text-foreground">Store Settings</p>
            <p className="text-sm text-muted-foreground">Update branding</p>
          </a>
          <a
            href={`/shop/${shopId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-center"
          >
            <Eye className="w-8 h-8 mx-auto mb-2 text-foreground" />
            <p className="font-medium text-foreground">View Store</p>
            <p className="text-sm text-muted-foreground">See live preview</p>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default JewelerDashboardPage;
