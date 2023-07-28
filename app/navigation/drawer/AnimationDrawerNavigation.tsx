import React, {useEffect} from 'react';
import {Alert, Pressable, Animated as RNAnimated, StyleSheet, Text, ViewStyle} from 'react-native';

import {createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Animated, {AnimatedStyleProp, interpolate} from 'react-native-reanimated';

import {AppImage, Block} from '@/components';
import {rootNavigationRef, Routes} from '@/navigation';

import {DrawerMenuItemList} from './DrawerMenuItems';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type DrawerScreenType = {
  navigation: DrawerNavigationProp<ParamListBase>;
  animatedStyle: AnimatedStyleProp<ViewStyle>;
};

type DrawerContentType = {
  drawerProps: DrawerContentComponentProps;
  progress: RNAnimated.Value;
  setProgress: React.Dispatch<React.SetStateAction<RNAnimated.Value>>;
};

const Screens = ({navigation, animatedStyle}: DrawerScreenType) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, animatedStyle])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: undefined,
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Text>menu</Text>
            </Pressable>
          ),
        }}>
        {DrawerMenuItemList.map(item => (
          <Drawer.Screen key={item.label} options={{headerShown: item.headerShown}} name={item.label as string} component={item.component as React.FunctionComponent} />
        ))}
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = ({drawerProps, progress, setProgress}: DrawerContentType) => {
  useEffect(() => {
    setProgress(progress);
  }, [progress]);

  return (
    <DrawerContentScrollView {...drawerProps} scrollEnabled={false} contentContainerStyle={{flex: 1}}>
      <Block flex>
        <Block m-20>
          <AppImage url="https://image.com/image.png" size={60} resizeMode="center" style={styles.avatar} />
        </Block>
        <Block flex>
          <DrawerItem label="Dashboard" style={styles.drawerItem} onPress={() => rootNavigationRef?.navigate(Routes.MAIN_DRAWER_ROOT)} />
          <DrawerItem label="Dashboard" style={styles.drawerItem} onPress={() => rootNavigationRef?.navigate(Routes.MAIN_DRAWER_ROOT)} />
          <DrawerItem label="Dashboard" style={styles.drawerItem} onPress={() => rootNavigationRef?.navigate(Routes.MAIN_DRAWER_ROOT)} />
        </Block>
      </Block>

      <Block>
        <DrawerItem label="Logout" labelStyle={{color: 'red'}} onPress={() => Alert.alert('Are your sure to logout?')} />
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new RNAnimated.Value(0));

  const scale = interpolate(progress as unknown as number, [0, 1], [1, 0.8]);
  const borderRadius = interpolate(progress as unknown as number, [0, 1], [0, 16]);

  const animatedStyle = {borderRadius, transform: [{scale}]} as AnimatedStyleProp<ViewStyle>;

  return (
    <Block flex>
      <Drawer.Navigator
        drawerContent={props => {
          return <DrawerContent setProgress={setProgress} progress={progress} drawerProps={props} />;
        }}>
        <Drawer.Screen name="Screens">{props => <Screens {...props} animatedStyle={animatedStyle} />}</Drawer.Screen>
      </Drawer.Navigator>
    </Block>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    borderRadius: 14,
    overflow: 'scroll',
  },
  drawerItem: {
    backgroundColor: '#dedede',
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
