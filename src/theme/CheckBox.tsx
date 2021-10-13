import React, {useEffect, useState} from 'react';
import {Text, Block} from './index';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {AppIcon, IconTypes} from '@components';
import {useGuid} from '@hooks';
import {COLORS} from '@theme';

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
    <TouchableOpacity
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
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  square: {
    width: 24,
    height: 24,
  },
  text: {
    flex: 1,
  },
});
