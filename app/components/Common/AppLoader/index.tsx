import React, {memo, useCallback, useRef} from 'react';
import {Animated, Easing, Modal} from 'react-native';

import AnimatedLottieView from 'lottie-react-native';

import {Animations} from '@/assets';
import {useAppSelector} from '@/hooks';

import styles from './styles';
import Block from '../Block';

const AppLoader = () => {
  const loading = useAppSelector(state => state.settings.appLoader);

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
        <AnimatedLottieView source={Animations.LoadingCircles} progress={progress.current} loop autoPlay style={styles.lottieView} />
      </Block>
    </Modal>
  );
};

export default memo(AppLoader);
