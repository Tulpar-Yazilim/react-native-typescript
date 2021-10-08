import React, {useEffect, useState} from 'react';
import {Icon, Text, Block} from './index';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {IconTypes} from './Icon';
import colors from '../config/colors';
import {useGuid} from '../hooks';

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
}) => {
  const getUncheckedStyle = {
    borderWidth: 1.5,
    borderColor: colors.unselectedCheckboxBorder,
    ...uncheckedStyle,
  };
  const checkedStyle = {
    backgroundColor: selectedBackgroundColor
      ? selectedBackgroundColor
      : colors.selectedCheckboxBackground,
  };
  const checkIcon = {
    type: IconTypes.materialCommunity,
    name: 'check-bold',
    size: 18,
    color: iconColor ? iconColor : colors.white,
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
        styles.container,
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
          {checked && <Icon {...checkIcon} />}
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
