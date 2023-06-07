import React, {memo, ReactNode} from 'react';
import {ActivityIndicator, GestureResponderEvent} from 'react-native';

import {EnumButtonType} from './app-button';
import styles from './style';
import useTheme from '../../../hooks/useTheme';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, UseThemeType} from '@/utils';

interface AppButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  type?: EnumButtonType;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  icon?: keyof typeof ICONS;
  iconColor?: string;
  children?: ReactNode;
  titleColor?: ReactNode;
  width?: number | string;
  height?: number | string;
  loadingTitle?: string;
  style?: ReactNode;
}

const AppButton = (props: AppButtonProps | never) => {
  const {disabled, type, title, titleColor = COLORS.white, icon, iconColor, width = '100%', height = 56, loading, loadingTitle = 'please_wait', style} = props;

  const theme = useTheme(props as UseThemeType);

  const PrimaryButton = useStyledTag(Block, 'bg-primary center middle rounded-4');
  const SecondaryButton = useStyledTag(Block, 'bg-secondary border center middle rounded-4');
  const IconButton = useStyledTag(Block, 'center middle');

  const buttonElements = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    outline: SecondaryButton,
    icon: IconButton,
  };

  const Element = buttonElements[type as EnumButtonType];

  return (
    <Element {...props} pressable style={[styles.container, disabled && styles.disabled, style]} width={width} height={height}>
      <React.Fragment>
        {loading && (
          <Block row middle center>
            <Block>
              <ActivityIndicator color={theme.colors.white} style={styles.activityIndicator} />
            </Block>
            <Block>
              <Text medium md style={[styles.text, {color: titleColor}]}>
                {loadingTitle}
              </Text>
            </Block>
          </Block>
        )}

        {!loading && (
          <>
            {title && (
              <Text buttonTitleLight style={[styles.text, {color: titleColor}]}>
                {title}
              </Text>
            )}
            {type === 'icon' && <AppIcon name={icon as keyof typeof ICONS} color={iconColor ?? theme.colors.defaultTextColor} />}
          </>
        )}
      </React.Fragment>
    </Element>
  );
};

export default memo(AppButton);
