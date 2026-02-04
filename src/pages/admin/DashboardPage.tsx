import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { adjustAllProductPrices } from '@/store/appSlice';
import { Package, Store, ShoppingCart, TrendingUp, Users, DollarSign, Percent, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { dashboardStats, products, jewelerShops } = useAppSelector((state) => state.app);
  
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [priceAdjustment, setPriceAdjustment] = useState(10);
  const [adjustmentType, setAdjustmentType] = useState<'increase' | 'decrease'>('increase');

  const handlePriceAdjustment = () => {
    dispatch(adjustAllProductPrices({ percentage: priceAdjustment, type: adjustmentType }));
    toast.success(
      `All product prices ${adjustmentType === 'increase' ? 'increased' : 'decreased'} by ${priceAdjustment}%`
    );
    setIsPriceDialogOpen(false);
    setPriceAdjustment(10);
  };

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
        className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
        </div>
        <Button onClick={() => setIsPriceDialogOpen(true)} className="shimmer gap-2">
          <Percent className="w-4 h-4" />
          Bulk Price Adjustment
        </Button>
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

      {/* Bulk Price Adjustment Dialog */}
      <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-primary" />
              Bulk Price Adjustment
            </DialogTitle>
            <DialogDescription>
              Adjust prices for all {products.length} products at once. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Adjustment Type */}
            <div className="flex gap-2">
              <Button
                variant={adjustmentType === 'increase' ? 'default' : 'outline'}
                onClick={() => setAdjustmentType('increase')}
                className="flex-1 gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                Increase
              </Button>
              <Button
                variant={adjustmentType === 'decrease' ? 'default' : 'outline'}
                onClick={() => setAdjustmentType('decrease')}
                className="flex-1 gap-2"
              >
                <ArrowDown className="w-4 h-4" />
                Decrease
              </Button>
            </div>

            {/* Percentage Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Adjustment Percentage</Label>
                <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                  <span className="font-bold text-xl text-primary">{priceAdjustment}%</span>
                </div>
              </div>
              <Slider
                value={[priceAdjustment]}
                onValueChange={(value) => setPriceAdjustment(value[0])}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 bg-secondary/50 rounded-xl space-y-2">
              <p className="text-sm font-medium">Preview Example:</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">$1,000 product will become:</span>
                <span className="font-bold text-primary">
                  ${adjustmentType === 'increase' 
                    ? (1000 * (1 + priceAdjustment / 100)).toLocaleString()
                    : (1000 * (1 - priceAdjustment / 100)).toLocaleString()
                  }
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsPriceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePriceAdjustment} className="shimmer">
              Apply to All Products
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
