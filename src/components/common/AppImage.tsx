import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const AppImage = ({url, size, style, ...otherProps}) => {
  return (
    <FastImage
      source={typeof url === 'string' ? {uri: url} : url}
      resizeMode={FastImage.resizeMode.cover}
      style={[{width: size, height: size}, style]}
      {...otherProps}
    />
  );
};

export default AppImage;

const styles = StyleSheet.create({});
