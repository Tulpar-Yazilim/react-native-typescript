import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from './screens';
import {IScreen} from '../Models/IScreen';
import {createNavigationOptions} from '../../header/DefaultHeader';

const Stack = createStackNavigator();

const HomeStack: FC = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen: IScreen, index: any) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={props => createNavigationOptions({screen, ...props})}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
