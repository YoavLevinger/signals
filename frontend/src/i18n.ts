import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './translations/en.json';
import heTranslations from './translations/he.json';
import arTranslations from './translations/ar.json';
import ruTranslations from './translations/ru.json';
import deTranslations from './translations/de.json';
import frTranslations from './translations/fr.json';
import itTranslations from './translations/it.json';
import esTranslations from './translations/es.json';
import zhTranslations from './translations/zh.json';
import jaTranslations from './translations/ja.json';
import ptTranslations from './translations/pt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      he: {
        translation: heTranslations
      },
      ar: {
        translation: arTranslations
      },
      ru: {
        translation: ruTranslations
      },
      de: {
        translation: deTranslations
      },
      fr: {
        translation: frTranslations
      },
      it: {
        translation: itTranslations
      },
      es: {
        translation: esTranslations
      },
      zh: {
        translation: zhTranslations
      },
      ja: {
        translation: jaTranslations
      },
      pt: {
        translation: ptTranslations
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

