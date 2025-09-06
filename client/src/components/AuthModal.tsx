import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Smartphone } from 'lucide-react';
import { ConfirmationResult } from 'firebase/auth';

const phoneSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { signInWithPhone, confirmOtp } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: '' },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const handlePhoneSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    try {
      const result = await signInWithPhone(`+91${data.phoneNumber}`);
      setConfirmationResult(result);
      setStep('otp');
      toast({
        title: t('sendOtp'),
        description: `OTP sent to +91${data.phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send OTP',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (data: OtpFormData) => {
    if (!confirmationResult) return;
    
    setIsLoading(true);
    try {
      await confirmOtp(confirmationResult, data.otp);
      toast({
        title: t('login'),
        description: 'Successfully logged in!',
      });
      handleClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('phone');
    setConfirmationResult(null);
    phoneForm.reset();
    otpForm.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="text-primary-foreground text-2xl w-8 h-8" />
            </div>
            <DialogTitle className="text-xl font-semibold font-hindi mb-2">
              {t('mobileLogin')}
            </DialogTitle>
            <p className="text-muted-foreground text-sm font-hindi">
              {t('otpDesc')}
            </p>
          </div>
        </DialogHeader>

        {step === 'phone' ? (
          <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-foreground mb-2 font-hindi">
                {t('mobileNumber')}
              </Label>
              <div className="flex">
                <span className="bg-muted px-3 py-2 border border-border rounded-l-lg text-sm">
                  +91
                </span>
                <Input
                  {...phoneForm.register('phoneNumber')}
                  type="tel"
                  placeholder="1234567890"
                  className="flex-1 rounded-l-none text-center tracking-wider"
                  maxLength={10}
                  data-testid="input-phone-number"
                />
              </div>
              {phoneForm.formState.errors.phoneNumber && (
                <p className="text-destructive text-sm mt-1 font-hindi">
                  {phoneForm.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full touch-target font-hindi"
              disabled={isLoading}
              data-testid="button-send-otp"
            >
              {isLoading ? t('loading') : t('sendOtp')}
            </Button>
            
            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground text-sm hover:text-foreground font-hindi"
                onClick={handleClose}
                data-testid="button-cancel-auth"
              >
                {t('cancel')}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-foreground mb-2 font-hindi">
                OTP
              </Label>
              <Input
                {...otpForm.register('otp')}
                type="text"
                placeholder="123456"
                className="text-center tracking-widest text-lg"
                maxLength={6}
                data-testid="input-otp"
              />
              {otpForm.formState.errors.otp && (
                <p className="text-destructive text-sm mt-1 font-hindi">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full touch-target font-hindi"
              disabled={isLoading}
              data-testid="button-verify-otp"
            >
              {isLoading ? t('loading') : 'Verify OTP'}
            </Button>
            
            <div className="text-center space-x-4">
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground text-sm hover:text-foreground"
                onClick={() => setStep('phone')}
                data-testid="button-back-to-phone"
              >
                Back
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground text-sm hover:text-foreground font-hindi"
                onClick={handleClose}
                data-testid="button-cancel-otp"
              >
                {t('cancel')}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
