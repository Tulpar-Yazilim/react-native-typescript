import React, {FC} from 'react';
import {Pressable} from 'react-native';

import {bottomTabConfig} from './BottomTabContainer';
import {Screens} from './BottomTabItems';
import {BottomTabStackNavigationProps} from './types';
import {IScreen} from '../stacks/Models/IScreen';

import {AppIcon, Block} from '@/components';
import {useStyledTag, useTheme} from '@/hooks';

type Props = {
  onPress: () => void;
  name: string;
  isFocused: boolean;
  routesLength?: number;
  currentIndex?: number;
};

export const BottomTabItem: FC<Props> = props => {
  const {onPress, name, isFocused} = props;
  const {colors} = useTheme();

  const BottomTab = useStyledTag(Pressable, 'flex center middle');

  return (
    <BottomTab onPress={onPress} flex center middle bg-primary>
      <>
        {Screens.map(
          (item: IScreen<BottomTabStackNavigationProps>) =>
            item.name === name && (
              <Block key={item.name} flex center middle>
                <AppIcon name={item?.icon || ''} color={isFocused ? colors.tabItemFocused : colors.tabItem} size={bottomTabConfig?.iconSize} />
              </Block>
            ),
        )}
      </>
    </BottomTab>
  );
};
