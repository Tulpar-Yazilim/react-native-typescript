import React, {memo} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {SIZES, COLORS} from './Config';

import {getMargins, getPaddings} from '@utils';

const ButtonInstance = ({children = null, ...props}) => (
  <Pressable {...props}>{children}</Pressable>
);

const Button = (props: any) => {
  const {
    disabled,
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
    style,
    children,
    // sizing props
    margin,
    m,
    marginHorizontal,
    mx,
    marginVertical,
    my,
    marginTop,
    mt,
    marginBottom,
    mb,
    marginLeft,
    ml,
    marginRight,
    mr,
    padding,
    p,
    paddingHorizontal,
    px,
    paddingVertical,
    py,
    paddingTop,
    pt,
    paddingBottom,
    pb,
    paddingLeft,
    pl,
    paddingRight,
    pr,

    noRadius,
    ...rest
  } = props;

  const marginSpacing = getMargins({
    margin,
    m,
    marginHorizontal,
    mx,
    marginVertical,
    my,
    marginTop,
    mt,
    marginBottom,
    mb,
    marginLeft,
    ml,
    marginRight,
    mr,
    defaultValue: SIZES.base,
  });
  const paddingSpacing = getPaddings({
    padding,
    p,
    paddingHorizontal,
    px,
    paddingVertical,
    py,
    paddingTop,
    pt,
    paddingBottom,
    pb,
    paddingLeft,
    pl,
    paddingRight,
    pr,
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

  return (
    <ButtonInstance
      disabled={disabled}
      style={buttonStyles}
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

export default memo(Button);
