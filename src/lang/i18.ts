import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import tr from './languages/tr';
import en from './languages/en';
import {getAppLanguage, setAppLanguage} from '@utils';
import {settingsRedux} from '@store';

const initLocale = async () => {
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
      const appLanguage = await getAppLanguage();
      if (appLanguage) {
        await i18n.changeLanguage(appLanguage);
      }
      await setAppLanguage(i18n.language);
      settingsRedux.actions.changeLanguage(i18n.language);
    });
};

export {i18n, initLocale};
