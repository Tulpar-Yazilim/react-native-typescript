import React, {FC, memo} from 'react';
import {ImageBackground, Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';

import Animated from 'react-native-reanimated';

import {useTheme} from '@/hooks';
import {generalStyles} from '@/theme';
import {UseThemeType} from '@/utils';

import {BlockProps} from './block';

const Block: FC<BlockProps> = ({children, animated, onLayout, backgroundImage, resizeMode, If, ...props}) => {
  const {styles} = useTheme(props as UseThemeType);

  if (If === false) {
    return <></>;
  }

  const insideStyles = StyleSheet.flatten([styles, props.style]);

  const PressableComponent = props.pressable ? Pressable : TouchableOpacity;

  if (props.pressable || props.touchable) {
    return (
      <PressableComponent {...props} style={insideStyles}>
        {children}
      </PressableComponent>
    );
  }

  if (animated) {
    return (
      <Animated.View onLayout={onLayout} style={insideStyles}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View onLayout={onLayout} style={insideStyles}>
      {backgroundImage ? (
        <ImageBackground source={{uri: backgroundImage}} resizeMode={resizeMode ?? 'cover'} style={generalStyles.flex}>
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </View>
  );
};

export default memo(Block);
