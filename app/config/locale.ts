import moment from 'moment';
import 'moment/locale/tr';
import {LocaleConfig} from 'react-native-calendars';

import {initLocale} from '../lang/i18';

const locale = (language = 'tr') => {
  initLocale(language || 'tr');
  moment.locale(language || 'tr');
  LocaleConfig.locales.tr = {
    formatAccessibilityLabel: 'dddd d MMMM yyyy',
    monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    monthNamesShort: ['Oc.', 'Şub.', 'Ma.', 'Nis.', 'May.', 'Haz.', 'Tem.', 'Ağs.', 'Eyl.', 'Ek.', 'Kas.', 'Ara.'],
    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    dayNamesShort: ['PZR', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CTS'],
    today: 'Bugün',
  };
  LocaleConfig.locales.en = {
    formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: 'Today',
  };
  LocaleConfig.defaultLocale = language;
};

export default locale;
