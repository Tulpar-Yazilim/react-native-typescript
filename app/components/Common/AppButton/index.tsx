import React, {FC, memo} from 'react';
import {ActivityIndicator} from 'react-native';

import {COLORS} from '@theme';

import Text from '../Text';
import Block from '../Block';
import {Props} from './app-button';

import styles from './style';
import {getStyleShortcuts} from '../../../utils/style-shortcuts';
import useTheme from '../../../hooks/useTheme';

const AppButton: FC<Props | any> = props => {
  const {
    onPress,
    disabled,
    type,
    loading,
    title,
    icon,
    loadingTitle = 'please_wait',
  } = props;

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
      onPress={onPress}>
      {loading && (
        <Block row middle center>
          <Block>
            <ActivityIndicator
              color={COLORS.white}
              style={styles.activityIndicator}
            />
          </Block>
          <Block>
            <Text medium white style={[buttonTypes[type].text, styles.text]}>
              {loadingTitle}
            </Text>
          </Block>
        </Block>
      )}

      {!loading && (
        <>
          <Text medium white>
            {title}
          </Text>

          {type === 'icon' && icon}
        </>
      )}
    </Block>
  );
};

export default memo(AppButton);
