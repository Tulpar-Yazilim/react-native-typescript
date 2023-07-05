import React, {FC, useEffect, useState} from 'react';
import {Keyboard, Modal} from 'react-native';

import {debounce, get} from 'lodash';
import {Controller, UseFormReturn} from 'react-hook-form';

import RenderItem from './RenderItem';
import AppInput from '../../../AppInput';
import {SelectOptionItemType, SelectOptions} from '../../types';

import {AppButton, AppFlatList, Block, Text} from '@/components';

interface AppMultipleSelectProps {
  placeholder?: string;
  options?: SelectOptions;
  valueProp?: string;
  displayProp?: string;
  form?: UseFormReturn;
  name?: string;
  label?: string;
}

let selections: Array<object> = [];

const AppMultipleSelect: FC<AppMultipleSelectProps | never> = props => {
  const {options = [], valueProp, displayProp, label, name = '', form} = props;
  const [open, setOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputSelections, setInputSelections] = useState<Array<string>>([]);

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
            value={inputSelections?.join(', ')}
            onClear={() => {
              setInputSelections([]);
              selections = [];
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
              flex
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <Block flex pt-30>
                <AppFlatList
                  data={filteredOptions as never[]}
                  sticky
                  ListHeaderComponent={
                    <Block flex row px-12 bg-white>
                      <Block flex-1 middle center>
                        <AppButton
                          type="icon"
                          onPress={() => {
                            setOpen(false);
                          }}
                          icon="chevronLeft"
                        />
                      </Block>
                      <Block flex-9>
                        <AppInput
                          placeholder="Search"
                          onChangeText={(text: string) => {
                            onFilter(text);
                          }}
                        />
                      </Block>
                    </Block>
                  }
                  renderItem={({item}: {item: SelectOptionItemType}) => (
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
              </Block>
            </Block>
            <Block>
              <AppButton
                type="secondary"
                title="ok"
                onPress={() => {
                  onChange(selections);
                  setInputSelections(selections as unknown as string[]);
                  setOpen(false);
                }}
              />
            </Block>
          </Modal>
        </>
      )}
    />
  );
};

export default AppMultipleSelect;
