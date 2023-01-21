import Routes from '@/navigation/Routes';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Dialog from '../../../components/Common/Dialog';
import screens from './screens';

/**
 * fade animate trasition navigation
 * @param {*} {current, closing}
 */
export const forFade = ({current}: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen: any, index: any) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            ...screen.options,
          }}
        />
      ))}
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        <Stack.Screen
          name={Routes.ALERT}
          component={Dialog}
          options={{
            cardStyleInterpolator: forFade,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.7)'},
            gestureEnabled: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
