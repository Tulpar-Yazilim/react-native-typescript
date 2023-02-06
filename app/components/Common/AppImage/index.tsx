import React, {memo} from 'react';
import {ImageResizeMode} from 'react-native';
import {COLORS} from '@/theme';
import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
const Image = createImageProgress(FastImage);

const AppImage = ({
  url,
  size,
  width,
  height,
  resizeMode = 'cover' as ImageResizeMode,
  indicatorColor = COLORS.gray,
  style,
  ...otherProps
}: any) => {
  return (
    <Image
      source={typeof url === 'string' ? {uri: url, priority: FastImage.priority.high} : url}
      indicatorProps={{
        color: indicatorColor,
      }}
      resizeMode={resizeMode}
      style={{
        width: width ? width : size,
        height: height ? height : size,
      }}
      imageStyle={style}
      {...otherProps}
    />
  );
};

export default memo(AppImage);
