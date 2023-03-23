import React, {FC, memo, ReactElement, ReactNode} from 'react';
import {LayoutChangeEvent, Pressable, StyleProp, View, ViewStyle} from 'react-native';

import {useTheme} from '@/hooks';
import {IStyleShortcuts, UseThemeType} from '@/utils';

interface Props extends IStyleShortcuts {
  loading?: boolean;
  preloader?: boolean;
  If?: boolean;
  children?: ReactElement | ReactNode;
  pressable?: boolean;
  style?: StyleProp<ViewStyle> | ViewStyle;
  onPress?: () => void;
  onLayout?: (_event: LayoutChangeEvent) => void;
  preloaderStyle?: StyleProp<ViewStyle> | ViewStyle;
}

const Block: FC<Props | never> = ({children, If, ...props}) => {
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
  } else {
    return (
      <View {...props} style={[styles, props.style]}>
        {children}
      </View>
    );
  }
};

export default memo(Block);
