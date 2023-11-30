import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';

import {useStyledTag, useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, UseThemeType} from '@/utils';

import {ButtonProps, EnumButtonType} from './app-button';
import styles from './style';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

const AppButton = (props: ButtonProps) => {
  const {disabled, type, title, titleColor = COLORS.white, icon, iconColor, iconSize = 22, width = '100%', height = 56, loading, loadingTitle = 'please_wait', style} = props;

  const theme = useTheme(props as UseThemeType);

  const PrimaryButton = useStyledTag(Block, 'bg-primary center middle rounded-4');
  const SecondaryButton = useStyledTag(Block, 'bg-secondary center middle rounded-4');
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
          <React.Fragment>
            {title && <Text style={[styles.text, {color: titleColor}]}>{title}</Text>}
            {type === 'icon' && <AppIcon name={icon as keyof typeof ICONS} color={iconColor ?? theme.colors.defaultTextColor} size={iconSize} />}
          </React.Fragment>
        )}
      </React.Fragment>
    </Element>
  );
};

export default memo(AppButton);
