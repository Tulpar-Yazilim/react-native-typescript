import React, {FC, memo, ReactElement, ReactNode} from 'react';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';

import {useTheme} from '@/hooks';
import {IStyleShortcuts, setupSizeTypes, UseThemeType} from '@/utils';

type SetupSizeTypes = Omit<setupSizeTypes, 'setupSizeTypes'>;

interface Props extends SetupSizeTypes, IStyleShortcuts {
  If?: boolean;
  children?: ReactElement | ReactNode;
  pressable?: boolean;
  style?: StyleProp<ViewStyle> | ViewStyle;
  onPress?: () => void;
}

const Block: FC<Props> = ({children, If, ...props}) => {
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
  return <View style={[styles, props.style]}>{children}</View>;
};

export default memo(Block);
