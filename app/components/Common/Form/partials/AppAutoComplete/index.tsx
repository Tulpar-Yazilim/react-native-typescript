/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {AppButton, AppFlatList, AppIcon, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {ICONS} from '@/utils';
import {debounce, get} from 'lodash';
import React, {FC, useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {Modal, Pressable, SafeAreaView, StyleSheet} from 'react-native';
import AppInput from '../../../AppInput';

interface AppAutoCompleteProps {
  placeholder?: string;
  options: Array<any>;
  valueProp: string;
  displayProp: string;
  form: any;
  name?: string;
  label: string;
}

const AppAutoComplete: FC<AppAutoCompleteProps | any> = props => {
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
    if (open && get(current, valueProp)) {
      setFilteredOptions([
        current,
        ...filteredOptions.filter(
          (r: any) => get(r, valueProp) !== get(current, valueProp),
        ),
      ]);
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
            <Block style={{flex: 1}}>
              <SafeAreaView
                style={{flex: 1, backgroundColor: theme.colors.screenBgColor}}>
                <Block py-20 style={{flex: 1}}>
                  <Block row center px-12 w-full>
                    <Block style={{flex: 1}}>
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
                    <Block style={{flex: 6}}>
                      <AppInput
                        style={{}}
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
                    renderItem={({item, index}: any) => (
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
                            {get(item, valueProp) ==
                              get(current, valueProp) && (
                              <Text
                                mr-10
                                styles={{
                                  fontSize: 9,
                                  color: theme.colors.defaultTextColor,
                                }}>
                                {'\u2B24'}
                              </Text>
                            )}
                            <Text
                              styles={{
                                color:
                                  get(item, valueProp) ==
                                  get(current, valueProp)
                                    ? theme.colors.defaultTextColor
                                    : theme.colors.defaultTextColor,
                                fontSize:
                                  get(item, valueProp) ==
                                  get(current, valueProp)
                                    ? 18
                                    : 15,
                                fontWeight:
                                  get(item, valueProp) ==
                                  get(current, valueProp)
                                    ? 'bold'
                                    : 'normal',
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
};
const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
  },
});

export default AppAutoComplete;
