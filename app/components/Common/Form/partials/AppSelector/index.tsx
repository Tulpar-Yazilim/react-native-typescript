import React, {FC, memo, useEffect, useState} from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';

import {get} from 'lodash';
import {Controller, UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import AppInput from '../../../AppInput';
import {SelectOptionItemType, SelectOptions} from '../../types';

import {AppBottomSheet, AppButton, AppFlatList, AppIcon, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {ICONS} from '@/utils';

interface AppSelectorProps {
  headerTitle?: string;
  placeholder?: string;
  options?: SelectOptions;
  valueProp?: string;
  displayProp?: string;
  form: UseFormReturn;
  name?: string;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const initialValue = {value: '', label: ''} as SelectOptionItemType;

const AppSelector: FC<AppSelectorProps> = props => {
  const {t} = useTranslation();

  const {options = [], valueProp = 'value', displayProp = 'label', label, name, form, headerTitle, containerStyle} = props;
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState(initialValue);
  const {colors} = useTheme();

  useEffect(() => {
    if (options.length > 0 && form) {
      const formValue = form.getValues()?.[name ?? ''];
      if (formValue) {
        const _value = options.find(item => formValue === get(item, valueProp));
        const _current = {
          [displayProp as never]: _value?.[displayProp as never],
          [valueProp as never]: _value?.[valueProp as never],
        } as never;
        setCurrent(_current);
      }
    }
  }, [displayProp, form, name, options, valueProp]);

  return (
    <Block>
      <Controller
        name={name ?? ''}
        control={form.control}
        render={({field: {onChange}, fieldState: {error}}) => (
          <>
            <AppInput
              onPress={() => {
                setOpen(true);
              }}
              onChangeText={() => {}}
              editable={false}
              animatedPlaceholder={label}
              disabled
              value={get(current, displayProp)}
              onClear={() => {
                onChange('');
                setCurrent(initialValue);
              }}
              error={error?.message}
            />

            <AppBottomSheet isFlatList isVisible={open} onClose={() => setOpen(false)}>
              <Block style={containerStyle}>
                {headerTitle && headerTitle?.length > 0 && (
                  <Block py-10 middle center>
                    <Text fs-18 black medium>
                      {headerTitle}
                    </Text>
                  </Block>
                )}
                <Block>
                  {current && (
                    <AppFlatList
                      preloader={false}
                      data={options as never[]}
                      renderItem={({item}: {item: SelectOptionItemType}) => (
                        <Pressable
                          onPress={() => {
                            setCurrent(item);
                            setOpen?.(false);
                            onChange?.(get(item, valueProp));
                          }}>
                          <Block flex row middle pt-15 pb-15 px-30 borderBottom>
                            {item?.isIcon && (
                              <Block left pr-15>
                                <AppIcon name={item.iconName as keyof typeof ICONS} size={22} color={item.iconColor ? item.iconColor : colors.primary} />
                                {item.icon}
                              </Block>
                            )}
                            <Block flex>
                              <Text
                                style={{
                                  color: get(item, valueProp) === get(current, valueProp) ? colors.primary : colors.defaultTextColor,
                                  fontSize: get(item, valueProp) === get(current, valueProp) ? 16 : 15,
                                  fontWeight: get(item, valueProp) === get(current, valueProp) ? 'bold' : 'normal',
                                }}>
                                {get(item, displayProp)}
                              </Text>
                            </Block>
                            {get(item, valueProp) === get(current, valueProp) && (
                              <Block right pl-20>
                                <AppIcon name="checkCircle" size={20} />
                              </Block>
                            )}
                          </Block>
                        </Pressable>
                      )}
                      removeClippedSubviews={false}
                    />
                  )}
                </Block>

                {current && !!current?.value && (
                  <Block px-20 pt-20>
                    <AppButton
                      type="primary"
                      title={t('clear').toString()}
                      onPress={() => {
                        onChange('');
                        setCurrent(initialValue);
                        setOpen(false);
                      }}
                    />
                  </Block>
                )}
              </Block>
            </AppBottomSheet>
          </>
        )}
      />
    </Block>
  );
};

export default memo(AppSelector);
