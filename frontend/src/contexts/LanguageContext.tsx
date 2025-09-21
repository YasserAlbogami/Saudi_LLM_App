import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LeaderInitiative {
  title: string;
  description: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  getLeaderInitiatives: (leader: 'salman' | 'mbs') => LeaderInitiative[];
}

const translations = {
  en: {
    // Navigation
    'nav.askKingdom': 'Ask About the Kingdom',
    'nav.leaders': 'History of our Leaders',
    'nav.language': 'العربية',
    'nav.tagline': 'Celebrating our nation',

    // Chat
    'chat.placeholder': 'Ask anything about Saudi Arabia...',
    'chat.send': 'Send',
    'chat.clear': 'Clear Chat',
    'chat.loading': 'Assistant is typing...',
    'chat.error': 'Failed to send message. Please try again.',
    'chat.retry': 'Retry',

    // Leaders Page
    'leaders.title': 'History of our Leaders',
    'leaders.subtitle': 'Leadership achievements since 2015',
    'leaders.quote': '"The Kingdom of Saudi Arabia is the land of the Two Holy Mosques"',

    'leaders.salman.title': 'King Salman bin Abdulaziz Al Saud',
    'leaders.salman.subtitle': 'Custodian of the Two Holy Mosques • Since 2015',
    'leaders.salman.content':
      'King Salman ascended to the throne in 2015, bringing decades of leadership experience. Under his reign, Saudi Arabia has launched Vision 2030, initiated major economic reforms, and strengthened its position as a regional leader. His commitment to serving the Two Holy Mosques and the pilgrims continues the Kingdom\'s proud tradition.',
    'leaders.salman.date': '2015 - Present',
    'leaders.salman.achievementsTitle': 'Key Achievements:',
    'leaders.salman.achievements': [
      'Launched Vision 2030 transformation program',
      'Strengthened international partnerships',
      'Enhanced services for pilgrims to the Two Holy Mosques',
      'Promoted moderate Islamic values globally',
    ],

    'leaders.mbs.title': 'Crown Prince Mohammed bin Salman',
    'leaders.mbs.subtitle': 'Crown Prince and Prime Minister • Vision 2030 Architect',
    'leaders.mbs.content':
      'Crown Prince Mohammed bin Salman has been instrumental in transforming Saudi Arabia since 2015. Key achievements include launching Vision 2030, establishing NEOM as a futuristic city project, implementing social reforms including women\'s driving rights, diversifying the economy away from oil dependence, and positioning Saudi Arabia as a global investment destination.',
    'leaders.mbs.date': 'Vision 2030',
    'leaders.mbs.initiatives': 'Major Initiatives:',
    'leaders.mbs.initiativesList': [
      { title: 'NEOM', description: '$500 billion futuristic megacity project in Tabuk Province, featuring smart city technology and sustainable living' },
      { title: 'Women\'s Empowerment', description: 'Groundbreaking social reforms including women\'s driving rights, attending sports events, and expanded workforce participation' },
      { title: 'Economic Diversification', description: 'Vision 2030 initiatives to reduce oil dependency and grow the private sector through mega-projects and foreign investment' },
      { title: 'Cultural Renaissance', description: 'Opening of entertainment venues, cinemas, concerts, and international cultural events to transform social life' },
      { title: 'Green Saudi Initiative', description: 'Ambitious environmental program to plant 10 billion trees and achieve net-zero emissions by 2060' },
      { title: 'Public Investment Fund (PIF)', description: 'Transformation into one of the world\'s largest sovereign wealth funds supporting national development' },
    ],

    // Common
    'common.nationalDay': 'The 95th Saudi National Day',
    'common.madeBy': 'Made with love By',
  },

  ar: {
    // Navigation
    'nav.askKingdom': 'اسأل عن المملكة',
    'nav.leaders': 'تاريخ قادتنا',
    'nav.language': 'English',
    'nav.tagline': 'نحتفل بوطننا',

    // Chat
    'chat.placeholder': 'اسأل أي شيء عن المملكة العربية السعودية...',
    'chat.send': 'إرسال',
    'chat.clear': 'مسح المحادثة',
    'chat.loading': 'المساعد يكتب...',
    'chat.error': 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    'chat.retry': 'إعادة المحاولة',

    // Leaders Page
    'leaders.title': 'تاريخ قادتنا',
    'leaders.subtitle': 'إنجازات القيادة منذ عام ٢٠١٥',
    'leaders.quote': '"المملكة العربية السعودية هي أرض الحرمين الشريفين"',

    'leaders.salman.title': 'الملك سلمان بن عبد العزيز آل سعود',
    'leaders.salman.subtitle': 'خادم الحرمين الشريفين • منذ ٢٠١٥',
    'leaders.salman.content':
      'تولى الملك سلمان العرش في عام ٢٠١٥، وجلب معه عقودًا من الخبرة القيادية. في عهده، أطلقت المملكة العربية السعودية رؤية ٢٠٣٠، وبدأت إصلاحات اقتصادية كبرى، وعززت موقعها كقائدة إقليمية. إن التزامه بخدمة الحرمين الشريفين والحجاج يواصل تقليد المملكة الفخور.',
    'leaders.salman.date': '2015 - حتى الآن',
    'leaders.salman.achievementsTitle': 'الإنجازات الرئيسية:',
    'leaders.salman.achievements': [
      'إطلاق برنامج رؤية 2030 للتحول',
      'تعزيز الشراكات الدولية',
      'تحسين خدمات الحجاج في الحرمين الشريفين',
      'تعزيز القيم الإسلامية المعتدلة على المستوى العالمي',
    ],

    'leaders.mbs.title': 'ولي العهد الأمير محمد بن سلمان',
    'leaders.mbs.subtitle': 'ولي العهد ورئيس مجلس الوزراء • مهندس رؤية ٢٠٣٠',
    'leaders.mbs.content':
      'كان لولي العهد الأمير محمد بن سلمان دور أساسي في تحويل المملكة العربية السعودية منذ عام ٢٠١٥. تشمل الإنجازات الرئيسية إطلاق رؤية ٢٠٣٠، وإنشاء مشروع نيوم كمدينة مستقبلية، وتنفيذ إصلاحات اجتماعية تشمل حق المرأة في القيادة، وتنويع الاقتصاد بعيداً عن الاعتماد على النفط، وتموضع المملكة كوجهة استثمارية عالمية.',
    'leaders.mbs.date': 'رؤية 2030',
    'leaders.mbs.initiatives': 'المبادرات الرئيسية:',
    'leaders.mbs.initiativesList': [
      { title: 'نيوم', description: 'مشروع مدينة مستقبلية بقيمة ٥٠٠ مليار دولار في منطقة تبوك، يتميز بتقنيات المدن الذكية والحياة المستدامة' },
      { title: 'تمكين المرأة', description: 'إصلاحات اجتماعية رائدة تشمل حق المرأة في القيادة وحضور الفعاليات الرياضية والمشاركة الموسعة في القوى العاملة' },
      { title: 'التنويع الاقتصادي', description: 'مبادرات رؤية ٢٠٣٠ لتقليل الاعتماد على النفط وتنمية القطاع الخاص من خلال المشاريع الضخمة والاستثمار الأجنبي' },
      { title: 'النهضة الثقافية', description: 'افتتاح أماكن الترفيه ودور السينما والحفلات الموسيقية والفعاليات الثقافية الدولية لتحويل الحياة الاجتماعية' },
      { title: 'مبادرة السعودية الخضراء', description: 'برنامج بيئي طموح لزراعة ١٠ مليار شجرة وتحقيق الحياد الكربوني بحلول ٢٠٦٠' },
      { title: 'صندوق الاستثمارات العامة', description: 'تحويله إلى أحد أكبر صناديق الثروة السيادية في العالم لدعم التنمية الوطنية' },
    ],

    // Common
    'common.nationalDay': 'اليوم الوطني السعودي الـ٩٥',
    'common.madeBy': 'صُنع بحب بواسطة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('saudi95_lang') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('saudi95_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const getLeaderInitiatives = (leader: 'salman' | 'mbs'): LeaderInitiative[] => {
  if (leader === 'salman') {
    const achievements = (translations[language] as any)['leaders.salman.achievements'] as string[] | undefined;
    return achievements?.map(item => ({ title: '', description: item })) || [];
  }

  if (leader === 'mbs') {
    const initiatives = (translations[language] as any)['leaders.mbs.initiativesList'] as LeaderInitiative[] | undefined;
    return initiatives || [];
  }

  return [];
};


  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, getLeaderInitiatives }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
