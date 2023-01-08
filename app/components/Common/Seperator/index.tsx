import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@theme';
import Block from '../Block';

const Separator = ({color = COLORS.gray, isVertical = false, ...rest}) => {
  const separatorStyle = isVertical
    ? styles.verticalSeparator
    : styles.horizontalSeparator;
  return (
    <Block {...rest}>
      <View style={[separatorStyle, {backgroundColor: color}]} />
    </Block>
  );
};

const styles = StyleSheet.create({
  horizontalSeparator: {
    height: 0.8,
    width: '100%',
  },
  verticalSeparator: {
    flex: 1,
    width: 0.8,
  },
});

export default memo(Separator);
