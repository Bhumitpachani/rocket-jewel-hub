import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Save, RotateCcw, Eye } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { updateGlobalThemeSettings, setThemeMode } from '@/store/themeSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const ThemeSettingsPage = () => {
  const dispatch = useAppDispatch();
  const { mode, globalSettings } = useAppSelector((state) => state.theme);
  
  const [formData, setFormData] = useState({
    primaryColor: globalSettings.primaryColor,
    accentColor: globalSettings.accentColor,
    logoUrl: globalSettings.logoUrl,
    companyName: globalSettings.companyName
  });

  const presetThemes = [
    { 
      name: 'Diamond Classic', 
      primary: '#c4b5a0', 
      accent: '#1e3a5f',
      description: 'Warm gold with deep navy'
    },
    { 
      name: 'Platinum Elite', 
      primary: '#9ca3af', 
      accent: '#1f2937',
      description: 'Cool silver with charcoal'
    },
    { 
      name: 'Rose Gold', 
      primary: '#f4a3a8', 
      accent: '#4a2c2a',
      description: 'Elegant pink with burgundy'
    },
    { 
      name: 'Emerald Luxury', 
      primary: '#10b981', 
      accent: '#064e3b',
      description: 'Rich green palette'
    },
    { 
      name: 'Sapphire Royal', 
      primary: '#3b82f6', 
      accent: '#1e3a8a',
      description: 'Royal blue tones'
    },
    { 
      name: 'Amber Warmth', 
      primary: '#f59e0b', 
      accent: '#451a03',
      description: 'Warm amber accents'
    }
  ];

  const handleSave = () => {
    dispatch(updateGlobalThemeSettings(formData));
    toast.success('Theme settings saved successfully!');
  };

  const handleReset = () => {
    const defaults = {
      primaryColor: '#c4b5a0',
      accentColor: '#1e3a5f',
      logoUrl: '',
      companyName: 'Rocket Diamond'
    };
    setFormData(defaults);
    dispatch(updateGlobalThemeSettings(defaults));
    toast.success('Theme reset to defaults');
  };

  const applyPreset = (preset: typeof presetThemes[0]) => {
    const newData = {
      ...formData,
      primaryColor: preset.primary,
      accentColor: preset.accent
    };
    setFormData(newData);
    dispatch(updateGlobalThemeSettings(newData));
    toast.success(`Applied "${preset.name}" theme`);
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Theme Settings
          </h1>
          <p className="text-muted-foreground">
            Customize the global appearance of your application
          </p>
        </motion.div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button onClick={handleSave} className="gap-2 shimmer">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Theme Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {mode === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Theme Mode
              </CardTitle>
              <CardDescription>
                Switch between light and dark mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant={mode === 'light' ? 'default' : 'outline'}
                  onClick={() => dispatch(setThemeMode('light'))}
                  className="flex-1 gap-2"
                >
                  <Sun className="w-4 h-4" />
                  Light Mode
                </Button>
                <Button
                  variant={mode === 'dark' ? 'default' : 'outline'}
                  onClick={() => dispatch(setThemeMode('dark'))}
                  className="flex-1 gap-2"
                >
                  <Moon className="w-4 h-4" />
                  Dark Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preset Themes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Preset Themes
              </CardTitle>
              <CardDescription>
                Quick apply professional color schemes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {presetThemes.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-4 rounded-xl border border-border hover:border-primary/50 transition-all group text-left"
                  >
                    <div className="flex gap-2 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-background shadow-sm"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-background shadow-sm"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {preset.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{preset.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Custom Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>
                Fine-tune your brand colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Primary Color</Label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-14 h-14 rounded-xl cursor-pointer border-0"
                    />
                    <div className="flex-1">
                      <Input
                        value={formData.primaryColor}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        placeholder="#c4b5a0"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Used for buttons, links, and accents
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Accent Color</Label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-14 h-14 rounded-xl cursor-pointer border-0"
                    />
                    <div className="flex-1">
                      <Input
                        value={formData.accentColor}
                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                        placeholder="#1e3a5f"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Used for secondary highlights
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div className="p-6 rounded-xl border border-border bg-background/50">
                <p className="text-sm text-muted-foreground mb-4">Live Preview</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    className="px-6 py-3 rounded-xl font-medium text-white transition-all"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-6 py-3 rounded-xl font-medium text-white transition-all"
                    style={{ backgroundColor: formData.accentColor }}
                  >
                    Accent Button
                  </button>
                  <div 
                    className="px-6 py-3 rounded-xl border-2"
                    style={{ borderColor: formData.primaryColor, color: formData.primaryColor }}
                  >
                    Outlined
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                Configure your company branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2 block">Company Name</Label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Rocket Diamond"
                />
              </div>
              <div>
                <Label className="mb-2 block">Logo URL</Label>
                <div className="flex gap-4">
                  <Input
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    className="flex-1"
                  />
                  {formData.logoUrl && (
                    <img 
                      src={formData.logoUrl}
                      alt="Logo preview"
                      className="w-14 h-14 rounded-xl object-cover border border-border"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to use the default logo
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeSettingsPage;
