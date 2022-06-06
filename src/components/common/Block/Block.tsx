import React, {FC} from 'react';
import {View} from 'react-native';
import {getStyleShortcuts} from '../../../utils/StyleShortcut';

type Props = {};

export const Block: FC<Props | any> = ({children, ...props}) => {
  return (
    <View style={[getStyleShortcuts(props), props.style]}>{children}</View>
  );
};
