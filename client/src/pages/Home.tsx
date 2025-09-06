import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CropCard from '@/components/CropCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Leaf, Bug, Users, Camera, Upload, ArrowRight } from 'lucide-react';
import type { Crop } from '@shared/schema';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  const { data: crops, isLoading, error } = useQuery<Crop[]>({
    queryKey: ['/api/crops'],
    refetchOnWindowFocus: false,
  });

  const handleCropClick = (cropId: string) => {
    navigate(`/crops/${cropId}`);
  };

  if (isLoading) {
    return <LoadingSpinner show={true} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive font-hindi">{t('errorFetchingCrops')}</p>
            <Button 
              className="mt-4 font-hindi" 
              onClick={() => window.location.reload()}
              data-testid="button-retry-crops"
            >
              {t('tryAgain')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div 
          className="relative h-64 rounded-2xl overflow-hidden mb-6"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-start pl-8">
            <div className="text-left text-white max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-hindi">
                {t('heroTitle')}
              </h2>
              <p className="text-lg mb-6 font-hindi">
                {t('heroSubtitle')}
              </p>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target font-hindi"
                data-testid="button-get-started"
              >
                {t('getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Leaf className="text-primary text-xl w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1 font-hindi">
              {t('cropsCount', { count: crops?.length || 50 })}
            </h3>
            <p className="text-muted-foreground text-sm font-hindi">
              {t('cropsDesc')}
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Bug className="text-accent text-xl w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1 font-hindi">
              {t('diseasesCount', { count: 200 })}
            </h3>
            <p className="text-muted-foreground text-sm font-hindi">
              {t('diseasesDesc')}
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="text-secondary text-xl w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1 font-hindi">
              {t('farmersCount', { count: 10000 })}
            </h3>
            <p className="text-muted-foreground text-sm font-hindi">
              {t('farmersDesc')}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Crop Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-hindi">{t('cropCategories')}</h2>
          <button className="text-primary hover:text-primary/80 font-medium text-sm font-hindi">
            {t('viewAll')} <ArrowRight className="inline ml-1 w-4 h-4" />
          </button>
        </div>

        {crops && crops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {crops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onClick={() => handleCropClick(crop.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground font-hindi">{t('noCropsFound')}</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Disease Identifier */}
        <div className="bg-gradient-to-r from-accent to-primary p-8 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 font-hindi">
                {t('quickIdentify')}
              </h3>
              <p className="text-white/90 font-hindi">
                {t('quickIdentifyDesc')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-accent hover:bg-white/90 touch-target font-hindi"
                data-testid="button-take-photo"
              >
                <Camera className="mr-2 w-4 h-4" />
                {t('takePhoto')}
              </Button>
              <Button 
                variant="outline"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 touch-target font-hindi"
                data-testid="button-upload-photo"
              >
                <Upload className="mr-2 w-4 h-4" />
                {t('uploadPhoto')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-20 md:h-0"></div>
    </main>
  );
};

export default Home;
