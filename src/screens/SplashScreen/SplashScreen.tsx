/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useRef} from 'react';
import {Animated, View, Easing, StyleSheet} from 'react-native';
//import {Icon} from '../../assets/icons';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import layout from '../../config/layout.json';
//import LottieView from 'lottie-react-native';

export const SplashScreen: FC = () => {
  const navigation: StackNavigationProp<any> = useNavigation();
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
      const navigationName =
        layout.menu === 'drawer'
          ? 'DrawerTabNavigation'
          : 'BottomTabNavigation';

      navigation.replace(navigationName);
    }, 2000);
  }, []);

  return (
    <View style={styles.view}>
      {/*<LottieView
        source={require('./train.json')}
        progress={progress.current}
        loop={true}
        autoPlay={true}
        style={{width: 300, height: '100%'}}
      />*/}
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
