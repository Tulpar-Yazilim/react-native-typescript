import React from 'react';
import FastImage from 'react-native-fast-image';

const AppImage = ({url, size, width, height, style, ...otherProps}: any) => {
  return (
    <FastImage
      source={typeof url === 'string' ? {uri: url} : url}
      resizeMode={FastImage.resizeMode.cover}
      style={[
        {width: width ? width : size, height: height ? height : size},
        style,
      ]}
      {...otherProps}
    />
  );
};

export default AppImage;
