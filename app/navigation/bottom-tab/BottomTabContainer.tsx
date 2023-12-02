import React from 'react';
import {StyleSheet, View} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {random} from 'lodash';

import {useAppSelector, useTheme} from '@/hooks';
import {BOTTOM_TAB_HEIGHT, COLORS} from '@/theme';
import {fontPixel, heightPixel} from '@/utils';

import {BottomTabItem} from './BottomTabItem';

export const bottomTabConfig = {
  height: heightPixel(BOTTOM_TAB_HEIGHT),
  fontSize: fontPixel(11),
  iconSize: fontPixel(26),
};

export const BottomTabContainer = (props: BottomTabBarProps) => {
  const bottomTabDisplay = useAppSelector(state => state.settings.bottomTabDisplay);

  const {state, navigation} = props;
  const {colors} = useTheme();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    width: '100%',
  },
});
