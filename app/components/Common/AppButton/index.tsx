/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles, {buttonTypesStyles} from './style';
import Text from '../Text';
import {COLORS} from '@theme';
import {getStyleShortcuts} from '../../../utils/style-shortcuts';
import {Props} from './app-button';
import {memo} from 'react';
import useTheme from '../../../hooks/useTheme';
import {Pressable} from 'react-native';
import Block from '../Block';

const AppButton: FC<Props | any> = props => {
  const {onPress, disabled, type, loading, title, icon} = props;

  const theme = useTheme(props);

  const buttonTypes: any = {
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
    },
  };

  return (
    <Block
      pressable
      style={[
        styles.container,
        buttonTypes[type],
        disabled && styles.disabled,
        {...getStyleShortcuts(props)},
      ]}
      disabled={disabled}
      {...props}
      onPress={onPress}
    >
      {loading && (
        <View style={{flexDirection: 'row'}}>
          <ActivityIndicator color={COLORS.white} style={{paddingRight: 12}} />
          <Text white bold style={[buttonTypes[type].text, styles.text]}>
            Please Wait ...
          </Text>
        </View>
      )}

      {!loading && (
        <Text default bold>
          {title}
        </Text>
      )}

      {type === 'icon' && icon}
    </Block>
  );
};

export default memo(AppButton);
