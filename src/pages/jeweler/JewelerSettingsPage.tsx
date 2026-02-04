import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Upload, Eye, Percent, DollarSign } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { updateJewelerSettings } from '@/store/appSlice';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { JewelerSettings } from '@/store/types';

const JewelerSettingsPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const shop = useAppSelector(state => 
    state.app.jewelerShops.find(s => s.id === shopId)
  );
  const existingSettings = shop?.settings;

  const [formData, setFormData] = useState<JewelerSettings>({
    shopId: shopId!,
    logo: existingSettings?.logo || '',
    storeName: existingSettings?.storeName || shop?.name || '',
    tagline: existingSettings?.tagline || '',
    email: existingSettings?.email || shop?.email || '',
    phone: existingSettings?.phone || shop?.phone || '',
    address: existingSettings?.address || `${shop?.address}, ${shop?.city}, ${shop?.state}` || '',
    heroTitle: existingSettings?.heroTitle || `Welcome to ${shop?.name}`,
    heroSubtitle: existingSettings?.heroSubtitle || 'Discover our exquisite collection of fine jewelry',
    heroBannerUrl: existingSettings?.heroBannerUrl || '',
    primaryColor: existingSettings?.primaryColor || '#1e3a5f',
    accentColor: existingSettings?.accentColor || '#c9a961',
    priceMarkupPercent: existingSettings?.priceMarkupPercent ?? 0,
    showPriceInCatalog: existingSettings?.showPriceInCatalog ?? false
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch(updateJewelerSettings({ shopId: shopId!, settings: formData }));
    
    toast({
      title: 'Settings Saved',
      description: 'Your store settings have been updated successfully.'
    });
    
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-foreground mb-2"
          >
            Store Settings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Customize your store's branding and contact information.
          </motion.p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/shop/${shopId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </a>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Branding Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Branding
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Store Name *
                </label>
                <Input
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  placeholder="Your Store Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tagline
                </label>
                <Input
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Your store's tagline"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Logo URL
              </label>
              <div className="flex gap-4">
                <Input
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="flex-1"
                />
                {formData.logo && (
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="w-12 h-12 rounded-xl object-cover border border-border"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: Square image, at least 200x200 pixels
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Homepage Hero
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hero Title
              </label>
              <Input
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                placeholder="Welcome to Our Store"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hero Subtitle
              </label>
              <Textarea
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                placeholder="Describe your store..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hero Banner Image URL
              </label>
              <Input
                value={formData.heroBannerUrl}
                onChange={(e) => setFormData({ ...formData, heroBannerUrl: e.target.value })}
                placeholder="https://example.com/banner.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: Wide image, at least 1920x600 pixels
              </p>
              {formData.heroBannerUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-border">
                  <img
                    src={formData.heroBannerUrl}
                    alt="Banner preview"
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Contact Information
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@yourstore.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Address
              </label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Your store address"
                rows={2}
              />
            </div>
          </div>
        </motion.div>

        {/* Pricing Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Pricing Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure how prices are displayed in your catalog
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Show Price Toggle */}
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Show Prices in Catalog</Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, prices will be visible to customers on product cards
                </p>
              </div>
              <Switch
                checked={formData.showPriceInCatalog}
                onCheckedChange={(checked) => setFormData({ ...formData, showPriceInCatalog: checked })}
              />
            </div>

            {/* Price Markup */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Price Markup Percentage</Label>
                <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg">
                  <Percent className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-lg">{formData.priceMarkupPercent}%</span>
                </div>
              </div>
              <Slider
                value={[formData.priceMarkupPercent]}
                onValueChange={(value) => setFormData({ ...formData, priceMarkupPercent: value[0] })}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This percentage will be added to the base price when displayed in your catalog.
                For example, a $1,000 product with 15% markup will show as ${(1000 * (1 + formData.priceMarkupPercent / 100)).toLocaleString()}.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Colors (Preview only - would need CSS variables integration for full implementation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Store Colors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Primary Color
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  placeholder="#1e3a5f"
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Accent Color
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0"
                />
                <Input
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  placeholder="#c9a961"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Color customization will be applied in a future update.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JewelerSettingsPage;
