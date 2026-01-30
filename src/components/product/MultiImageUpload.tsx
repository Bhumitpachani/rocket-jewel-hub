import { useState } from 'react';
import { X, Plus, Image as ImageIcon, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MultiImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const MultiImageUpload = ({ images, onImagesChange, maxImages = 5 }: MultiImageUploadProps) => {
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim() && images.length < maxImages) {
      onImagesChange([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    handleMoveImage(index, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Product Images ({images.length}/{maxImages})
        </label>
        {images.length > 0 && (
          <span className="text-xs text-muted-foreground">First image is primary</span>
        )}
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all ${
                index === 0 ? 'border-primary col-span-3 aspect-video' : 'border-border aspect-square'
              }`}
            >
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Invalid+URL';
                }}
              />
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSetPrimary(index)}
                    className="text-xs"
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl">
          <ImageIcon className="w-10 h-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No images added yet</p>
        </div>
      )}

      {/* Add Image Input */}
      {images.length < maxImages && (
        <div className="flex gap-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL..."
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddImage}
            disabled={!newImageUrl.trim()}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiImageUpload;
