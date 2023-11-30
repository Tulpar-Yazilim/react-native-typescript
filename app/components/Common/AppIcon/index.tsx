import React, {memo} from 'react';

import Icomoon from 'react-native-icomoon';

import {SelectionJson} from '@/assets';
import {useTheme} from '@/hooks';
import {heightPixel, ICONS} from '@/utils';

import {AppIconProps} from './app-icon';

function AppIcon({name, color, ...restProps}: AppIconProps) {
  const theme = useTheme();
  const colors = {
    primary: theme.colors.primary,
    danger: theme.colors.secondary,
  } as never;

  const themeColor = colors?.[color ?? 'primary'];

  return <Icomoon {...restProps} iconSet={SelectionJson} name={ICONS[name as unknown as keyof typeof ICONS]} size={heightPixel(restProps.size ?? 20)} color={themeColor ?? color} />;
}

export default memo(AppIcon);
