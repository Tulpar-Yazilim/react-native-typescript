import React, {memo} from 'react';
import {Pressable} from 'react-native';

import {useTranslation} from 'react-i18next';

import {AppButton, AppIcon, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {heightPixel} from '@/utils';

import {AppSelectorProps, ItemProp} from './app-selector';
import AppBottomSheet from '../AppBottomSheet';
import AppFlatList from '../AppFlatList';

const AppSelector = ({headerTitle = '', isVisible = false, onClose, onSelect, itemsList, selectedItem, containerStyle}: AppSelectorProps) => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const renderItem = ({item}: {item: ItemProp}) => (
    <Pressable
      onPress={() => {
        onSelect?.(item);
        onClose?.();
      }}>
      <Block flex row middle pt-15 pb-15 px-30 borderBottom>
        {item?.isIcon && item?.iconName && (
          <Block left pr-15>
            <AppIcon name={item.iconName} size={22} color={item.iconColor ?? colors.primary} />
            {item.icon}
          </Block>
        )}
        <Block flex>
          <Text
            style={{
              color: item?.value === selectedItem?.value ? colors.primary : colors.defaultTextColor,
              fontSize: item?.value === selectedItem?.value ? heightPixel(16) : heightPixel(15),
              fontWeight: item?.value === selectedItem?.value ? 'bold' : 'normal',
            }}>
            {item?.title}
          </Text>
        </Block>
        {selectedItem && selectedItem?.value === item?.value && (
          <Block right pl-20>
            <AppIcon name={'checkCircle'} size={20} />
          </Block>
        )}
      </Block>
    </Pressable>
  );

  return (
    <AppBottomSheet isFlatList isVisible={isVisible} onClose={onClose}>
      <Block style={containerStyle}>
        {headerTitle?.length > 0 && (
          <Block py-10 middle center>
            <Text fs-18 black medium>
              {headerTitle}
            </Text>
          </Block>
        )}
        <Block>
          <AppFlatList<ItemProp> data={itemsList} renderItem={renderItem} />
        </Block>

        {!!selectedItem?.value && (
          <Block px-20 pt-20>
            <AppButton
              type="primary"
              title={t('clear').toString()}
              onPress={() => {
                onSelect?.({title: '', value: ''});
                onClose?.();
              }}
            />
          </Block>
        )}
      </Block>
    </AppBottomSheet>
  );
};

export default memo(AppSelector);
