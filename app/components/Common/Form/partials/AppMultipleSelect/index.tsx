import React, {FC, useEffect, useState} from 'react';
import {Keyboard, Modal, SafeAreaView} from 'react-native';

import {debounce, get} from 'lodash';
import {Controller, UseFormReturn} from 'react-hook-form';

import RenderItem from './RenderItem';
import AppInput from '../../../AppInput';

import {AppButton, AppFlatList, AppIcon, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {ICONS} from '@/utils';

interface AppMultipleSelectProps {
  placeholder?: string;
  options?: Array<object>;
  valueProp?: string;
  displayProp?: string;
  form?: UseFormReturn;
  name?: string;
  label?: string;
}

let selections: Array<object> = [];

const AppMultipleSelect: FC<AppMultipleSelectProps | never> = props => {
  const {options, valueProp, displayProp, label, name = '', form} = props;
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<object>();
  const [filteredOptions, setFilteredOptions] = useState<Array<object>>(options ?? []);

  const theme = useTheme();

  const onFilter = debounce(text => {
    setFilteredOptions((options ?? [])?.filter(item => (get(item, displayProp as never) as string)?.toLowerCase()?.includes(text?.toLowerCase())));
  }, 300);

  useEffect(() => {
    if (options) setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (open) {
      const value = form?.getValues()?.[name as never];
      selections = value;
    }
  }, [form, name, open]);

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange}, fieldState: {error}}) => (
        <>
          <AppInput
            onPress={() => {
              setOpen(true);
            }}
            editable={false}
            animatedPlaceholder={label}
            disabled
            value={current && get(current, displayProp as never)}
            onClear={() => {
              setCurrent(undefined);
              onChange('');
            }}
          />
          <Block px={10}>
            <Text error italic size={12}>
              {error?.message}
            </Text>
          </Block>
          <Modal
            animationType="slide"
            transparent={false}
            visible={open}
            onRequestClose={() => {
              setOpen(!open);
            }}>
            <Block
              style={{flex: 1}}
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.screenBgColor}}>
                <Block style={{flex: 1}} py-20>
                  <Block row px-12 pb-20>
                    <Block w-40 mr-10>
                      <AppButton
                        type="icon"
                        onPress={() => {
                          setOpen(false);
                        }}
                        icon={<AppIcon name={ICONS.chevronLeft} color={theme.colors.defaultTextColor} />}
                      />
                    </Block>
                    <Block flex>
                      <AppInput
                        placeholder="Search"
                        onChangeText={(text: string) => {
                          onFilter(text);
                        }}
                      />
                    </Block>
                  </Block>
                  <AppFlatList<object>
                    preloader={false}
                    data={filteredOptions}
                    renderItem={({item}) => (
                      <RenderItem
                        name={name}
                        item={item}
                        displayProp={displayProp}
                        valueProp={valueProp}
                        selections={selections}
                        onChange={(renderItem, checked) => {
                          if (checked) {
                            selections = [...selections, renderItem];
                          } else {
                            selections = selections.filter(curr => curr !== renderItem);
                          }
                        }}
                      />
                    )}
                  />
                  <Block pxw>
                    <AppButton
                      type="secondary"
                      title="Ok"
                      onPress={() => {
                        onChange(selections);
                        setOpen(false);
                      }}
                    />
                  </Block>
                </Block>
              </SafeAreaView>
            </Block>
          </Modal>
        </>
      )}
    />
  );
};

export default AppMultipleSelect;
