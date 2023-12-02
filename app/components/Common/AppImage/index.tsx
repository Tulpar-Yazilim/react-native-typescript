import React, {memo} from 'react';

import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';

import {COLORS} from '@/theme';
import {getStyleShortcuts, heightPixel, widthPixel} from '@/utils';

import {ImageProps} from './app-image';
const Image = createImageProgress(FastImage);

const AppImage = (props: ImageProps) => {
  const {url, size, width = 50, height = 50, resizeMode = 'cover', indicatorColor = COLORS.gray, style, ...otherProps} = props;
  return (
    <Image
      source={typeof url === 'string' ? {uri: url, priority: FastImage.priority.high} : url}
      indicatorProps={{
        color: indicatorColor,
      }}
      resizeMode={resizeMode}
      style={{
        width: widthPixel(size ?? width),
        height: heightPixel(size ?? height),
      }}
      imageStyle={[style, getStyleShortcuts(otherProps)]}
      {...otherProps}
    />
  );
};

export default memo(AppImage);
