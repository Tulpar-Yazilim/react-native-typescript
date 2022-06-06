import {Platform} from 'react-native';
import {Toast} from '../components/ToastMessage/lib';

const topOffset = Platform.select({
  ios: 50,
  android: 0,
});

export const toast = {
  success: (text: string, options?: any) => {
    Toast.show({
      type: 'success',
      position: 'top',
      visibilityTime: 2000,
      text1: 'Başarılı !',
      text2: text || 'Lütfen bilgileriniz kontrol ediniz...',
      topOffset,
      ...options,
    });
  },
  error: (text: string, options?: any) => {
    Toast.show({
      type: 'error',
      position: 'top',
      visibilityTime: 2000,
      text1: 'Başarılı !',
      text2: text || 'Lütfen bilgileriniz kontrol ediniz...',
      topOffset,
      ...options,
    });
  },
};
