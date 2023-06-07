import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {random} from 'lodash';

import {BottomTabItem} from './BottomTabItem';

import {useAppSelector, useTheme} from '@/hooks';
import {bottomTabHeight, COLORS} from '@/theme';
import {fontPixel, heightPixel} from '@/utils';

export const bottomTabConfig = {
  height: heightPixel(bottomTabHeight),
  fontSize: fontPixel(11),
  iconSize: fontPixel(26),
};

export const BottomTabContainer = (props: BottomTabBarProps) => {
  const bottomTabDisplay = useAppSelector(state => state.settings.bottomTabDisplay);

  const {state, navigation} = props;
  const {colors} = useTheme();

  return (
    <>
      {bottomTabDisplay && (
        <View
          style={[
            styles.tab,
            {
              height: bottomTabConfig.height,
              backgroundColor: colors.bottomTabColor,
            },
          ]}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return <BottomTabItem isFocused={isFocused} key={`${random(1000)}_tab_item`} name={route.name} onPress={onPress} routesLength={state.routes?.length} currentIndex={index} />;
          })}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
});
