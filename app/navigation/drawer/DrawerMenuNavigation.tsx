import React, {FunctionComponent} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerMenuItemList} from './DrawerMenuItems';

const Drawer = createDrawerNavigator();

export const DrawerMenuNavigaiton = () => {
  return (
    <>
      <Drawer.Navigator initialRouteName="Home">
        {DrawerMenuItemList.map(item => (
          <Drawer.Screen key={item.label} options={{headerShown: item.headerShown}} name={item.label as string} component={item.component as FunctionComponent} />
        ))}
      </Drawer.Navigator>
    </>
  );
};
