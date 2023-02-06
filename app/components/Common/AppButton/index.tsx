import React, {FC, memo} from 'react';
import {ActivityIndicator} from 'react-native';

import Block from '../Block';
import Text from '../Text';
import {Props} from './app-button';

import useTheme from '../../../hooks/useTheme';
import {getStyleShortcuts} from '../../../utils/style-shortcuts';
import styles from './style';
import {COLORS} from '@/theme';

const AppButton: FC<Props | any> = props => {
  const {
    onPress,
    disabled,
    type,
    title,
    titleColor = COLORS.white,
    icon,
    width = '100%',
    loading,
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
      style={[styles.container, buttonTypes[type], disabled && styles.disabled, {...getStyleShortcuts(props)}]}
      disabled={disabled}
      onPress={onPress}
      width={width}
      {...props}>
      {loading && (
        <Block row middle center>
          <Block>
            <ActivityIndicator style={styles.activityIndicator} color={titleColor} />
          </Block>
          <Block>
            <Text medium style={[buttonTypes[type]?.text, styles.text]} styles={{color: titleColor}}>
              {loadingTitle}
            </Text>
          </Block>
        </Block>
      )}

      {!loading && (
        <>
          <Text medium style={[buttonTypes[type]?.text, styles.text]} styles={{color: titleColor}}>
            {title}
          </Text>

          {type === 'icon' && icon}
        </>
      )}
    </Block>
  );
};

export default memo(AppButton);
