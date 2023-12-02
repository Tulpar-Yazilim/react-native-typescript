import type {IconMoonProps} from 'react-native-icomoon';

import {ICONS} from '@/utils';

export type IconProps = Omit<IconMoonProps, 'iconSet'>;
export type AppIconProps = {
  name: keyof typeof ICONS;
} & IconProps;
