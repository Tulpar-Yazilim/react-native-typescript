import React from 'react';
import {AppImage, AppScreen} from '@components';

export const HomeScreen = () => {
  return (
    <AppScreen scroll>
      <AppImage
        height={50}
        width={150}
        url={require('../../assets/images/logo.png')}
      />
    </AppScreen>
  );
};
