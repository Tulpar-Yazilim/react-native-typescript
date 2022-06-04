import React, {memo, useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {COLORS, SIZES, Text, Block} from '@theme';
import AppIcon from './AppIcon';

export class AppTabItem {
  title: string = '';
  value: string = '';
  iconType: string = '';
  iconName: string = '';
  onPress? = () => {};
}

const AppTab = ({selected = '', items = new Array<AppTabItem>(), ...props}) => {
  const [selectedTab, setSelectedTab] = useState(
    selected ? selected : items[0]?.value,
  );
  const tabWidth = 100 / items.length;

  return (
    <Block height={54} row {...props}>
      {items.map((item, index) => (
        <Pressable
          key={'app_tab_' + index}
          style={[
            styles.tabButton,
            {
              backgroundColor:
                selectedTab === item.value ? COLORS.primary : COLORS.lightGray,
              width: `${tabWidth}` + '%',
            },
          ]}
          onPress={() => {
            setSelectedTab(item.value);
            item.onPress && item.onPress();
          }}>
          {item.iconName?.length > 0 && (
            <AppIcon
              type={item.iconType}
              name={item.iconName}
              color={
                selectedTab === item.value ? COLORS.white : COLORS.tertiary
              }
              size={28}
            />
          )}
          <Text
            medium
            size={16}
            marginLeft={10}
            color={selectedTab === item.value ? COLORS.white : COLORS.primary}>
            {item.title}
          </Text>
        </Pressable>
      ))}
    </Block>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
});

export default memo(AppTab);
