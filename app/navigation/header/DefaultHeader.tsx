/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Pressable} from 'react-native';
import {AppIcon, Text} from '@components';
import {ICONS} from '@utils';

export const HeaderRight: FC<any> = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable
        style={{
          padding: 16,
          flexDirection: 'row',
          borderColor: '#dedede',
          borderWidth: 1,
        }}>
        <AppIcon name={ICONS.home} />
        <Text ml={10}>Default</Text>
      </Pressable>
    </View>
  );
};

export const createNavigationOptions = (props: any) => {
  const {screen} = props;
  const options = {
    // headerRight: () => <HeaderRight {...props} />,
    headerStyle: {},
    headerTitle: screen.title,
    // headerBackTitleVisible: false,
    headerTruncatedBackTitle: '',
    headerBackImageStyle: {},
    headerBackTitleStyle: {
      fontSize: 15,
    },
    headerRightContainerStyle: {},
    headerLeftContainerStyle: {},
    headerTitleStyle: {
      fontSize: 15,
    },
  };

  return screen.headerShown ? options : {headerShown: false};
};
