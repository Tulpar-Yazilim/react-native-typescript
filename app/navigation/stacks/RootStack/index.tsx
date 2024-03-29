import React from 'react';
import {View} from 'react-native';

import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator, StackCardInterpolationProps} from '@react-navigation/stack';
import {random} from 'lodash';

import Dialog from '@/components/Common/Dialog';
import {RootStackNavigationProps, Routes} from '@/navigation';

import screens from './screens';

/**
 * fade animate trasition navigation
 * @param {*} {current, closing}
 */
export const forFade = ({current}: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const PlaceholderComponent = () => <View />;

const RootStackNavigator = createStackNavigator<RootStackNavigationProps>();
export const rootNavigationRef = createNavigationContainerRef<RootStackNavigationProps>();

const RootStack = () => {
  return (
    <RootStackNavigator.Navigator>
      {screens.map(screen => (
        <RootStackNavigator.Screen
          key={`${random(1000)}_main_stack_screen`}
          name={screen.name}
          component={screen.component ?? PlaceholderComponent}
          options={{
            headerShown: screen.headerShown,
          }}
        />
      ))}
      <RootStackNavigator.Group screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        <RootStackNavigator.Screen
          name={Routes.ALERT}
          component={Dialog}
          options={{
            cardStyleInterpolator: forFade,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.7)'},
            gestureEnabled: false,
          }}
        />
      </RootStackNavigator.Group>
    </RootStackNavigator.Navigator>
  );
};

export default RootStack;
