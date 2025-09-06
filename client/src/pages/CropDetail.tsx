import React, { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedbackForm from '@/components/FeedbackForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ChevronRight, Calendar, Thermometer, Droplets, CheckCircle } from 'lucide-react';
import type { Crop, Disease } from '@shared/schema';

const CropDetail: React.FC = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const isHindi = i18n.language === 'hi';

  const { data: crop, isLoading: cropLoading, error: cropError } = useQuery<Crop>({
    queryKey: ['/api/crops', id],
    enabled: !!id,
  });

  const { data: diseases, isLoading: diseasesLoading, error: diseasesError } = useQuery<Disease[]>({
    queryKey: ['/api/crops', id, 'diseases'],
    enabled: !!id,
  });

  const navigateBack = () => {
    navigate('/');
  };

  const handleDiseaseClick = (diseaseId: string) => {
    navigate(`/diseases/${diseaseId}`);
  };

  if (cropLoading || diseasesLoading) {
    return <LoadingSpinner show={true} />;
  }

  if (cropError || !crop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive font-hindi">{t('errorFetchingCrops')}</p>
            <Button 
              className="mt-4 font-hindi" 
              onClick={navigateBack}
              data-testid="button-back-home"
            >
              {t('home')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getImageUrl = (cropName: string) => {
    const imageMap: Record<string, string> = {
      'wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'rice': 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'sugarcane': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'cotton': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'maize': 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      'soybean': 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
    };
    
    return imageMap[cropName.toLowerCase()] || crop.imageUrl || imageMap['wheat'];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <button 
          className="hover:text-foreground font-hindi" 
          onClick={navigateBack}
          data-testid="button-breadcrumb-home"
        >
          {t('home')}
        </button>
        <ChevronRight className="w-3 h-3" />
        <button 
          className="hover:text-foreground font-hindi" 
          onClick={navigateBack}
          data-testid="button-breadcrumb-crops"
        >
          {t('cropCategories')}
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-hindi">
          {isHindi ? crop.nameHindi : crop.nameEnglish}
        </span>
      </nav>

      {/* Crop Header */}
      <Card className="overflow-hidden mb-8">
        <div className="h-64 relative">
          <img
            src={getImageUrl(crop.nameEnglish)}
            alt={isHindi ? crop.nameHindi : crop.nameEnglish}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl font-bold text-white mb-2 font-hindi">
              {isHindi ? crop.nameHindi : crop.nameEnglish}
            </h1>
            {crop.scientificName && (
              <p className="text-white/90">{crop.scientificName}</p>
            )}
          </div>
        </div>

        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-1 font-hindi">{t('sowingTime')}</h3>
              <p className="text-muted-foreground text-sm font-hindi">
                {crop.sowingTime || 'नवंबर-दिसंबर'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Thermometer className="text-secondary w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-1 font-hindi">{t('temperature')}</h3>
              <p className="text-muted-foreground text-sm">
                {crop.temperature || '15-25°C'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Droplets className="text-accent w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-1 font-hindi">{t('waterRequirement')}</h3>
              <p className="text-muted-foreground text-sm font-hindi">
                {crop.waterRequirement || '400-500 मिमी'}
              </p>
            </div>
          </div>

          {/* Tabs for Different Information */}
          <Tabs defaultValue="care" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="care" className="font-hindi">{t('care')}</TabsTrigger>
              <TabsTrigger value="diseases" className="font-hindi">{t('diseases')}</TabsTrigger>
              <TabsTrigger value="nutrition" className="font-hindi">{t('nutrition')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="care" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 font-hindi">
                  खेत की तैयारी
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground font-hindi">
                      खेत में 2-3 बार हल चलाएं
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground font-hindi">
                      मिट्टी में जैविक खाद मिलाएं
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground font-hindi">
                      खेत को समतल करें
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 font-hindi">
                  सिंचाई की व्यवस्था
                </h3>
                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <p className="text-muted-foreground font-hindi">
                      {isHindi ? crop.nameHindi : crop.nameEnglish} की फसल को 4-5 सिंचाई की आवश्यकता होती है। 
                      पहली सिंचाई बुआई के 20-25 दिन बाद करें।
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="diseases" className="space-y-4 mt-6">
              {diseasesError ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-destructive font-hindi">{t('errorFetchingDiseases')}</p>
                  </CardContent>
                </Card>
              ) : diseases && diseases.length > 0 ? (
                diseases.map((disease) => (
                  <Card 
                    key={disease.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleDiseaseClick(disease.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://images.unsplash.com/photo-1628126235206-5260b9ea6441?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                          alt={isHindi ? disease.nameHindi : disease.nameEnglish}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold font-hindi">
                            {isHindi ? disease.nameHindi : disease.nameEnglish}
                          </h4>
                          <p className="text-muted-foreground text-sm font-hindi">
                            {disease.scientificName}
                          </p>
                          {disease.severity && (
                            <span className={`text-xs px-2 py-1 rounded font-hindi ${
                              disease.severity === 'critical' 
                                ? 'bg-destructive/10 text-destructive'
                                : disease.severity === 'high'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {t(disease.severity)}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="text-muted-foreground w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground font-hindi">{t('noDiseasesFound')}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 font-hindi">
                    पोषक तत्व प्रबंधन
                  </h3>
                  <p className="text-muted-foreground font-hindi">
                    फसल के लिए उचित पोषक तत्वों की जानकारी यहाँ दी जाएगी।
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <FeedbackForm cropId={crop.id} type="crop" />
    </div>
  );
};

export default CropDetail;
