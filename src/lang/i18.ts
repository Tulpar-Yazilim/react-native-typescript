import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import tr from './languages/tr';
import en from './languages/en';

const locales = RNLocalize.getLocales();
I18n.locale = locales[0].languageTag;

I18n.fallbacks = true;
I18n.locales.no = 'tr';

I18n.translations = {
  tr,
  en,
};

export default I18n;
