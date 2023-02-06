import Routes from '@/navigation/Routes';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

interface Action {
  text: string;
  onPress?: (_promptText?: string | null) => void;
  style: 'cancel' | 'default' | 'confirm';
}

interface Option {
  cancelable: boolean;
  backgroundClose: boolean;
}

interface DialogComponent {
  type: 'success' | 'warning' | 'error';
  position: 'top' | 'bottom' | 'left' | 'right';
  placeholder?: string;
  title: string;
  message: string;
  option?: Option;
  alertType?: 'confirm' | 'alert' | 'prompt';
  action?: Array<Action>;
}

export default function Dialog() {
  const {t} = useTranslation();
  const navigation: StackNavigationProp<any> = useNavigation();

  const show = ({type, title, message, position, action, option, alertType, placeholder}: DialogComponent) => {
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
