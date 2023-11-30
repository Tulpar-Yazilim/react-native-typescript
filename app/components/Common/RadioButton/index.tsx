import React, {memo} from 'react';

import {ViewStyle} from 'react-native/types';
import Animated, {AnimatedStyleProp, useAnimatedStyle, withTiming} from 'react-native-reanimated';

import {COLORS, generalStyles} from '@/theme';

import {RadioButtonProps} from './radio-button';
import Block from '../Block';
import Text from '../Text';

const RadioButton = (props: RadioButtonProps) => {
  const {item, checked, setChecked} = props;

  const checkedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      backgroundColor: COLORS.radioButtonChecked,
      display: checked ? 'flex' : 'none',
      borderRadius: 25,
      transform: [
        {
          scale: withTiming(checked ? 1.5 : 0.7),
        },
      ],
      flex: 1,
      zIndex: 9999,
    } as AnimatedStyleProp<ViewStyle>;
  });

  return (
    <Block row mt-5 center pressable onPress={setChecked}>
      <Block border borderColor="radioButtonBorder" w-25 h-25 rounded-25>
        <Block flex m-2 rounded-25 style={generalStyles.overflow}>
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
