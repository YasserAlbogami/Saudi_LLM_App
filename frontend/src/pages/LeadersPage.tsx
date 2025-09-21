import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import saudiFlagImage from '@/assets/saudi-flag.png';
import kingSalmanImage from '@/assets/king-salman.jpg';
import crownPrinceMBSImage from '@/assets/crown-prince-mbs.png';

const LeadersPage: React.FC = () => {
  const { t, isRTL, getLeaderInitiatives } = useLanguage();

  const salmanInitiatives = getLeaderInitiatives('salman');
  const mbsInitiatives = getLeaderInitiatives('mbs');

  return (
    <div className="min-h-screen bg-page-active">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">

          {/* Hero Section */}
          <div className="relative h-64 bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20"></div>
            <img
              src={saudiFlagImage}
              alt={t('leaders.title')}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 text-center text-white">
              <h1 className="text-4xl font-bold mb-2">{t('leaders.title')}</h1>
              <p className="text-xl opacity-90">{t('leaders.subtitle')}</p>
              <div className="mt-4 text-lg italic">{t('leaders.quote')}</div>
            </div>
          </div>

          {/* King Salman Section */}
          <div className={`flex flex-col lg:flex-row gap-8 items-center ${isRTL ? 'lg:flex-row-reverse' : ''} p-8`}>
            <div className="lg:w-1/3">
              <div className="relative">
                <img
                  src={kingSalmanImage}
                  alt={t('leaders.salman.title')}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {t('leaders.salman.date')}
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{t('leaders.salman.title')}</h2>
              <p className="text-primary font-semibold">{t('leaders.salman.subtitle')}</p>
              <p className="text-foreground leading-relaxed">{t('leaders.salman.content')}</p>

              <div className="bg-accent/50 rounded-lg p-4 border-l-4 border-primary rtl:border-l-0 rtl:border-r-4">
                <h3 className="font-semibold text-accent-foreground mb-2">{t('leaders.salman.achievementsTitle')}</h3>
                <ul className="space-y-1 text-sm text-accent-foreground">
                  {salmanInitiatives.map((item, idx) => (
                    <li key={idx}>• {item.description}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-12"></div>

          {/* Crown Prince MBS Section */}
          <div className={`flex flex-col lg:flex-row gap-8 items-center ${isRTL ? 'lg:flex-row' : 'lg:flex-row-reverse'} p-8`}>
            <div className="lg:w-1/3">
              <div className="relative">
                <img
                  src={crownPrinceMBSImage}
                  alt={t('leaders.mbs.title')}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-2 -left-2 rtl:-right-2 rtl:-left-auto bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {t('leaders.mbs.date')}
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{t('leaders.mbs.title')}</h2>
              <p className="text-primary font-semibold">{t('leaders.mbs.subtitle')}</p>
              <p className="text-foreground leading-relaxed">{t('leaders.mbs.content')}</p>

              <div className="bg-accent/50 rounded-lg p-4 border-l-4 border-primary rtl:border-l-0 rtl:border-r-4">
                <h3 className="font-semibold text-accent-foreground mb-2">{t('leaders.mbs.initiatives')}</h3>
                <ul className="space-y-2 text-sm text-accent-foreground">
                  {mbsInitiatives.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>{item.title}:</strong> {item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LeadersPage;
