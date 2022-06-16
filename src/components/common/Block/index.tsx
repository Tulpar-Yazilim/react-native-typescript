import React, {FC, memo} from 'react';
import {View} from 'react-native';
import {getStyleShortcuts} from '../../../utils/StyleShortcut';

type Props = {
  loading?: boolean;
  preloader?: boolean;
};

const Block: FC<Props | any> = ({children, ...props}) => {
  return (
    <View style={[getStyleShortcuts(props), props.style]}>{children}</View>
  );
};

export default memo(Block);
