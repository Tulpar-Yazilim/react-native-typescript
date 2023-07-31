import React, {memo} from 'react';

import {ViewStyle} from 'react-native/types';
import Animated, {AnimatedStyleProp, useAnimatedStyle, withSpring} from 'react-native-reanimated';

import {useTheme} from '@/hooks';

import Block from '../Block';
import Text from '../Text';

export type RadioButtonItem = {
  label: string;
  value: string | number;
};

type RadioButtonType = {
  item: RadioButtonItem;
  checked: boolean;
  setChecked: () => void;
};

const RadioButton = ({item, checked, setChecked}: RadioButtonType) => {
  const theme = useTheme();

  const checkedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      backgroundColor: theme.colors.radioButtonChecked,
      display: checked ? 'flex' : 'none',
      borderRadius: 25,
      transform: [
        {
          scale: withSpring(checked ? 1.5 : 0.7),
        },
      ],
      flex: 1,
      zIndex: 9999,
    } as AnimatedStyleProp<ViewStyle>;
  });

  return (
    <Block row mt-5 center pressable onPress={setChecked}>
      <Block border w-25 h-25 rounded-25 style={{borderColor: theme.colors.radioButtonBorder}}>
        <Block flex m-2 rounded-25 style={{overflow: 'hidden'}}>
          <Animated.View style={checkedStyle} />
        </Block>
      </Block>
      <Text black pl-5>
        {item.label}
      </Text>
    </Block>
  );
};

export default memo(RadioButton);
