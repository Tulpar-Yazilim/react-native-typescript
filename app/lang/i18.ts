import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import tr from './languages/tr';
import en from './languages/en';

const initLocale = async (langauge: string = 'tr') => {
  const resources = {
    tr: {
      translation: tr,
    },
    en: {
      translation: en,
    },
  };

  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources,
      fallbackLng: 'tr',
      react: {useSuspense: false},
      initImmediate: false,
      interpolation: {
        escapeValue: false,
      },
    })
    .then(async () => {
      await i18n.changeLanguage(langauge);
    });
};

export {i18n, initLocale};
