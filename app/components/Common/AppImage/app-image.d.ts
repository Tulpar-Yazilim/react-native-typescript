import {ColorValue, ImageStyle, StyleProp} from 'react-native';

import {ResizeMode, Source} from 'react-native-fast-image';

import {IStyleShortcuts} from '@/utils';

export type ImageProps = {
  url: string | Source;
  size?: number;
  width?: number;
  height?: number;
  resizeMode?: ResizeMode;
  indicatorColor?: ColorValue;
  style?: StyleProp<ImageStyle>;
} & IStyleShortcuts;
