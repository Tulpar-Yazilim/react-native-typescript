import React, {memo} from 'react';
import {View} from 'react-native';

import {COLORS} from '@/theme';

import {SeperatorProps} from './seperator';
import styles from './styles';
import Block from '../Block';

const Separator = (props: SeperatorProps) => {
  const {color = COLORS.lightGray, isVertical, ...otherProps} = props;

  const separatorStyle = isVertical ? styles.verticalSeparator : styles.horizontalSeparator;
  return (
    <Block {...otherProps}>
      <View style={[separatorStyle, {backgroundColor: color}]} />
    </Block>
  );
};

export default memo(Separator);
