import React, {FC, useEffect} from 'react';
import {Alert, Pressable, StyleSheet, Text, Animated as RNAnimated} from 'react-native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {DrawerItem, createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerMenuItemList} from './DrawerMenuItems';
import Animated, {interpolateNode} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import Routes from '../Routes';
import {AppImage, Block} from '@/components';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens: FC<any> = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: undefined,
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Text>Menu</Text>
            </Pressable>
          ),
        }}>
        {DrawerMenuItemList.map(item => (
          <Drawer.Screen
            key={item.label}
            options={{headerShown: item.headerShown}}
            name={item.label}
            component={item.component}
          />
        ))}
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (props: any) => {
  const navigation: StackNavigationProp<any> = useNavigation();

  useEffect(() => {
    props.setProgress(props.progress);
  }, [props.progress]);

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{flex: 1}}>
      <Block flex>
        <Block m-20>
          <AppImage url="https://image.com/image.png" size={60} resizeMode="center" style={styles.avatar} />
        </Block>
        <Block flex>
          <DrawerItem
            label="Dashboard"
            style={styles.drawerItem}
            onPress={() => navigation.navigate(Routes.HOME_SCREEN)}
          />
          <DrawerItem
            label="Dashboard"
            style={styles.drawerItem}
            onPress={() => navigation.navigate(Routes.HOME_SCREEN)}
          />
          <DrawerItem
            label="Dashboard"
            style={styles.drawerItem}
            onPress={() => navigation.navigate(Routes.HOME_SCREEN)}
          />
        </Block>
      </Block>

      <Block>
        <DrawerItem
          label="Logout"
          labelStyle={{color: 'red'}}
          onPress={() => Alert.alert('Are your sure to logout?')}
        />
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new RNAnimated.Value(0)) as any;

  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <Block flex>
      <Drawer.Navigator
        drawerContent={props => {
          return <DrawerContent setProgress={setProgress} {...props} />;
        }}>
        <Drawer.Screen name="Screens">{props => <Screens {...props} style={animatedStyle} />}</Drawer.Screen>
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
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {
    backgroundColor: '#dedede',
  },
  drawerLabel: {marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
