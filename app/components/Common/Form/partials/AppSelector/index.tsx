/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {AppBottomSheet, AppFlatList, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {get} from 'lodash';
import React, {FC, memo, useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppInput from '../../../AppInput';

interface AppSelectorProps {
  placeholder?: string;
  options: Array<any>;
  valueProp: string;
  displayProp: string;
  form: any;
  name?: string;
  label: string;
}

const AppSelector: FC<AppSelectorProps | any> = props => {
  const {options, valueProp, displayProp, label, name, form} = props;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({}) as any;
  const theme = useTheme();

  useEffect(() => {
    if (options.length > 0 && form) {
      const formValue = form.getValues()?.[name];
      if (formValue) {
        setCurrent({
          [displayProp]: options.find(
            (item: any) => formValue == get(item, valueProp),
          )?.[displayProp],
          [valueProp]: options.find(
            (item: any) => formValue == get(item, valueProp),
          )?.[valueProp],
        });
      }
    }
  }, [form, options]);

  return (
    <Block>
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
              value={get(current, displayProp)}
              onClear={() => {
                onChange('');
                setCurrent({});
              }}
              error={error?.message}
            />

            <AppBottomSheet
              isFlatList
              isVisible={open}
              onClose={() => setOpen(false)}>
              <Block>
                {current && (
                  <AppFlatList
                    preloader={false}
                    data={options}
                    renderItem={({item, index}: any) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          setCurrent(item);
                          setOpen(false);
                          onChange(get(item, valueProp));
                        }}>
                        <Block pt-16 pb-16 mr-20 ml-20 style={styles.listItem}>
                          <Text
                            styles={{
                              color:
                                get(item, valueProp) == get(current, valueProp)
                                  ? theme.colors.defaultTextColor
                                  : theme.colors.tabItemFocused,
                              fontSize:
                                get(item, valueProp) == get(current, valueProp)
                                  ? 18
                                  : 15,
                              fontWeight:
                                get(item, valueProp) == get(current, valueProp)
                                  ? 'bold'
                                  : 'normal',
                            }}>
                            {get(item, displayProp)}
                          </Text>
                        </Block>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </Block>
            </AppBottomSheet>
          </>
        )}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.secondary,
  },
});

export default memo(AppSelector);
