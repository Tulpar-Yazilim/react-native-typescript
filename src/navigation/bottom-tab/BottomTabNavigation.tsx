import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabContainer} from './BottomTabContainer';
import {BottomTabItemList} from './_BottomTabItemList';
import {Host} from 'react-native-portalize';

const Tab = createBottomTabNavigator() as any;

export const BottomTabNavigation: FC<any> = () => {
  return (
    <Host>
      <Tab.Navigator tabBar={(props: any) => <BottomTabContainer {...props} />}>
        {BottomTabItemList.map((item: any) => (
          <Tab.Screen
            key={item.label}
            options={{headerShown: item.headerShown}}
            name={item.label}
            component={item.component}
          />
        ))}
      </Tab.Navigator>
    </Host>
  );
};
