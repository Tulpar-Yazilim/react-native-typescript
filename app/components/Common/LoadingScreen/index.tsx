import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';

import {generalStyles} from '@/theme';

import {LoadingScreenProps} from './loading-screen';
import Block from '../Block';

const LoadingScreen = (props: LoadingScreenProps) => {
  const {backgroundColor = 'rgba(0,0,0,0.7)', color} = props;
  return (
    <Block center middle style={[generalStyles.absoluteFill, {backgroundColor}]}>
      <ActivityIndicator color={color} size="large" />
    </Block>
  );
};
export default memo(LoadingScreen);
