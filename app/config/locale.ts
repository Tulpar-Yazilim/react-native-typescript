import moment from 'moment';
import 'moment/locale/tr';
import {initLocale} from '../lang/i18';
import {LocaleConfig} from 'react-native-calendars';

const locale = () => {
  initLocale();
  moment.locale('tr');
  LocaleConfig.locales.tr = {
    monthNames: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ],
    monthNamesShort: [
      'Oc.',
      'Şub.',
      'Ma.',
      'Nis.',
      'May.',
      'Haz.',
      'Tem.',
      'Ağs.',
      'Eyl.',
      'Ek.',
      'Kas.',
      'Ara.',
    ],
    dayNames: [
      'Pazar',
      'Pazartesi',
      'Salı',
      'Çarşamba',
      'Perşembe',
      'Cuma',
      'Cumartesi',
    ],
    dayNamesShort: ['PZR', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CTS'],
    today: 'Bugün',
  };
  LocaleConfig.defaultLocale = 'tr';
};

export default locale;
