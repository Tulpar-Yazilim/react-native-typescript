import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Routes from './Routes';
import HomeStack from './HomeStack';

const RootStackContent = () => {
  const Root = createNativeStackNavigator();
  return (
    <Root.Navigator screenOptions={{headerBackTitleVisible: false}}>
      <Root.Screen
        name={Routes.HOME_ROOT}
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
    </Root.Navigator>
  );
};

const RootStack = (linking: any) => {
  return (
    <NavigationContainer linking={linking}>
      <RootStackContent />
    </NavigationContainer>
  );
};

export default RootStack;
