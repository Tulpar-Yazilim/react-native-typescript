import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Routes from '@/navigation/Routes';
import {DialogProps} from '@/utils';
import {NavigationType} from '@/utils/infrastructure/types';

export default function Dialog() {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationType>();

  const show = ({type, title, message, position, action, option, alertType, placeholder}: DialogProps) => {
    setTimeout(() => {
      navigation.navigate(Routes.ALERT, {
        type: type ?? 'warning',
        position: position ?? 'bottom',
        title: title ?? '',
        message: message ?? '',
        alertType: alertType ?? 'alert',
        placeholder: placeholder ?? '',
        action: action ?? [
          {
            text: t('ok'),
            style: 'confirm',
          },
        ],
        option: {
          cancelable: option?.cancelable ?? true,
          backgroundClose: alertType === 'alert' ? option?.backgroundClose ?? true : false,
        },
      });
    }, 50);
  };

  return {show};
}
