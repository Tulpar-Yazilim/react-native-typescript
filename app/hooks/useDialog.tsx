import {useTranslation} from 'react-i18next';

import {rootNavigationRef, Routes} from '@/navigation';
import {DialogProps} from '@/utils';

export default function Dialog() {
  const {t} = useTranslation();

  const show = ({type, title, message, position, action, option, alertType, placeholder}: DialogProps) => {
    setTimeout(() => {
      rootNavigationRef.navigate(Routes.ALERT, {
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
