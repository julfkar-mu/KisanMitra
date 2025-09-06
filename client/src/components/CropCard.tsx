import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Crop } from '@shared/schema';

interface CropCardProps {
  crop: Crop;
  onClick: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onClick }) => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  
  // Stock photos for different crop types
  const getImageUrl = (cropName: string) => {
    const imageMap: Record<string, string> = {
      'wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      'rice': 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      'sugarcane': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      'cotton': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      'maize': 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      'soybean': 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    };
    
    const key = cropName.toLowerCase();
    return imageMap[key] || crop.imageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rabi':
        return 'bg-primary text-primary-foreground';
      case 'kharif':
        return 'bg-secondary text-secondary-foreground';
      case 'cash_crop':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
      data-testid={`card-crop-${crop.id}`}
    >
      <div className="h-48 relative overflow-hidden">
        <img
          src={getImageUrl(crop.nameEnglish)}
          alt={isHindi ? crop.nameHindi : crop.nameEnglish}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-medium ${getCategoryColor(crop.category || 'other')}`}>
          {t(crop.category || 'other')}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 font-hindi">
          {isHindi ? crop.nameHindi : crop.nameEnglish}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 font-hindi line-clamp-2">
          {/* This would come from the crop description in the actual implementation */}
          {isHindi 
            ? `${crop.nameHindi} की खेती और देखभाल की विस्तृत जानकारी`
            : `Detailed information about ${crop.nameEnglish} cultivation and care`
          }
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-hindi">
            {t('commonDiseases', { count: 15 })} {/* This would be dynamic based on actual disease count */}
          </span>
          <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CropCard;
