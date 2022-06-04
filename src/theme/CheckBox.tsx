import React, {memo, useEffect, useState} from 'react';
import Text from './Text';
import Block from './Block';
import {StyleSheet, Pressable} from 'react-native';
import AppIcon, {IconTypes} from '../components/common/AppIcon';
import {useGuid} from '@hooks';
import {COLORS} from './Config';

const CheckBox = ({
  onPress,
  value,
  text,
  boxStyle,
  marginBottom,
  marginTop,
  selectedBackgroundColor,
  uncheckedStyle,
  iconColor,
}: any) => {
  const getUncheckedStyle = {
    borderWidth: 1.5,
    borderColor: COLORS.unselectedCheckboxBorder,
    ...uncheckedStyle,
  };
  const checkedStyle = {
    backgroundColor: selectedBackgroundColor
      ? selectedBackgroundColor
      : COLORS.selectedCheckboxBackground,
  };
  const checkIcon = {
    type: IconTypes.materialCommunity,
    name: 'check-bold',
    size: 18,
    color: iconColor ? iconColor : COLORS.white,
  };

  const [checked, setChecked] = useState(value);

  useEffect(() => {
    value === true ? setChecked(true) : setChecked(false);
  }, [value]);

  return (
    <Pressable
      key={useGuid()}
      onPress={() => onPress(!checked)}
      style={[
        {
          marginBottom: marginBottom ? marginBottom : 0,
          marginTop: marginTop ? marginTop : 0,
        },
      ]}>
      <Block row>
        <Block
          center
          middle
          marginRight
          style={[
            styles.square,
            checked ? checkedStyle : getUncheckedStyle,
            boxStyle,
          ]}
          noflex>
          {checked && <AppIcon {...checkIcon} />}
        </Block>
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </Block>
    </Pressable>
  );
};

export default memo(CheckBox);

const styles = StyleSheet.create({
  square: {
    width: 24,
    height: 24,
  },
  text: {
    flex: 1,
  },
});
