/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState} from 'react';
import {Block, Text, AppFlatList, AppIcon, AppButton} from '@components';
import AppInput from '../../../AppInput';
import {FC, useEffect} from 'react';
import {Modal, SafeAreaView, Keyboard, ScrollView} from 'react-native';
import {debounce, get, groupBy} from 'lodash';
import {Controller} from 'react-hook-form';
import {ICONS} from '@utils';
import {useTheme} from '@hooks';
import RenderItem from './RenderItem';
import {forwardRef} from 'react';
import {useImperativeHandle} from 'react';
import {memo} from 'react';

interface AppMultipleSelectProps {
  placeholder?: string;
  options: Array<any>;
  valueProp: string;
  displayProp: string;
  form: any;
  name?: string;
  label: string;
}

const BadgeArea = memo(
  forwardRef(({onDelete}: any, ref) => {
    const [badges, setBadges] = useState([]);

    useImperativeHandle(ref, () => ({
      handleBadges(data: any) {
        setBadges(data);
      },
    }));

    return (
      <ScrollView horizontal style={{height: 70}}>
        <Block row pxw py-10 pressable>
          {badges?.map(item => (
            <Text mr-5>
              <Block
                pressable
                onPress={() => {
                  onDelete();
                  setBadges(badges.filter((r: any) => r !== item));
                }}
                py-4
                px-8
                bg-primary
                rounded-7
              >
                <Text>{item}</Text>
              </Block>
            </Text>
          ))}
        </Block>
      </ScrollView>
    );
  }),
);

let selections: any = [];

const AppMultipleSelect: FC<AppMultipleSelectProps | any> = props => {
  const {options, valueProp, displayProp, label, name, form} = props;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null) as any;
  const [filteredOptions, setFilteredOptions] = useState(options);

  const badges = useRef<any>();

  const theme = useTheme();

  const onFilter = debounce(text => {
    setFilteredOptions(
      options.filter((item: any) =>
        get(item, displayProp).toLowerCase().includes(text.toLowerCase()),
      ),
    );
    if (!text) {
      console.log(selections);
      badges.current.handleBadges(selections);
    }
  }, 300);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (open) {
      const value = form.getValues()?.[name];
      selections = value;
      badges.current.handleBadges(value);
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
            }}
          >
            <Block
              pressable
              flex
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <SafeAreaView
                style={{flex: 1, backgroundColor: theme.colors.screenBgColor}}
              >
                <Block flex py-20>
                  <Block row center px-12>
                    <Block pr-20>
                      <AppButton
                        left
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
                    <Block w-full flex>
                      <AppInput
                        style={{}}
                        placeholder="Search"
                        onChange={(text: string) => {
                          onFilter(text);
                        }}
                      />
                    </Block>
                  </Block>
                  <BadgeArea
                    ref={badges}
                    onDelete={(item: any) => {
                      selections = selections.filter(
                        (curr: any) => curr !== item,
                      );
                      onChange(selections);
                    }}
                  />
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
                        onChange={(item: any, checked: any) => {
                          if (checked) {
                            selections = [...selections, item];
                            badges.current.handleBadges(selections);
                          } else {
                            selections = selections.filter(
                              (curr: any) => curr !== item,
                            );
                            badges.current.handleBadges(selections);
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
