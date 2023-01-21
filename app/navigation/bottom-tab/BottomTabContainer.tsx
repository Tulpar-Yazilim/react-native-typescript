import {useTheme} from '@/hooks';
import {COLORS, bottomTabHeight} from '@/theme';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, Keyboard, StyleSheet, View} from 'react-native';
import {BottomTabItem} from './BottomTabItem';

export const BottomTabContainer: FC<any> = props => {
  const {state, descriptors, navigation} = props;
  const [showTab, setShowTab] = useState(true);
  const {colors} = useTheme();

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
    fontSize: 11,
    iconSize: 24,
  };

  return (
    <>
      {showTab && (
        <View
          style={[
            styles.tab,
            {
              height: bottomTabConfig.height,
              backgroundColor: colors.bottomTabColor,
            },
          ]}>
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
