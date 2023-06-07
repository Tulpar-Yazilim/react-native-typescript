import React, {memo, useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

import layout from '../../config/layout.json';

import {MainStackNavigationProps, Routes} from '@/navigation';

const SplashScreen = () => {
  const navigation: StackNavigationProp<MainStackNavigationProps> = useNavigation();
  const progress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress.current, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const navigationName = layout.menu === 'drawer' ? Routes.MAIN_DRAWER_ROOT : Routes.MAIN_TABS_ROOT;
      navigation.replace(navigationName);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.view}>
      <LottieView source={require('./loading-circles.json')} progress={progress.current} loop={true} autoPlay={true} style={{width: 100, height: 200}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default memo(SplashScreen);
