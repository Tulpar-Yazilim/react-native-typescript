import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {IScreen} from '@/utils';

import screens from './screens';
import {HomeStackNavigationProps} from './types';
import {createNavigationOptions} from '../../components';
import {PlaceholderComponent} from '../RootStack';

const Stack = createStackNavigator<HomeStackNavigationProps>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen: IScreen<HomeStackNavigationProps>, index: number) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component ?? PlaceholderComponent}
          options={() => createNavigationOptions({title: screen.title, headerShown: screen.headerShown})}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
