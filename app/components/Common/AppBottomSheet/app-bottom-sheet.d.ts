import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export interface AppBottomSheetProps {
  children: ReactNode;
  snapPoints?: Array<number>;
  backdrop?: boolean;
  portal?: boolean;
  customStyles?: ViewStyle;
  isFlatList?: boolean;
  isVisible?: boolean;
  enablePanDownToClose?: boolean;
  onClose?: () => void;
}
