import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Eye, EyeOff, Search, Package, Pencil, Trash2, X, Images } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleProductVisibility, addJewelerProduct, updateJewelerProduct, deleteJewelerProduct } from '@/store/appSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { JewelerProduct, Product } from '@/store/types';
import ProductDetailsModal from '@/components/product/ProductDetailsModal';
import MultiImageUpload from '@/components/product/MultiImageUpload';

const JewelerManageProductsPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<JewelerProduct | null>(null);
  const [selectedProductForView, setSelectedProductForView] = useState<Product | JewelerProduct | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Get data from Redux
  const products = useAppSelector(state => state.app.products);
  const jewelerProducts = useAppSelector(state => 
    state.app.jewelerProducts.filter(jp => jp.jewelerShopId === shopId)
  );
  const productVisibility = useAppSelector(state => 
    state.app.productVisibility.filter(pv => pv.jewelerShopId === shopId)
  );

  // Get visibility status for a product
  const isProductVisible = (productId: string) => {
    const visibility = productVisibility.find(pv => pv.productId === productId);
    return visibility ? visibility.isVisible : true; // Default to visible
  };

  // Get unique categories
  const categories = useMemo(() => {
    const allProducts = [...products, ...jewelerProducts];
    const cats = new Set(allProducts.map(p => p.category));
    return Array.from(cats).sort();
  }, [products, jewelerProducts]);

  // Filter products
  const filteredSuperAdminProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const filteredJewelerProducts = useMemo(() => {
    return jewelerProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [jewelerProducts, searchQuery, selectedCategory]);

  // Toggle visibility for super admin products
  const handleToggleVisibility = (productId: string) => {
    dispatch(toggleProductVisibility({ productId, shopId: shopId! }));
    const currentlyVisible = isProductVisible(productId);
    toast({
      title: currentlyVisible ? 'Product Hidden' : 'Product Visible',
      description: currentlyVisible 
        ? 'This product is now hidden from your catalog.' 
        : 'This product is now visible in your catalog.'
    });
  };

  // Product form state
  const [formData, setFormData] = useState({
    name: '',
    modelNumber: '',
    description: '',
    price: '',
    category: '',
    imageUrls: [] as string[],
    minOrder: '1',
    inStock: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      modelNumber: '',
      description: '',
      price: '',
      category: '',
      imageUrls: [],
      minOrder: '1',
      inStock: true
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const newProduct: JewelerProduct = {
      id: `jp-${Date.now()}`,
      jewelerShopId: shopId!,
      name: formData.name,
      modelNumber: formData.modelNumber,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrls[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      imageUrls: formData.imageUrls.length > 0 ? formData.imageUrls : undefined,
      inStock: formData.inStock,
      minOrder: parseInt(formData.minOrder) || 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      isOwnProduct: true
    };

    dispatch(addJewelerProduct(newProduct));
    toast({
      title: 'Product Added',
      description: 'Your product has been added to the catalog.'
    });
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = () => {
    if (!editingProduct || !formData.name || !formData.price || !formData.category) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const updatedProduct: JewelerProduct = {
      ...editingProduct,
      name: formData.name,
      modelNumber: formData.modelNumber,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrls[0] || editingProduct.imageUrl,
      imageUrls: formData.imageUrls.length > 0 ? formData.imageUrls : undefined,
      inStock: formData.inStock,
      minOrder: parseInt(formData.minOrder) || 1,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    dispatch(updateJewelerProduct(updatedProduct));
    toast({
      title: 'Product Updated',
      description: 'Your product has been updated.'
    });
    resetForm();
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteJewelerProduct(productId));
    toast({
      title: 'Product Deleted',
      description: 'Your product has been removed from the catalog.'
    });
  };

  const openEditDialog = (product: JewelerProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      modelNumber: product.modelNumber || '',
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrls: product.imageUrls || [product.imageUrl],
      minOrder: product.minOrder.toString(),
      inStock: product.inStock
    });
  };

  const handleViewProduct = (product: Product | JewelerProduct) => {
    setSelectedProductForView(product);
    setIsViewModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-foreground mb-2"
          >
            Manage Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Control which products appear in your catalog and add your own.
          </motion.p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onSubmit={handleAddProduct}
              onCancel={() => {
                resetForm();
                setIsAddDialogOpen(false);
              }}
              submitLabel="Add Product"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-4 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="catalog">
            Catalog Products ({filteredSuperAdminProducts.length})
          </TabsTrigger>
          <TabsTrigger value="own">
            Your Products ({filteredJewelerProducts.length})
          </TabsTrigger>
        </TabsList>

        {/* Catalog Products Tab */}
        <TabsContent value="catalog">
          <div className="space-y-4">
            {filteredSuperAdminProducts.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              filteredSuperAdminProducts.map((product, index) => {
                const visible = isProductVisible(product.id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card rounded-2xl p-4 ${!visible ? 'opacity-60' : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div 
                        className="w-full sm:w-24 h-24 rounded-xl overflow-hidden relative cursor-pointer group"
                        onClick={() => handleViewProduct(product)}
                      >
                        <img
                          src={product.imageUrls?.[0] || product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {product.imageUrls && product.imageUrls.length > 1 && (
                          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-white text-xs flex items-center gap-1">
                            <Images className="w-3 h-3" />
                            {product.imageUrls.length}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="cursor-pointer" onClick={() => handleViewProduct(product)}>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{product.name}</h3>
                              <Badge variant="outline" className="text-xs">Super Admin</Badge>
                            </div>
                            <Badge variant="secondary" className="text-xs mb-2">{product.category}</Badge>
                            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                            {/* Show price in admin */}
                            <p className="text-sm font-medium text-primary mt-2">
                              ${product.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {visible ? 'Visible' : 'Hidden'}
                            </span>
                            <Switch
                              checked={visible}
                              onCheckedChange={() => handleToggleVisibility(product.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </TabsContent>

        {/* Own Products Tab */}
        <TabsContent value="own">
          <div className="space-y-4">
            {filteredJewelerProducts.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">You haven't added any products yet</p>
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Product
                </Button>
              </div>
            ) : (
              filteredJewelerProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div 
                      className="w-full sm:w-24 h-24 rounded-xl overflow-hidden relative cursor-pointer group"
                      onClick={() => handleViewProduct(product)}
                    >
                      <img
                        src={product.imageUrls?.[0] || product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {product.imageUrls && product.imageUrls.length > 1 && (
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-white text-xs flex items-center gap-1">
                          <Images className="w-3 h-3" />
                          {product.imageUrls.length}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="cursor-pointer" onClick={() => handleViewProduct(product)}>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{product.name}</h3>
                            <Badge className="text-xs bg-primary/20 text-primary">Your Product</Badge>
                          </div>
                          <Badge variant="secondary" className="text-xs mb-2">{product.category}</Badge>
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                          {/* Show price in admin */}
                          <p className="text-sm font-medium text-foreground mt-2">
                            ${product.price.toLocaleString()} • Min. Order: {product.minOrder}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => openEditDialog(product)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                              </DialogHeader>
                              {editingProduct?.id === product.id && (
                                <ProductForm
                                  formData={formData}
                                  setFormData={setFormData}
                                  categories={categories}
                                  onSubmit={handleEditProduct}
                                  onCancel={resetForm}
                                  submitLabel="Save Changes"
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Details Modal - Show price in admin view */}
      <ProductDetailsModal
        product={selectedProductForView}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        showPrice={true}
      />
    </div>
  );
};

// Product Form Component
interface ProductFormProps {
  formData: {
    name: string;
    modelNumber: string;
    description: string;
    price: string;
    category: string;
    imageUrls: string[];
    minOrder: string;
    inStock: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    modelNumber: string;
    description: string;
    price: string;
    category: string;
    imageUrls: string[];
    minOrder: string;
    inStock: boolean;
  }>>;
  categories: string[];
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
}

const ProductForm = ({ formData, setFormData, categories, onSubmit, onCancel, submitLabel }: ProductFormProps) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Model Number</label>
        <Input
          value={formData.modelNumber}
          onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
          placeholder="e.g. RD-1001"
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Description</label>
      <Textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Enter product description"
        rows={3}
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Price ($) *</label>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="0.00"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
        <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Min. Order</label>
        <Input
          type="number"
          value={formData.minOrder}
          onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
          placeholder="1"
        />
      </div>
      <div className="flex items-center gap-2 pt-8">
        <Switch
          checked={formData.inStock}
          onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
        />
        <span className="text-sm text-foreground">In Stock</span>
      </div>
    </div>
    
    {/* Multiple Image Upload */}
    <MultiImageUpload
      images={formData.imageUrls}
      onImagesChange={(images) => setFormData({ ...formData, imageUrls: images })}
      maxImages={5}
    />

    <div className="flex justify-end gap-2 pt-4">
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={onSubmit}>{submitLabel}</Button>
    </div>
  </div>
);

export default JewelerManageProductsPage;
