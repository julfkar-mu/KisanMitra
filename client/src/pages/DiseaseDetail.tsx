import React from 'react';
import { useParams, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageGallery from '@/components/ImageGallery';
import FeedbackForm from '@/components/FeedbackForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ChevronRight, AlertTriangle, Lightbulb } from 'lucide-react';
import type { Disease, Crop } from '@shared/schema';

const DiseaseDetail: React.FC = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const isHindi = i18n.language === 'hi';

  const { data: disease, isLoading, error } = useQuery<Disease>({
    queryKey: ['/api/diseases', id],
    enabled: !!id,
  });

  const { data: crop } = useQuery<Crop>({
    queryKey: ['/api/crops', disease?.cropId],
    enabled: !!disease?.cropId,
  });

  const navigateBack = () => {
    navigate('/');
  };

  const navigateToCrop = () => {
    if (disease?.cropId) {
      navigate(`/crops/${disease.cropId}`);
    }
  };

  if (isLoading) {
    return <LoadingSpinner show={true} />;
  }

  if (error || !disease) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive font-hindi">{t('errorFetchingDiseases')}</p>
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 text-destructive';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fungal':
        return 'bg-secondary/10 text-secondary';
      case 'bacterial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'viral':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'pest':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Default images for disease gallery
  const defaultImages = [
    'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  ];

  const diseaseImages = (disease.images as string[]) || defaultImages;

  const symptoms = disease.symptoms as { hindi: string[], english: string[] } | null;
  const causes = disease.causes as { hindi: string[], english: string[] } | null;
  const treatment = disease.treatment as { hindi: string[], english: string[] } | null;
  const prevention = disease.prevention as { hindi: string[], english: string[] } | null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <button 
          className="hover:text-foreground font-hindi" 
          onClick={navigateBack}
          data-testid="button-breadcrumb-home"
        >
          {t('home')}
        </button>
        <ChevronRight className="w-3 h-3" />
        {crop && (
          <>
            <button 
              className="hover:text-foreground font-hindi" 
              onClick={navigateToCrop}
              data-testid="button-breadcrumb-crop"
            >
              {isHindi ? crop.nameHindi : crop.nameEnglish}
            </button>
            <ChevronRight className="w-3 h-3" />
          </>
        )}
        <span className="text-foreground font-hindi">
          {isHindi ? disease.nameHindi : disease.nameEnglish}
        </span>
      </nav>

      {/* Disease Header */}
      <Card className="p-8 mb-8">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="text-destructive w-8 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 font-hindi">
              {isHindi ? disease.nameHindi : disease.nameEnglish}
            </h1>
            {disease.scientificName && (
              <p className="text-muted-foreground mb-4">{disease.scientificName}</p>
            )}
            <div className="flex items-center space-x-4 flex-wrap gap-2">
              {disease.severity && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(disease.severity)}`}>
                  {t(disease.severity)} रोग
                </span>
              )}
              {disease.type && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(disease.type)}`}>
                  {t(disease.type)} जनित
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Image Gallery */}
      <section className="mb-8">
        <ImageGallery 
          images={diseaseImages} 
          title={isHindi ? `${disease.nameHindi} की पहचान` : `${disease.nameEnglish} Identification`} 
        />
      </section>

      {/* Disease Information Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="symptoms" className="font-hindi">{t('symptoms')}</TabsTrigger>
              <TabsTrigger value="causes" className="font-hindi">{t('causes')}</TabsTrigger>
              <TabsTrigger value="treatment" className="font-hindi">{t('treatment')}</TabsTrigger>
              <TabsTrigger value="prevention" className="font-hindi">{t('prevention')}</TabsTrigger>
            </TabsList>

            <TabsContent value="symptoms" className="mt-6">
              <h3 className="text-lg font-semibold mb-4 font-hindi">मुख्य लक्षण</h3>
              <div className="space-y-4">
                {symptoms && symptoms[isHindi ? 'hindi' : 'english'] ? (
                  symptoms[isHindi ? 'hindi' : 'english'].map((symptom, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground font-hindi">{symptom}</p>
                    </div>
                  ))
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground font-hindi">
                        पत्तियों पर भूरे-नारंगी रंग के छोटे धब्बे दिखाई देते हैं
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground font-hindi">
                        धब्बे धीरे-धीरे बड़े होकर पूरी पत्ती को ढक लेते हैं
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground font-hindi">
                        पत्तियां पीली पड़कर सूखने लगती हैं
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Card className="bg-muted mt-6">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="text-accent w-4 h-4" />
                    <span className="font-medium font-hindi">जरूरी सुझाव</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-hindi">
                    यदि आपको ये लक्षण दिखाई दें तो तुरंत विशेषज्ञ से सलाह लें। 
                    जल्दी पहचान से बेहतर उपचार संभव है।
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="causes" className="mt-6">
              <h3 className="text-lg font-semibold mb-4 font-hindi">रोग के कारण</h3>
              <div className="space-y-4">
                {causes && causes[isHindi ? 'hindi' : 'english'] ? (
                  causes[isHindi ? 'hindi' : 'english'].map((cause, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground font-hindi">{cause}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground font-hindi">
                    रोग के कारणों की विस्तृत जानकारी उपलब्ध नहीं है।
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="treatment" className="mt-6">
              <h3 className="text-lg font-semibold mb-4 font-hindi">उपचार की विधि</h3>
              <div className="space-y-6">
                {treatment && treatment[isHindi ? 'hindi' : 'english'] ? (
                  treatment[isHindi ? 'hindi' : 'english'].map((step, index) => (
                    <div key={index} className={`border-l-4 pl-4 ${
                      index === 0 ? 'border-primary' : 
                      index === 1 ? 'border-secondary' : 
                      'border-accent'
                    }`}>
                      <h4 className="font-medium mb-2 font-hindi">चरण {index + 1}</h4>
                      <p className="text-muted-foreground text-sm font-hindi">{step}</p>
                    </div>
                  ))
                ) : (
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium mb-2 font-hindi">चरण 1: तुरंत उपचार</h4>
                      <p className="text-muted-foreground text-sm font-hindi">
                        प्रोपिकोनाज़ोल 25% EC @ 1 मिली प्रति लीटर पानी में घोलकर छिड़काव करें
                      </p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4">
                      <h4 className="font-medium mb-2 font-hindi">चरण 2: फॉलो-अप</h4>
                      <p className="text-muted-foreground text-sm font-hindi">
                        10-15 दिन बाद दोबारा छिड़काव करें यदि आवश्यक हो
                      </p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-medium mb-2 font-hindi">चरण 3: निगरानी</h4>
                      <p className="text-muted-foreground text-sm font-hindi">
                        नियमित रूप से फसल की जांच करते रहें
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="prevention" className="mt-6">
              <h3 className="text-lg font-semibold mb-4 font-hindi">रोकथाम के उपाय</h3>
              <div className="space-y-4">
                {prevention && prevention[isHindi ? 'hindi' : 'english'] ? (
                  prevention[isHindi ? 'hindi' : 'english'].map((measure, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground font-hindi">{measure}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground font-hindi">
                    रोकथाम के उपायों की विस्तृत जानकारी उपलब्ध नहीं है।
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <div className="mt-8">
        <FeedbackForm diseaseId={disease.id} type="disease" />
      </div>
    </div>
  );
};

export default DiseaseDetail;
