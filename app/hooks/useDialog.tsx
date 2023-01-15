import {useNavigation} from '@react-navigation/native';
import Routes from '@routes';

interface Action {
  text: string;
  onPress: () => void;
  style: 'cancel' | 'default';
}

interface Option {
  cancelable: boolean;
  backgroundClose: boolean;
}

interface DialogComponent {
  type: 'success' | 'warning' | 'error';
  position: 'top' | 'bottom' | 'left' | 'right';
  title: string;
  message: string;
  option?: Option;
  action?: Array<Action>;
}

export default function Dialog() {
  const navigation = useNavigation() as any;

  const show = ({
    type,
    title,
    message,
    position,
    action,
    option,
  }: DialogComponent) => {
    navigation.navigate(Routes.ALERT, {
      type: type ?? 'warning',
      position: position ?? 'bottom',
      title: title ?? '',
      message: message ?? '',
      action: action ?? [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      option: {
        cancelable: option?.cancelable ?? true,
        backgroundClose: option?.backgroundClose ?? true,
      },
    });
  };

  return {show};
}
