/* eslint-disable react-native/no-inline-styles */
import {rgba} from '@utils';
import React, {memo, useRef} from 'react';
import {Animated, Easing, Modal} from 'react-native';
import Block from '../Block';
import {useSelector} from 'react-redux';
import {RootState} from '@store';
import LottieView from 'lottie-react-native';
import {useCallback} from 'react';

const AppLoader = () => {
  const loading = useSelector<RootState>(
    state => state.settings.appLoader,
  ) as boolean;

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
      <Block center middle bg={rgba('#fff', 0.8)} h="100%">
        {/*<ActivityIndicator color={COLORS.white} size="large" />*/}
        <LottieView
          source={require('./loading-circles.json')}
          progress={progress.current}
          loop
          autoPlay={true}
          style={{width: 100, height: 200}}
        />
      </Block>
    </Modal>
  );
};

export default memo(AppLoader);
