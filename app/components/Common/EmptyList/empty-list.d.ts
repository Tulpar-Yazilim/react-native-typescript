import {ColorValue} from 'react-native';

import {ResizeMode, Source} from 'react-native-fast-image';

import {ICONS, SetupSizeTypes} from '@/utils';

export type EmptyListProps = {
  text: string;
  showImage?: boolean;
  image?: string | Source;
  imageResizeMode?: ResizeMode;
  imageHeight?: number;
  imageWidth?: number;
  icon?: keyof typeof ICONS;
  iconSize?: number;
  iconColor?: ColorValue | string;
} & SetupSizeTypes;
