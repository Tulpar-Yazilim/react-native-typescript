import React, {memo} from 'react';
import {ImageResizeMode} from 'react-native';

import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';

import {COLORS} from '@/theme';
import {getStyleShortcuts, widthPixel} from '@/utils';
const Image = createImageProgress(FastImage);

const AppImage = ({url, size, width, height, resizeMode = 'cover' as ImageResizeMode, indicatorColor = COLORS.gray, style, ...otherProps}: any) => {
  return (
    <Image
      source={typeof url === 'string' ? {uri: url, priority: FastImage.priority.high} : url}
      indicatorProps={{
        color: indicatorColor,
      }}
      resizeMode={resizeMode}
      style={{
        width: widthPixel(width ? width : size),
        height: widthPixel(height ? height : size),
      }}
      imageStyle={[style, getStyleShortcuts(otherProps)]}
      {...otherProps}
    />
  );
};

export default memo(AppImage);
