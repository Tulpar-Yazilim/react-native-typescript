import React, {FC, memo} from 'react';
import {Pressable, View} from 'react-native';

import {useTheme} from '@/hooks';

type Props = {
  loading?: boolean;
  preloader?: boolean;
  If?: boolean;
};

const Block: FC<Props | any> = ({children, If, ...props}) => {
  const {styles} = useTheme(props);

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
