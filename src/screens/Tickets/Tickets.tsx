import {Block, Shadow, AppScreen} from '@components';
import React from 'react';

export const TicketsScreen = () => {
  return (
    <AppScreen keyboardScroll flex={1} justify="center" align="center">
      <Shadow>
        <Block w={100} h={100} bg="white" radius={20} />
      </Shadow>
    </AppScreen>
  );
};
