import {ReactElement, ReactNode} from 'react';
import {ImageResizeMode, LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';

import {IStyleShortcuts, SetupSizeTypes} from '@/utils';

export type BlockProps = {
  If?: boolean;
  children?: ReactElement | ReactNode;
  pressable?: boolean;
  touchable?: boolean;
  style?: StyleProp<ViewStyle> | ViewStyle;
  onPress?: () => void;
  animated?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  backgroundImage?: string;
  resizeMode?: ImageResizeMode;
} & SetupSizeTypes &
  IStyleShortcuts;
