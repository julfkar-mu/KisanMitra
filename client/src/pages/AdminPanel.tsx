import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertCropSchema, insertDiseaseSchema, type Crop, type Disease, type Feedback } from '@shared/schema';
import { z } from 'zod';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

type CropFormData = z.infer<typeof insertCropSchema>;
type DiseaseFormData = z.infer<typeof insertDiseaseSchema>;

const AdminPanel: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('crops');
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddDisease, setShowAddDisease] = useState(false);

  // Queries
  const { data: crops, isLoading: cropsLoading } = useQuery<Crop[]>({
    queryKey: ['/api/crops'],
  });

  const { data: feedback, isLoading: feedbackLoading } = useQuery<Feedback[]>({
    queryKey: ['/api/feedback'],
  });

  // Crop form
  const cropForm = useForm<CropFormData>({
    resolver: zodResolver(insertCropSchema),
    defaultValues: {
      nameHindi: '',
      nameEnglish: '',
      scientificName: '',
      category: '',
      sowingTime: '',
      temperature: '',
      waterRequirement: '',
      careInstructions: null,
      imageUrl: '',
    },
  });

  // Disease form
  const diseaseForm = useForm<DiseaseFormData>({
    resolver: zodResolver(insertDiseaseSchema),
    defaultValues: {
      cropId: '',
      nameHindi: '',
      nameEnglish: '',
      scientificName: '',
      severity: '',
      type: '',
      symptoms: null,
      causes: null,
      treatment: null,
      prevention: null,
      images: null,
    },
  });

  // Mutations
  const createCropMutation = useMutation({
    mutationFn: (data: CropFormData) => apiRequest('POST', '/api/crops', data),
    onSuccess: () => {
      toast({
        title: t('save'),
        description: 'Crop created successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/crops'] });
      setShowAddCrop(false);
      cropForm.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateCropMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CropFormData> }) =>
      apiRequest('PUT', `/api/crops/${id}`, data),
    onSuccess: () => {
      toast({
        title: t('save'),
        description: 'Crop updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/crops'] });
      setEditingCrop(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteCropMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/crops/${id}`),
    onSuccess: () => {
      toast({
        title: 'Deleted',
        description: 'Crop deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/crops'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const createDiseaseMutation = useMutation({
    mutationFn: (data: DiseaseFormData) => apiRequest('POST', '/api/diseases', data),
    onSuccess: () => {
      toast({
        title: t('save'),
        description: 'Disease created successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/diseases'] });
      setShowAddDisease(false);
      diseaseForm.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Form handlers
  const handleCropSubmit = (data: CropFormData) => {
    if (editingCrop) {
      updateCropMutation.mutate({ id: editingCrop.id, data });
    } else {
      createCropMutation.mutate(data);
    }
  };

  const handleDiseaseSubmit = (data: DiseaseFormData) => {
    createDiseaseMutation.mutate(data);
  };

  const handleEditCrop = (crop: Crop) => {
    setEditingCrop(crop);
    cropForm.reset({
      nameHindi: crop.nameHindi,
      nameEnglish: crop.nameEnglish,
      scientificName: crop.scientificName || '',
      category: crop.category || '',
      sowingTime: crop.sowingTime || '',
      temperature: crop.temperature || '',
      waterRequirement: crop.waterRequirement || '',
      imageUrl: crop.imageUrl || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingCrop(null);
    setShowAddCrop(false);
    setShowAddDisease(false);
    cropForm.reset();
    diseaseForm.reset();
  };

  if (cropsLoading || feedbackLoading) {
    return <LoadingSpinner show={true} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-hindi">{t('adminPanel')}</h1>
        <p className="text-muted-foreground font-hindi">{t('adminDesc')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crops" className="font-hindi">{t('cropManagement')}</TabsTrigger>
          <TabsTrigger value="diseases" className="font-hindi">{t('diseaseManagement')}</TabsTrigger>
          <TabsTrigger value="users" className="font-hindi">{t('users')}</TabsTrigger>
          <TabsTrigger value="feedback" className="font-hindi">{t('feedback')}</TabsTrigger>
        </TabsList>

        <TabsContent value="crops" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold font-hindi">Crop Management</h2>
            <Button 
              onClick={() => setShowAddCrop(true)}
              className="font-hindi"
              data-testid="button-add-crop"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('addNewCrop')}
            </Button>
          </div>

          {(showAddCrop || editingCrop) && (
            <Card>
              <CardHeader>
                <CardTitle className="font-hindi">
                  {editingCrop ? 'Edit Crop' : t('addNewCrop')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={cropForm.handleSubmit(handleCropSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-hindi">{t('cropNameHindi')}</Label>
                      <Input
                        {...cropForm.register('nameHindi')}
                        placeholder="उदाहरण: गेहूं"
                        className="font-hindi"
                        data-testid="input-crop-name-hindi"
                      />
                      {cropForm.formState.errors.nameHindi && (
                        <p className="text-destructive text-sm mt-1">
                          {cropForm.formState.errors.nameHindi.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label>{t('cropNameEnglish')}</Label>
                      <Input
                        {...cropForm.register('nameEnglish')}
                        placeholder="Example: Wheat"
                        data-testid="input-crop-name-english"
                      />
                      {cropForm.formState.errors.nameEnglish && (
                        <p className="text-destructive text-sm mt-1">
                          {cropForm.formState.errors.nameEnglish.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="font-hindi">{t('scientificName')}</Label>
                    <Input
                      {...cropForm.register('scientificName')}
                      placeholder="उदाहरण: Triticum aestivum"
                      data-testid="input-scientific-name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="font-hindi">Category</Label>
                      <Select onValueChange={(value) => cropForm.setValue('category', value)}>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rabi">Rabi</SelectItem>
                          <SelectItem value="kharif">Kharif</SelectItem>
                          <SelectItem value="cash_crop">Cash Crop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="font-hindi">{t('sowingTime')}</Label>
                      <Input
                        {...cropForm.register('sowingTime')}
                        placeholder="नवंबर-दिसंबर"
                        className="font-hindi"
                        data-testid="input-sowing-time"
                      />
                    </div>
                    
                    <div>
                      <Label className="font-hindi">{t('temperature')}</Label>
                      <Input
                        {...cropForm.register('temperature')}
                        placeholder="15-25°C"
                        data-testid="input-temperature"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-hindi">{t('waterRequirement')}</Label>
                    <Input
                      {...cropForm.register('waterRequirement')}
                      placeholder="400-500 मिमी"
                      className="font-hindi"
                      data-testid="input-water-requirement"
                    />
                  </div>

                  <div>
                    <Label className="font-hindi">Image URL</Label>
                    <Input
                      {...cropForm.register('imageUrl')}
                      placeholder="https://example.com/image.jpg"
                      data-testid="input-image-url"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      disabled={createCropMutation.isPending || updateCropMutation.isPending}
                      className="font-hindi"
                      data-testid="button-save-crop"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {createCropMutation.isPending || updateCropMutation.isPending ? t('loading') : t('save')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="font-hindi"
                      data-testid="button-cancel-crop"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t('cancel')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Crops List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops?.map((crop) => (
              <Card key={crop.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold font-hindi">
                      {isHindi ? crop.nameHindi : crop.nameEnglish}
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCrop(crop)}
                        data-testid={`button-edit-crop-${crop.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteCropMutation.mutate(crop.id)}
                        disabled={deleteCropMutation.isPending}
                        data-testid={`button-delete-crop-${crop.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {crop.scientificName}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <p>Category: {crop.category}</p>
                    <p>Sowing: {crop.sowingTime}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diseases" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold font-hindi">Disease Management</h2>
            <Button 
              onClick={() => setShowAddDisease(true)}
              className="font-hindi"
              data-testid="button-add-disease"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Disease
            </Button>
          </div>

          {showAddDisease && (
            <Card>
              <CardHeader>
                <CardTitle className="font-hindi">Add New Disease</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={diseaseForm.handleSubmit(handleDiseaseSubmit)} className="space-y-4">
                  <div>
                    <Label>Select Crop</Label>
                    <Select onValueChange={(value) => diseaseForm.setValue('cropId', value)}>
                      <SelectTrigger data-testid="select-crop-for-disease">
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {crops?.map((crop) => (
                          <SelectItem key={crop.id} value={crop.id}>
                            {isHindi ? crop.nameHindi : crop.nameEnglish}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-hindi">Disease Name (Hindi)</Label>
                      <Input
                        {...diseaseForm.register('nameHindi')}
                        placeholder="उदाहरण: गेहूं का रतुआ"
                        className="font-hindi"
                        data-testid="input-disease-name-hindi"
                      />
                    </div>
                    
                    <div>
                      <Label>Disease Name (English)</Label>
                      <Input
                        {...diseaseForm.register('nameEnglish')}
                        placeholder="Example: Wheat Rust"
                        data-testid="input-disease-name-english"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Severity</Label>
                      <Select onValueChange={(value) => diseaseForm.setValue('severity', value)}>
                        <SelectTrigger data-testid="select-severity">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Type</Label>
                      <Select onValueChange={(value) => diseaseForm.setValue('type', value)}>
                        <SelectTrigger data-testid="select-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fungal">Fungal</SelectItem>
                          <SelectItem value="bacterial">Bacterial</SelectItem>
                          <SelectItem value="viral">Viral</SelectItem>
                          <SelectItem value="pest">Pest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      disabled={createDiseaseMutation.isPending}
                      className="font-hindi"
                      data-testid="button-save-disease"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {createDiseaseMutation.isPending ? t('loading') : t('save')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="font-hindi"
                      data-testid="button-cancel-disease"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t('cancel')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <h2 className="text-2xl font-semibold font-hindi">User Management</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground font-hindi">
                User management features will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <h2 className="text-2xl font-semibold font-hindi">Feedback Management</h2>
          
          {feedback && feedback.length > 0 ? (
            <div className="space-y-4">
              {feedback.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold font-hindi">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.phoneNumber}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < (item.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground font-hindi">{item.comment}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Type: {item.type} • {new Date(item.createdAt!).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground font-hindi">{t('noFeedbackFound')}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
