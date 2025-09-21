import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          {t('common.madeBy')}{' '}
          <a
            href="https://www.linkedin.com/in/yasser-albogami-650240291/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors font-semibold underline decoration-dotted"
          >
            Yasser.A Albogami
          </a>{' '}
          🇸🇦
        </p>
      </div>
    </footer>
  );
};

export default Footer;