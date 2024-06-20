import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export interface AppBottomSheetProps {
  children: ReactNode;
  backdrop?: boolean;
  portal?: boolean;
  customStyles?: ViewStyle;
  isFlatList?: boolean;
  isVisible?: boolean;
  enablePanDownToClose?: boolean;
  onClose?: () => void;
}
