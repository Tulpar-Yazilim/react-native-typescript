/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {Keyboard, View, Dimensions} from 'react-native';
import {BottomTabItem} from './BottomTabItem';
import AnimatedTabBar from './AnimatedTabBar';
import {COLORS, window, bottomTabHeight} from '@theme';

export const BottomTabContainer: FC<any> = props => {
  const {state, descriptors, navigation} = props;
  const [showTab, setShowTab] = useState(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setShowTab(false));
    Keyboard.addListener('keyboardDidHide', () => setShowTab(true));
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const bottomTabConfig = {
    height: bottomTabHeight,
    fontSize: window.height < 680 ? 10 : 12,
    iconSize: window.height < 680 ? 25 : 30,
  };

  return (
    <>
      {showTab && (
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            backgroundColor: COLORS.white,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            // TODO BURAYA THEME DOSYASINDA OLUŞTURDUĞUN SIZE LARDAN KOY !
            width: Dimensions.get('window').width,
            height: bottomTabConfig.height,
          }}>
          {/*<AnimatedTabBar />*/}
          {state.routes.map((route: any, index: number) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <BottomTabItem
                isFocused={isFocused}
                key={index}
                label={label}
                onPress={onPress}
                routesLength={state.routes}
                currentIndex={index}
                bottomTabConfig={bottomTabConfig}
              />
            );
          })}
        </View>
      )}
    </>
  );
};
