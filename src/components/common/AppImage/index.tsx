import React, {memo} from 'react';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import {COLORS} from '@theme';
const Image = createImageProgress(FastImage);

const AppImage = ({url, size, width, height, style, ...otherProps}: any) => {
  return (
    <Image
      source={
        typeof url === 'string'
          ? {uri: url, priority: FastImage.priority.high}
          : url
      }
      indicatorProps={{
        color: COLORS.gray,
      }}
      resizeMode={FastImage.resizeMode.cover}
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
