import {AppIcon, Block} from '@/components';
import {useStyledTag, useTheme} from '@/hooks';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {BottomTabItemList} from './BottomTabItems';
import {IScreen} from '../stacks/Models/IScreen';
import {bottomTabConfig} from './BottomTabContainer';

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

    const BattamTab = useStyledTag(Pressable, 'flex center middle');

    return (
        <BattamTab onPress={onPress} flex center middle bg-primary>
            <>
                {BottomTabItemList.map(
                    (item: IScreen) =>
                        item.name === name && (
                            <Block key={item.name} flex center middle>
                                <AppIcon name={item?.icon || ''} color={isFocused ? colors.tabItemFocused : colors.tabItem} size={bottomTabConfig?.iconSize} />
                            </Block>
                        ),
                )}
            </>
        </BattamTab>
    );
};
