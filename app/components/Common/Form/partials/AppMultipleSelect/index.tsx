/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {AppButton, AppFlatList, AppIcon, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {ICONS} from '@/utils';
import {debounce, get} from 'lodash';
import React, {FC, useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {Keyboard, Modal, SafeAreaView} from 'react-native';
import AppInput from '../../../AppInput';
import RenderItem from './RenderItem';

interface AppMultipleSelectProps {
  placeholder?: string;
  options: Array<any>;
  valueProp: string;
  displayProp: string;
  form: any;
  name?: string;
  label: string;
}

let selections: any = [];

const AppMultipleSelect: FC<AppMultipleSelectProps | any> = props => {
  const {options, valueProp, displayProp, label, name, form} = props;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null) as any;
  const [filteredOptions, setFilteredOptions] = useState(options);

  const theme = useTheme();

  const onFilter = debounce(text => {
    setFilteredOptions(
      options.filter((item: any) =>
        get(item, displayProp).toLowerCase().includes(text.toLowerCase()),
      ),
    );
  }, 300);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (open) {
      const value = form.getValues()?.[name];
      selections = value;
    }
  }, [open]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({field: {onChange}, fieldState: {error}}) => (
        <>
          <AppInput
            onPress={() => {
              setOpen(true);
            }}
            editable={false}
            animatedPlaceholder={label}
            disabled
            value={current && get(current, displayProp)}
            onClear={() => {
              setCurrent(null);
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
              <SafeAreaView
                style={{flex: 1, backgroundColor: theme.colors.screenBgColor}}>
                <Block style={{flex: 1}} py-20>
                  <Block row center px-12 pb-20>
                    <Block pr-20>
                      <AppButton
                        type="icon"
                        onPress={() => {
                          setOpen(false);
                        }}
                        icon={
                          <AppIcon
                            name={ICONS.arrowLeft}
                            color={theme.colors.defaultTextColor}
                          />
                        }
                      />
                    </Block>
                    <Block w-full style={{flex: 1}}>
                      <AppInput
                        placeholder="Search"
                        onChange={(text: string) => {
                          onFilter(text);
                        }}
                      />
                    </Block>
                  </Block>
                  <AppFlatList
                    preloader={false}
                    data={filteredOptions}
                    renderItem={({item}: any) => (
                      <RenderItem
                        name={name}
                        form={form}
                        item={item}
                        theme={theme}
                        displayProp={displayProp}
                        valueProp={valueProp}
                        selections={selections}
                        onChange={(renderItem: any, checked: any) => {
                          if (checked) {
                            selections = [...selections, renderItem];
                          } else {
                            selections = selections.filter(
                              (curr: any) => curr !== renderItem,
                            );
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
