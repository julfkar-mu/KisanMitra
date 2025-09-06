import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  show: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ show }) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="bg-card p-6 rounded-xl shadow-lg text-center" data-testid="loading-overlay">
        <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-foreground font-medium font-hindi" data-testid="text-loading">
          {t('loading')}
        </p>
        <p className="text-muted-foreground text-sm font-hindi" data-testid="text-please-wait">
          {t('pleaseWait')}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
