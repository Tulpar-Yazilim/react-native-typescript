import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type ModalProps = {
  isVisible?: boolean;
  onClose?: () => void;
  animationTime?: number;
  backdropColor?: ColorValue | string;
  backdropOpacity?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};
