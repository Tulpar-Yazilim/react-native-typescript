import {AppIcon, Block} from '@/components';
import {useTheme} from '@/hooks';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {BottomTabItemList} from './BottomTabItems';

type Props = {
  onPress: any;
  name: string;
  isFocused: boolean;
  routesLength?: number;
  currentIndex?: number;
  bottomTabConfig?: any;
};

export const BottomTabItem: FC<Props> = props => {
  const {onPress, name, isFocused, bottomTabConfig} = props;
  const {colors} = useTheme();
  return (
    <Block flex center middle>
      <Pressable onPress={onPress}>
        {BottomTabItemList.map(
          item =>
            item.name === name && (
              <Block key={item.name} flex center middle>
                <AppIcon
                  name={item.icon}
                  color={isFocused ? colors.tabItemFocused : colors.tabItem}
                  size={bottomTabConfig?.iconSize}
                />
              </Block>
            ),
        )}
      </Pressable>
    </Block>
  );
};
