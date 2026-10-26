/**
 * Comprehensive internationalization (i18n) engine for NUR AI High School Tutor
 * Supports: Amharic (am), Afaan Oromoo (om), Tigrinya (ti), Arabic (ar), Somali (so), English (en)
 */

export * from '../data/translations_all';
import { TRANSLATIONS_ALL, SupportedLanguage, AppDictionary } from '../data/translations_all';

export const getTranslation = (lang: SupportedLanguage): AppDictionary => {
  return TRANSLATIONS_ALL[lang] || TRANSLATIONS_ALL.am;
};
