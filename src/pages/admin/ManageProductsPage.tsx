import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { addProduct, updateProduct, deleteProduct } from '@/store/appSlice';
import { Product } from '@/store/types';
import { Plus, Edit2, Trash2, X, Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const ManageProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.app);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Rings',
    imageUrl: '',
    inStock: true,
    minOrder: '1'
  });

  const categories = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Pendants'];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Rings',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      inStock: true,
      minOrder: '1'
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
      minOrder: product.minOrder.toString()
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrl,
      inStock: formData.inStock,
      minOrder: parseInt(formData.minOrder),
      createdAt: editingProduct?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editingProduct) {
      dispatch(updateProduct(productData));
      toast.success('Product updated successfully!');
    } else {
      dispatch(addProduct(productData));
      toast.success('Product created successfully!');
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
      toast.success('Product deleted successfully!');
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
          <h1 className="font-display text-3xl font-bold">Manage Products</h1>
          <p className="text-muted-foreground">Add, edit, and manage your product catalog.</p>
        </div>
        <Button onClick={openCreateDialog} className="shimmer">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
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
            placeholder="Search products..."
            className="pl-10 bg-secondary border-border"
          />
        </div>
      </motion.div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="relative aspect-square">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => openEditDialog(product)}
                    className="p-3 bg-secondary rounded-xl hover:bg-accent transition-colors"
                  >
                    <Edit2 className="w-5 h-5 text-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-3 bg-destructive/20 rounded-xl hover:bg-destructive/30 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-semibold truncate mt-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-gradient">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out'}
                  </span>
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
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-2xl font-semibold mb-2">No Products Found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try a different search term.' : 'Start by adding your first product.'}
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </motion.div>
      )}

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Diamond Ring"
                required
                className="bg-secondary border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                required
                rows={3}
                className="bg-secondary border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price ($) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="1000"
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Min. Order *</label>
                <Input
                  type="number"
                  value={formData.minOrder}
                  onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                  placeholder="1"
                  required
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="bg-secondary border-border"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">In Stock</label>
              <Switch
                checked={formData.inStock}
                onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 shimmer">
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageProductsPage;
