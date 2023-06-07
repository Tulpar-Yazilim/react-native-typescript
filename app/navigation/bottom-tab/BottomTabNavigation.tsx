import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Host} from 'react-native-portalize';

import {BottomTabContainer} from './BottomTabContainer';
import {Screens} from './BottomTabItems';
import {BottomTabStackNavigationProps} from './types';

const Tab = createBottomTabNavigator<BottomTabStackNavigationProps>();

export const BottomTabNavigation = () => {
  return (
    <Host>
      <Tab.Navigator tabBar={props => <BottomTabContainer {...props} />}>
        {Screens.map(item => (
          <Tab.Screen key={item.name} options={{headerShown: item.headerShown}} name={item.name} component={item.component} />
        ))}
      </Tab.Navigator>
    </Host>
  );
};
