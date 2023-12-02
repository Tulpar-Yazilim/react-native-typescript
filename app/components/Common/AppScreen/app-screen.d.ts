import {ReactNode} from 'react';
import {ImageResizeMode, ViewStyle} from 'react-native';

import {StackNavigationOptions} from '@react-navigation/stack';

export type ScreenProps = {
  scroll?: boolean;
  safe?: boolean;
  keyboardScroll?: boolean;
  customStyle?: ViewStyle;
  navigationOptions?: StackNavigationOptions;
  flatList?: boolean;
  children: ReactNode;
  loading?: boolean;
  title?: string;
  canGoBack?: boolean;
  onRefreshData?: () => Promise<void> | void;
  backgroundImage?: string;
  backgroundResizeMode?: ImageResizeMode;
};
