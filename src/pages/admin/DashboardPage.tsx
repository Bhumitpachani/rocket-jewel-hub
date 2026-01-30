import { motion } from 'framer-motion';
import { useAppSelector } from '@/store';
import { Package, Store, ShoppingCart, TrendingUp, Users, DollarSign } from 'lucide-react';

const DashboardPage = () => {
  const { dashboardStats, products, jewelerShops } = useAppSelector((state) => state.app);

  const stats = [
    {
      icon: Package,
      label: 'Total Products',
      value: dashboardStats.totalProducts,
      change: '+12%',
      positive: true
    },
    {
      icon: Store,
      label: 'Partner Shops',
      value: dashboardStats.totalShops,
      change: '+8%',
      positive: true
    },
    {
      icon: Users,
      label: 'Active Partners',
      value: dashboardStats.activeShops,
      change: '+15%',
      positive: true
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: dashboardStats.totalOrders.toLocaleString(),
      change: '+23%',
      positive: true
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: `$${(dashboardStats.revenue / 1000000).toFixed(2)}M`,
      change: '+18%',
      positive: true
    },
    {
      icon: TrendingUp,
      label: 'Avg. Order Value',
      value: `$${Math.round(dashboardStats.revenue / dashboardStats.totalOrders).toLocaleString()}`,
      change: '+5%',
      positive: true
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="font-display text-3xl font-bold text-gradient">{stat.value}</div>
            <div className="text-muted-foreground text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-xl font-semibold mb-4">Recent Products</h2>
          <div className="space-y-4">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${product.price.toLocaleString()}</div>
                  <div className={`text-xs ${product.inStock ? 'text-emerald-400' : 'text-red-400'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-xl font-semibold mb-4">Partner Shops</h2>
          <div className="space-y-4">
            {jewelerShops.slice(0, 4).map((shop) => (
              <div key={shop.id} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{shop.name}</h3>
                  <p className="text-sm text-muted-foreground">{shop.city}, {shop.state}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{shop.totalOrders} orders</div>
                  <div className={`text-xs ${shop.isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {shop.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
