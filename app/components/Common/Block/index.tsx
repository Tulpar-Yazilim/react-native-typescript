import React, {FC, memo, ReactElement, ReactNode} from 'react';
import {ImageBackground, LayoutChangeEvent, Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import Animated from 'react-native-reanimated';

import {useTheme} from '@/hooks';
import {IStyleShortcuts, setupSizeTypes, UseThemeType} from '@/utils';

type SetupSizeTypes = Omit<setupSizeTypes, 'setupSizeTypes'>;

interface Props extends SetupSizeTypes, IStyleShortcuts {
  If?: boolean;
  children?: ReactElement | ReactNode;
  pressable?: boolean;
  style?: StyleProp<ViewStyle> | ViewStyle;
  onPress?: () => void;
  animated?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  backgroundImage?: string;
}

const Block: FC<Props> = ({children, animated, onLayout, backgroundImage, If, ...props}) => {
  const {styles} = useTheme(props as UseThemeType);

  if (If === false) {
    return <></>;
  }

  if (props.pressable) {
    return (
      <Pressable {...props} style={[styles, props.style]}>
        {children}
      </Pressable>
    );
  }

  if (animated) {
    return (
      <Animated.View onLayout={onLayout} style={[styles, props.style]}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View onLayout={onLayout} style={[styles, props.style]}>
      {backgroundImage ? (
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={blockStyles.container}>
          {children}
        </ImageBackground>
      ) : (
        <>{children}</>
      )}
    </View>
  );
};

const blockStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(Block);
