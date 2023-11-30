import React from 'react';

import {Images} from '@/assets';
import {AppIcon, Text} from '@/components';
import {useThemeMode} from '@/hooks';
import {COLORS} from '@/theme';

import {EmptyListProps} from './empty-list';
import AppImage from '../AppImage';
import Block from '../Block';

const EmptyList = (props: EmptyListProps) => {
  const {text, image, showImage = true, imageResizeMode = 'contain', imageHeight, imageWidth, icon, iconSize = 32, iconColor = COLORS.primary, ...otherProps} = props;

  const themeMode = useThemeMode();

  return (
    <Block pressable flex center middle mb-72 {...otherProps}>
      {showImage && <AppImage resizeMode={imageResizeMode} url={image ?? Images.EmptyDataImage[themeMode]} height={imageHeight ?? 80} width={imageWidth ?? 80} />}
      {icon && <AppIcon name={icon} size={iconSize} color={iconColor as string} />}
      <Text caption mt-30 center>
        {text}
      </Text>
    </Block>
  );
};

export default EmptyList;
