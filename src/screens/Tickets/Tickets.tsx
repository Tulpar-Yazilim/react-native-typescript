import {Block, Shadow} from '@components';
import React from 'react';
import {Text, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

export const TicketsScreen = () => {
  return (
    <Block align="center" justify="center" flex={1}>
      <Shadow>
        <Block w={100} h={100} bg="white" radius={20} />
      </Shadow>
    </Block>
  );
};
