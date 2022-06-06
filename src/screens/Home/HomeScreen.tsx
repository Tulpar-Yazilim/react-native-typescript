import React from 'react';
import {AppImage, Screen} from '@components';

export const HomeScreen = () => {
  return (
    <Screen scroll>
      <AppImage
        height={50}
        width={150}
        url={require('../../assets/images/logo.png')}
      />
    </Screen>
  );
};
