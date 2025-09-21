import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isActivePage = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/chat';
    return location.pathname === path;
  };

  const flagEmoji = '🇸🇦'; // Saudi flag emoji - fallback handled in CSS if needed

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-2xl" role="img" aria-label="Saudi Flag">
              {flagEmoji}
            </span>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {t('common.nationalDay')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('nav.tagline')}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link to="/">
              <Button
                variant={isActivePage('/') ? "default" : "ghost"}
                className={isActivePage('/') ? "bg-primary text-primary-foreground" : ""}
              >
                {t('nav.askKingdom')}
              </Button>
            </Link>
            
            <Link to="/leaders">
              <Button
                variant={isActivePage('/leaders') ? "default" : "ghost"}
                className={isActivePage('/leaders') ? "bg-primary text-primary-foreground" : ""}
              >
                {t('nav.leaders')}
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              {t('nav.language')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;