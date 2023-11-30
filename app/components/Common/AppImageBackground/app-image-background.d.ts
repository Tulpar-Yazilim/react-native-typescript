import {ReactElement, ReactNode} from 'react';
import {ImageSourcePropType, ImageStyle, StyleProp, ViewStyle} from 'react-native';

import {ResizeMode} from 'react-native-fast-image';

export type ImageBackgroundProps = {
  url: string | ImageSourcePropType;
  children: ReactElement | ReactNode;
  resizeMode?: ResizeMode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ImageStyle>;
};
