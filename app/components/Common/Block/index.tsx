import {useTheme} from '@/hooks';
import React, {FC, memo} from 'react';
import {Pressable, View} from 'react-native';

type Props = {
  loading?: boolean;
  preloader?: boolean;
};

const Block: FC<Props | any> = ({children, ...props}) => {
  const {styles} = useTheme(props);

  if (props.pressable) {
    return (
      <Pressable style={[styles, props.style]} {...props}>
        {children}
      </Pressable>
    );
  } else {
    return <View style={[styles, props.style]}>{children}</View>;
  }
};

export default memo(Block);
