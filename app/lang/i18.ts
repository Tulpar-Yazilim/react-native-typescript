import i18n, {changeLanguage, use} from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './languages/en';
import tr from './languages/tr';

const initLocale = async (langauge = 'tr') => {
  const resources = {
    tr: {
      translation: tr,
    },
    en: {
      translation: en,
    },
  };

  use(initReactI18next)
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
      await changeLanguage(langauge);
    });
};

export {i18n, initLocale};
