import React, {useEffect, useState} from 'react';
import {Modal, Pressable, SafeAreaView, StyleSheet} from 'react-native';

import {debounce, get} from 'lodash';
import {Controller, UseFormReturn} from 'react-hook-form';

import AppInput from '../../../AppInput';
import {SelectOptions} from '../../types';

import {AppButton, AppFlatList, Block, Text} from '@/components';
import {useTheme} from '@/hooks';

interface AppAutoCompleteProps {
  placeholder?: string;
  options?: SelectOptions;
  valueProp?: string;
  displayProp?: string;
  form: UseFormReturn;
  name: string;
  label: string;
}

function AppAutoComplete(props: AppAutoCompleteProps) {
  const {options = [], valueProp = 'value', displayProp = 'label', label, name, form} = props;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<object | never>();
  const [filteredOptions, setFilteredOptions] = useState(options);

  const theme = useTheme();

  const onFilter = debounce(text => {
    setFilteredOptions(options.filter(item => get(item, displayProp).toLowerCase().includes(text.toLowerCase())));
  }, 300);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

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
            onChangeText={() => {}}
            editable={false}
            animatedPlaceholder={label}
            disabled
            value={current && get(current, displayProp)}
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
            <Block style={{flex: 1}}>
              <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.screenBgColor}}>
                <Block py-20 style={{flex: 1}}>
                  <Block row center px-12 w-full>
                    <Block w-40>
                      <AppButton
                        type="icon"
                        onPress={() => {
                          setOpen(false);
                        }}
                        icon="chevronRight"
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
                  <AppFlatList
                    preloader={false}
                    data={filteredOptions as never[]}
                    renderItem={({item}) => (
                      <Pressable
                        onPress={() => {
                          setCurrent(item);
                          setOpen(false);
                          setFilteredOptions(options);
                          onChange(get(item, valueProp));
                        }}>
                        <Block
                          pt-16
                          pb-16
                          mr-20
                          ml-20
                          style={[
                            styles.listItem,
                            {
                              borderBottomColor: theme.colors.defaultTextColor,
                            },
                          ]}>
                          <Block row center>
                            {get(item, valueProp) === get(current, valueProp) && (
                              <Text
                                mr-10
                                style={{
                                  fontSize: 9,
                                  color: theme.colors.defaultTextColor,
                                }}>
                                {'\u2B24'}
                              </Text>
                            )}
                            <Text
                              style={{
                                color: get(item, valueProp) === get(current, valueProp) ? theme.colors.defaultTextColor : theme.colors.defaultTextColor,
                                fontSize: get(item, valueProp) === get(current, valueProp) ? 18 : 15,
                                fontWeight: get(item, valueProp) === get(current, valueProp) ? 'bold' : 'normal',
                              }}>
                              {get(item, displayProp)}
                            </Text>
                          </Block>
                        </Block>
                      </Pressable>
                    )}
                  />
                </Block>
              </SafeAreaView>
            </Block>
          </Modal>
        </>
      )}
    />
  );
}
const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
  },
});

export default AppAutoComplete;
