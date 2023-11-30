import {StyleProp, TextStyle} from 'react-native';

import {ITextStyles, SetupSizeTypes} from '@/utils';

export type TextProps = {
  params?: object;
  children?: string | string[];
  animated?: boolean;
  html?: boolean;
  style?: StyleProp<TextStyle>;
  pressable?: boolean;
  touchable?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  onPress?: () => void;
} & SetupSizeTypes &
  ITextStyles;
