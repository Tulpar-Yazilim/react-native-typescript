import React from 'react';

import {AppScreen, Block, Shadow} from '@/components';

export const TicketsScreen = () => {
  return (
    <AppScreen keyboardScroll flex-10>
      <Shadow>
        <Block w={100} h={100} bg="white" radius={20} />
      </Shadow>
    </AppScreen>
  );
};
