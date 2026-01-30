import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store';
import { addJewelerShop, updateJewelerShop, deleteJewelerShop } from '@/store/appSlice';
import { JewelerShop } from '@/store/types';
import { Plus, Edit2, Trash2, Search, Store, Mail, Phone, MapPin, ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const ManageShopsPage = () => {
  const dispatch = useAppDispatch();
  const { jewelerShops } = useAppSelector((state) => state.app);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<JewelerShop | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    isActive: true
  });

  const filteredShops = jewelerShops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateDialog = () => {
    setEditingShop(null);
    setFormData({
      name: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (shop: JewelerShop) => {
    setEditingShop(shop);
    setFormData({
      name: shop.name,
      ownerName: shop.ownerName,
      email: shop.email,
      phone: shop.phone,
      address: shop.address,
      city: shop.city,
      state: shop.state,
      isActive: shop.isActive
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const shopData: JewelerShop = {
      id: editingShop?.id || Date.now().toString(),
      name: formData.name,
      ownerName: formData.ownerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      isActive: formData.isActive,
      joinedDate: editingShop?.joinedDate || new Date().toISOString().split('T')[0],
      totalOrders: editingShop?.totalOrders || 0
    };

    if (editingShop) {
      dispatch(updateJewelerShop(shopData));
      toast.success('Shop updated successfully!');
    } else {
      dispatch(addJewelerShop(shopData));
      toast.success('Shop added successfully!');
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this shop?')) {
      dispatch(deleteJewelerShop(id));
      toast.success('Shop deleted successfully!');
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Manage Jeweler Shops</h1>
          <p className="text-muted-foreground">Add, edit, and manage your partner jewelers.</p>
        </div>
        <Button onClick={openCreateDialog} className="shimmer">
          <Plus className="w-4 h-4 mr-2" />
          Add Shop
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shops..."
            className="pl-10 bg-secondary border-border"
          />
        </div>
      </motion.div>

      {/* Shops Grid */}
      {filteredShops.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{shop.name}</h3>
                    <p className="text-sm text-muted-foreground">{shop.ownerName}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  shop.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {shop.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{shop.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{shop.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{shop.city}, {shop.state}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-2xl font-bold text-gradient">{shop.totalOrders}</span>
                  <span className="text-sm text-muted-foreground ml-1">orders</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/jeweler-admin/${shop.id}`}
                    className="p-2 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors"
                    title="Jeweler Admin"
                  >
                    <Settings className="w-4 h-4 text-primary" />
                  </Link>
                  <a
                    href={`/shop/${shop.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary rounded-lg hover:bg-accent transition-colors"
                    title="View Store"
                  >
                    <ExternalLink className="w-4 h-4 text-foreground" />
                  </a>
                  <button
                    onClick={() => openEditDialog(shop)}
                    className="p-2 bg-secondary rounded-lg hover:bg-accent transition-colors"
                    title="Edit Shop"
                  >
                    <Edit2 className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(shop.id)}
                    className="p-2 bg-destructive/20 rounded-lg hover:bg-destructive/30 transition-colors"
                    title="Delete Shop"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
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
          className="text-center py-20 glass-card rounded-2xl"
        >
          <Store className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-2xl font-semibold mb-2">No Shops Found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try a different search term.' : 'Start by adding your first partner shop.'}
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Shop
          </Button>
        </motion.div>
      )}

      {/* Shop Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingShop ? 'Edit Shop' : 'Add New Shop'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Shop Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Diamond Palace"
                required
                className="bg-secondary border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Owner Name *</label>
              <Input
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                placeholder="John Doe"
                required
                className="bg-secondary border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@shop.com"
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street"
                className="bg-secondary border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New York"
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <Input
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="NY"
                  required
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Active Status</label>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 shimmer">
                {editingShop ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageShopsPage;
