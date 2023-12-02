import React, {memo} from 'react';
import {ImageBackground, ImageResizeMode} from 'react-native';

import {createImageProgress} from 'react-native-image-progress';

import {generalStyles} from '@/theme';

import {ImageBackgroundProps} from './app-image-background';
const Image = createImageProgress(ImageBackground);

const AppImageBackground = (props: ImageBackgroundProps) => {
  const {children, url, resizeMode = 'cover' as ImageResizeMode, style, containerStyle} = props;

  return (
    <Image source={typeof url === 'string' ? {uri: url} : url} resizeMode={resizeMode} style={[generalStyles.flex, generalStyles.fullWidthHeight, containerStyle]} imageStyle={style}>
      {children}
    </Image>
  );
};

export default memo(AppImageBackground);
