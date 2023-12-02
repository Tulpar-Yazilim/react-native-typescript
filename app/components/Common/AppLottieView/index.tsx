import React, {memo} from 'react';

import LottieView from 'lottie-react-native';

import {LottieViewProps} from './app-lottie-view';

const AppLottieView = (props: LottieViewProps) => {
  const {animation = '', autoPlay = true, loop = true, ...otherProps} = props;
  return <LottieView source={animation} autoPlay={autoPlay} loop={loop} {...otherProps} />;
};

export default memo(AppLottieView);
