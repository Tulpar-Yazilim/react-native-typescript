/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {AppSvgIcon} from '@components';
import {BottomTabItemList} from './_BottomTabItemList';
import {COLORS, FONTS} from '@theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  onPress: any;
  label: string;
  isFocused: boolean;
  routesLength?: number;
  currentIndex?: number;
  bottomTabConfig?: any;
};

export const BottomTabItem: FC<Props> = props => {
  const {onPress, label, isFocused, currentIndex, bottomTabConfig} = props;

  return (
    <View style={{flex: 1, justifyContent: 'center', height: '100%'}}>
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
              <TouchableOpacity
                onPress={onPress}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <AppSvgIcon
                  name={item.icon}
                  color={isFocused ? COLORS.secondary : COLORS.black}
                  width={bottomTabConfig.iconSize}
                  height={30}
                />
                <Text
                  style={{
                    color: isFocused ? COLORS.secondary : COLORS.black,
                    fontSize: bottomTabConfig.fontSize,
                    fontFamily: FONTS.medium,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
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
    </View>
  );
};
