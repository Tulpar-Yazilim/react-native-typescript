import React, {memo, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Config from 'react-native-config';

import {Images} from '@/assets';
import {AppImage, Block} from '@/components';
import {RootStackNavigationProps, Routes} from '@/navigation';

const SplashScreen = () => {
  const navigation: StackNavigationProp<RootStackNavigationProps> = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      const navigationName = Config.MENU === 'drawer' ? Routes.MAIN_DRAWER_ROOT : Routes.MAIN_TABS_ROOT;
      navigation.replace(navigationName);
    }, 50);
  }, []);

  return (
    <Block flex bg-white center middle>
      <AppImage resizeMode="contain" url={Images.TulparLogo} width={150} height={100} />
    </Block>
  );
};

export default memo(SplashScreen);
