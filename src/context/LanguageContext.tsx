import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLanguage,
  LANGUAGES,
  LanguageInfo,
  AppDictionary,
  TRANSLATIONS_ALL,
} from '../data/translations_all';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: AppDictionary;
  currentLanguageInfo: LanguageInfo;
  isRTL: boolean;
  availableLanguages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('app_tutorial_language');
    if (saved && Object.keys(LANGUAGES).includes(saved)) {
      return saved as SupportedLanguage;
    }
    return 'am'; // Default Amharic as strictly mandated
  });

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    localStorage.setItem('app_tutorial_language', newLang);
  };

  useEffect(() => {
    const info = LANGUAGES[language];
    document.documentElement.lang = language;
    document.documentElement.dir = info.dir;
    if (info.dir === 'rtl') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }, [language]);

  const currentLanguageInfo = LANGUAGES[language];
  const t = TRANSLATIONS_ALL[language] || TRANSLATIONS_ALL.am;
  const isRTL = currentLanguageInfo.dir === 'rtl';
  const availableLanguages = Object.values(LANGUAGES);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguageInfo,
        isRTL,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
