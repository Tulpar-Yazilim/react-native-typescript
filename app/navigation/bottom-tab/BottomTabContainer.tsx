import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {useAppSelector, useTheme} from '@/hooks';
import {COLORS, bottomTabHeight} from '@/theme';

import {BottomTabItem} from './BottomTabItem';
import {random} from 'lodash';

export const BottomTabContainer: FC<any> = props => {
  const bottomTabDisplay = useAppSelector(state => state.settings.bottomTabDisplay);

  const {state, navigation} = props;
  const {colors} = useTheme();

  const bottomTabConfig = {
    height: bottomTabHeight,
    fontSize: 11,
    iconSize: 26,
  };

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
          {state.routes.map((route: any, index: number) => {
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
                key={`${random(1000)}_tab_item`}
                name={route.name}
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
