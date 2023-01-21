/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {AppIcon} from '@/components';
import {useTheme} from '@/hooks';
import {COLORS, FONTS} from '@/theme';
import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';
import {BottomTabItemList} from './_BottomTabItemList';

type Props = {
  onPress: any;
  label: string;
  isFocused: boolean;
  routesLength?: number;
  currentIndex?: number;
  bottomTabConfig?: any;
};

export const BottomTabItem: FC<Props> = props => {
  const {onPress, label, isFocused, bottomTabConfig} = props;
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        height: '100%',
      }}>
      {BottomTabItemList.map(
        item =>
          item.label === label && (
            <View
              key={item.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <AppIcon
                  name={item.icon}
                  color={isFocused ? colors.tabItemFocused : colors.tabItem}
                  size={bottomTabConfig?.iconSize}
                />
                <Text
                  style={{
                    color: isFocused ? colors.tabItemFocused : colors.tabItem,
                    fontSize: bottomTabConfig.fontSize,
                    fontFamily: FONTS.medium,
                  }}>
                  {item.label}
                </Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: 35,
                  backgroundColor: COLORS.gray,
                  position: 'absolute',
                  right: 0,
                }}></View>
            </View>
          ),
      )}
    </Pressable>
  );
};
