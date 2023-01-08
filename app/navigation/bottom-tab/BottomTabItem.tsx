/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import {AppIcon} from '@components';
import {BottomTabItemList} from './_BottomTabItemList';
import {COLORS, FONTS} from '@theme';
import {useTheme} from '@hooks';

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
      }}
    >
      {BottomTabItemList.map(
        item =>
          item.label === label && (
            <View
              key={item.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
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
                  }}
                >
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
                }}
              ></View>
            </View>
          ),
      )}
    </Pressable>
  );
};
