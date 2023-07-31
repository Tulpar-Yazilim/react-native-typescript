import React, {memo, useCallback, useRef} from 'react';
import {Animated, Easing, Modal} from 'react-native';

import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';

import {RootState} from '@/store';

import Block from '../Block';

const AppLoader = () => {
  const loading = useSelector<RootState>(state => state.settings.appLoader) as boolean;

  const progress = useRef(new Animated.Value(0));

  useCallback(() => {
    if (loading) {
      Animated.timing(progress.current, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  return (
    <Modal visible={loading} transparent animationType="fade">
      <Block flex center middle bg-white h="100%">
        <LottieView source={require('./loading-circles.json')} progress={progress.current} loop autoPlay={true} style={{width: 100, height: 200}} />
      </Block>
    </Modal>
  );
};

export default memo(AppLoader);
