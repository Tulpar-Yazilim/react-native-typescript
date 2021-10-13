import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import pages from './data';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      {pages.map((el, index) => (
        <Stack.Screen key={index} name={el.name} component={el.component} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
