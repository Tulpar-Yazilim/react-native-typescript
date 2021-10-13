import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {Config} from '@theme';

import {getMargins, getPaddings, mergeTheme} from '@utils';

export const ButtonInstance = ({
  Touchable = TouchableOpacity,
  children = null,
  ...props
}) => <Touchable {...props}>{children}</Touchable>;

const Button = (props: any) => {
  const {
    disabled,
    opacity,
    outlined,
    flex,
    height,
    width,
    borderWidth,
    // colors
    color,
    transparent,
    primary,
    secondary,
    tertiary,
    black,
    white,
    gray,
    error,
    warning,
    success,
    info,
    borderColor,
    // support for touchables
    highlight,
    nativeFeedback,
    withoutFeedback,
    theme,
    style,
    children,
    // sizing props
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    noRadius,
    ...rest
  } = props;

  const {SIZES, COLORS} = mergeTheme({...Config}, theme);

  const marginSpacing = getMargins({
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    defaultValue: SIZES.base,
  });
  const paddingSpacing = getPaddings({
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    defaultValue: SIZES.base,
  });

  const buttonStyles = StyleSheet.flatten([
    {
      minHeight: SIZES.base * 5.5,
      borderRadius: noRadius ? 0 : SIZES.radiusBtn,
      backgroundColor: color || COLORS.primary,
      justifyContent: 'center',
    },
    transparent && {backgroundColor: 'transparent'},
    primary && {backgroundColor: COLORS.primary},
    secondary && {backgroundColor: COLORS.secondary},
    tertiary && {backgroundColor: COLORS.tertiary},
    black && {backgroundColor: COLORS.black},
    white && {backgroundColor: COLORS.white},
    gray && {backgroundColor: COLORS.gray},
    error && {backgroundColor: COLORS.error},
    warning && {backgroundColor: COLORS.warning},
    success && {backgroundColor: COLORS.success},
    info && {backgroundColor: COLORS.info},
    color && {backgroundColor: color}, // custom backgroundColor
    flex && {flex: flex === true ? 1 : flex}, // flex width
    height && {height}, // custom height
    width && {width}, // custom width
    borderWidth && {borderWidth},
    borderColor && {borderColor},
    marginSpacing,
    paddingSpacing,
    style,
  ]);

  if (disabled) {
    buttonStyles.backgroundColor = COLORS.gray;
  }

  if (outlined) {
    buttonStyles.borderWidth = 1;
    buttonStyles.borderColor = borderColor;
    buttonStyles.backgroundColor = 'transparent';
  }

  const Touchable = highlight
    ? TouchableHighlight
    : nativeFeedback
    ? TouchableNativeFeedback
    : withoutFeedback
    ? TouchableWithoutFeedback
    : TouchableOpacity;

  return (
    <ButtonInstance
      disabled={disabled}
      Touchable={Touchable}
      style={buttonStyles}
      activeOpacity={opacity}
      children={children}
      {...rest}
    />
  );
};

Button.defaultProps = {
  color: null,
  disabled: false,
  opacity: 0.8,
  outlined: false,
  margin: null,
  padding: null,
  flex: 0,
  transparent: false,
  primary: false,
  secondary: false,
  tertiary: false,
  black: false,
  white: false,
  gray: false,
  error: false,
  warning: false,
  success: false,
  info: false,
  theme: {},
  style: {},
};

export default Button;
