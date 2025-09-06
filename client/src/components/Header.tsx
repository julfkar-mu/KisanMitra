import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Leaf, User } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleLanguageToggle = (lang: string) => {
    changeLanguage(lang);
  };

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="text-primary-foreground text-lg" />
              </div>
              <div className="font-hindi">
                <h1 className="text-xl font-semibold text-foreground">{t('appName')}</h1>
                <p className="text-xs text-muted-foreground">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  className={`px-3 py-1 text-sm font-medium rounded-md touch-target ${
                    currentLanguage === 'hi' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => handleLanguageToggle('hi')}
                  data-testid="button-language-hindi"
                >
                  हि
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium rounded-md touch-target ${
                    currentLanguage === 'en' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => handleLanguageToggle('en')}
                  data-testid="button-language-english"
                >
                  EN
                </button>
              </div>
              
              {/* User Profile/Login */}
              <Button
                onClick={handleAuthClick}
                className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                data-testid="button-auth"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium font-hindi">
                  {user ? t('logout') : t('login')}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Header;
