import React from 'react';
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabContainer} from './BottomTabContainer';
import {BottomTabItemList} from './BottomTabItems';
import {Host} from 'react-native-portalize';

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
    return (
        <Host>
            <Tab.Navigator tabBar={(props: BottomTabBarProps) => <BottomTabContainer {...props} />}>
                {BottomTabItemList.map(item => (
                    <Tab.Screen key={item.name} options={{headerShown: item.headerShown}} name={item.name} component={item.component} />
                ))}
            </Tab.Navigator>
        </Host>
    );
};
