import React from 'react';

import {bottomTabConfig} from './BottomTabContainer';
import {Screens} from './BottomTabItems';

import {AppIcon, Block} from '@/components';
import {useStyledTag, useTheme} from '@/hooks';
import {ICONS} from '@/utils';

type Props = {
  onPress: () => void;
  name: string;
  isFocused: boolean;
  routesLength?: number;
  currentIndex?: number;
};

export const BottomTabItem = (props: Props) => {
  const {onPress, name, isFocused} = props;
  const {colors} = useTheme();

  const BottomTab = useStyledTag(Block, 'flex center middle');

  return (
    <BottomTab onPress={onPress} pressable>
      <React.Fragment>
        {Screens.map(
          item =>
            item.name === name && (
              <Block key={item.name} flex middle center>
                <AppIcon name={item?.icon as keyof typeof ICONS} color={isFocused ? colors.tabItemFocused : colors.tabItem} size={bottomTabConfig?.iconSize} />
              </Block>
            ),
        )}
      </React.Fragment>
    </BottomTab>
  );
};
