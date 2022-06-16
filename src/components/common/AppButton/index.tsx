/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles, {buttonTypesStyles} from './style';
import Text from '../Text';
import {COLORS} from '@theme';
import {getStyleShortcuts} from '../../../utils/StyleShortcut';
import {Props} from './app-button';
import {memo} from 'react';

const AppButton: FC<Props> = props => {
  const {onPress, disabled, type, loading, title, icon} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        buttonTypesStyles[type].container,
        disabled && styles.disabled,
        {...getStyleShortcuts(props)},
      ]}
      disabled={disabled}
      {...props}
      onPress={onPress}>
      {loading && (
        <View style={{flexDirection: 'row'}}>
          <ActivityIndicator color={COLORS.white} style={{paddingRight: 12}} />
          <Text white bold style={[buttonTypesStyles[type].text, styles.text]}>
            Please Wait ...
          </Text>
        </View>
      )}

      {!loading && (
        <Text white bold>
          {title}
        </Text>
      )}

      {type === 'icon' && icon}
    </TouchableOpacity>
  );
};

export default memo(AppButton);
