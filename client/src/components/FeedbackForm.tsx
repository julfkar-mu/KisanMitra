import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Star } from 'lucide-react';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  cropId?: string;
  diseaseId?: string;
  type: 'crop' | 'disease' | 'general';
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ cropId, diseaseId, type }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rating, setRating] = React.useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      rating: 0,
      comment: '',
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async (data: FeedbackFormData & { cropId?: string; diseaseId?: string; type: string }) => {
      return apiRequest('POST', '/api/feedback', data);
    },
    onSuccess: () => {
      toast({
        title: t('feedbackTitle'),
        description: t('feedbackDesc'),
      });
      reset();
      setRating(0);
      // Invalidate feedback queries
      queryClient.invalidateQueries({ queryKey: ['/api/feedback'] });
    },
    onError: (error) => {
      toast({
        title: t('errorSubmittingFeedback'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FeedbackFormData) => {
    feedbackMutation.mutate({
      ...data,
      cropId,
      diseaseId,
      type,
    });
  };

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    setValue('rating', newRating);
  };

  return (
    <section className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 font-hindi">{t('feedbackTitle')}</h2>
            <p className="text-muted-foreground font-hindi">{t('feedbackDesc')}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-foreground mb-2 font-hindi">
                      {t('name')}
                    </Label>
                    <Input
                      {...register('name')}
                      placeholder={t('enterName')}
                      className="font-hindi"
                      data-testid="input-feedback-name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1 font-hindi">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-foreground mb-2 font-hindi">
                      {t('mobileNumber')}
                    </Label>
                    <Input
                      {...register('phoneNumber')}
                      type="tel"
                      placeholder="1234567890"
                      maxLength={10}
                      data-testid="input-feedback-phone"
                    />
                    {errors.phoneNumber && (
                      <p className="text-destructive text-sm mt-1 font-hindi">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-foreground mb-2 font-hindi">
                    {t('rating')}
                  </Label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-2xl touch-target ${
                          star <= rating ? 'text-yellow-400' : 'text-muted-foreground'
                        } hover:text-yellow-500 transition-colors`}
                        onClick={() => handleRatingClick(star)}
                        data-testid={`button-rating-${star}`}
                      >
                        <Star className="w-6 h-6" fill={star <= rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-destructive text-sm mt-1 font-hindi">{errors.rating.message}</p>
                  )}
                </div>

                <div>
                  <Label className="block text-sm font-medium text-foreground mb-2 font-hindi">
                    {t('comment')}
                  </Label>
                  <Textarea
                    {...register('comment')}
                    rows={4}
                    placeholder={t('commentPlaceholder')}
                    className="resize-none font-hindi"
                    data-testid="textarea-feedback-comment"
                  />
                  {errors.comment && (
                    <p className="text-destructive text-sm mt-1 font-hindi">{errors.comment.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full touch-target font-hindi"
                  disabled={feedbackMutation.isPending}
                  data-testid="button-submit-feedback"
                >
                  {feedbackMutation.isPending ? t('loading') : t('submitFeedback')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
