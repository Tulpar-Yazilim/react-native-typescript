import React, {memo} from 'react';

import type {IconMoonProps} from 'react-native-icomoon';
import Icomoon from 'react-native-icomoon';

import selectionJson from '../../../assets/selection.json';

import {useTheme} from '@/hooks';
import {heightPixel, ICONS} from '@/utils';

type IconProps = Omit<IconMoonProps, 'iconSet'>;
type AppIconProps = {
  name: keyof typeof ICONS;
} & IconProps;

function AppIcon({name, color, ...restProps}: AppIconProps) {
  const theme = useTheme();
  const colors = {
    primary: theme.colors.primary,
    danger: theme.colors.secondary,
  } as never;

  const themeColor = colors?.[color ?? 'primary'];

  return <Icomoon {...restProps} iconSet={selectionJson} name={ICONS[name as keyof typeof ICONS]} size={heightPixel(restProps.size || 20)} color={themeColor ?? color} />;
}

export default memo(AppIcon);
