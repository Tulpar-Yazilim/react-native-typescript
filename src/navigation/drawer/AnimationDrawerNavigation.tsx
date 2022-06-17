import React, {FC} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  Animated as RNAnimated,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
//import {HomeScreen} from '../../screens/Home/HomeScreen';
import {Pressable} from 'react-native';
import {DrawerMenuItemList} from './_DrawerMenuItemList';
import {useEffect} from 'react';
import Animated, {interpolateNode} from 'react-native-reanimated';

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
              <Text>asf</Text>
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
  useEffect(() => {
    props.setProgress(props.progress);
  }, [props.progress]);

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 0.1, margin: 20}}>
          <Image
            source={{
              uri: 'https://image.com/image.png',
              height: 60,
              width: 60,
              scale: 0.5,
            }}
            resizeMode="center"
            style={styles.avatar}
          />
        </View>
        <View style={{flex: 1}}>
          <DrawerItem
            label="Dashboard"
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            label="Dashboard"
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            label="Dashboard"
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Home')}
          />
        </View>
      </View>

      <View>
        <DrawerItem
          label="Logout"
          labelStyle={{color: 'red'}}
          onPress={() => Alert.alert('Are your sure to logout?')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(
    new RNAnimated.Value(0),
  ) as any;

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
    <View style={{flex: 1}}>
      <Drawer.Navigator
        // hideStatusBar
        // drawerType="slide"
        // overlayColor="transparent"
        // drawerStyle={styles.drawerStyles}
        // drawerContentOptions={{
        //  activeBackgroundColor: 'transparent',
        //  activeTintColor: 'white',
        //  inactiveTintColor: 'white',
        //}}
        //sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={props => {
          return <DrawerContent setProgress={setProgress} {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
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
    // borderWidth: 1,
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
