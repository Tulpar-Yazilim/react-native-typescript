import {ReactElement} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type AppCollapsibleType = {
  title: string | ReactElement;
  collapseHeaderHeight?: number;
  defaultHeight?: number;
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
  isOpen?: boolean;
};
