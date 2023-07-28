import React, {FC, memo, ReactElement, ReactNode} from 'react';
import {LayoutChangeEvent, Pressable, StyleProp, View, ViewStyle} from 'react-native';

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
}

const Block: FC<Props> = ({children, animated, onLayout, If, ...props}) => {
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
      {children}
    </View>
  );
};

export default memo(Block);
