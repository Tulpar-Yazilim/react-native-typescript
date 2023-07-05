import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {get} from 'lodash';

import {AppCheckbox, Block, Text} from '@/components';

interface RenderItemProps {
  item?: object | string | undefined;
  name?: string;
  options?: Array<object>;
  valueProp?: string;
  displayProp?: string;
  onChange?: (_item: object, checked: boolean) => void;
  selections?: Array<string> | Array<object> | Array<never>;
}

const RenderItem = ({item, displayProp, valueProp, onChange, selections}: RenderItemProps) => {
  const theme = useTheme();

  const [checked, setChecked] = useState(false);

  const onPress = () => {
    setChecked(!checked);
    onChange?.(get(item, valueProp as never), !checked);
  };

  useEffect(() => {
    if (selections && selections?.length > 0) setChecked(selections?.includes?.(get(item, valueProp as never)));
  }, [selections]);

  return (
    <Pressable onPress={onPress}>
      <Block
        pt-16
        pb-16
        mr-20
        ml-20
        style={[
          styles.listItem,
          {
            borderBottomColor: theme.colors.text,
          },
        ]}>
        <Block row center>
          <AppCheckbox onPress={onPress} checked={checked} mr-13 />
          <Text
            style={{
              color: theme.colors.text,
            }}>
            {get(item, displayProp as never)}
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
