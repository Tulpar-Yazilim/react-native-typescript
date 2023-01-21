/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {AppCheckbox, Block, Text} from '@/components';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

const RenderItem = ({
  item,
  displayProp,
  form,
  name,
  valueProp,
  theme,
  onChange,
  selections,
}: any) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(selections.includes(get(item, valueProp)));
  }, [selections]);

  return (
    <Pressable
      onPress={() => {
        setChecked(!checked);
        onChange(get(item, valueProp), !checked);
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
          <AppCheckbox checked={checked} mr-13 />
          <Text
            styles={{
              color: theme.colors.defaultTextColor,
            }}>
            {get(item, displayProp)}
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
  },
});
