import React, {memo} from 'react';
import {Animated, StyleSheet, Text, Dimensions} from 'react-native';

import {getMargins, getPaddings} from '@utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {SIZES, COLORS, FONTS, WEIGHTS} from './Config';
import {useTranslate} from '@hooks';

/**
 * Usage:
 * fontSize predefined by theme.js
 * - <Text h1>fontSize of 34 from FONTS.h1</Text>
 * - <Text h2>fontSize of 24 from FONTS.h2</Text>
 * - <Text h3>fontSize of 20 from FONTS.h3</Text>
 * - <Text title>fontSize of 18 from FONTS.title</Text>
 * - <Text subtitle>fontSize of 14 from FONTS.subtitle</Text>
 * - <Text caption>fontSize of 12 from FONTS.caption</Text>
 * - <Text small>fontSize of 10 from FONTS.small</Text>
 * fontSize defined by user
 * - <Text size={20}>fontSize of 20</Text>
 *
 * margin & padding
 * - <Text margin={4}>set margin 4 to: top, right, bottom & left</Text>
 * - <Text padding={6}>set margin 6 to: top, right, bottom & left</Text>
 * - margin + Top | Bottom | Left | Right | Vertical | Horizontal
 * - padding + Top | Bottom | Left | Right | Vertical | Horizontal
 *
 * text styling
 * - <Text transform>textTransform: capitalize, lowercase, uppercase</Text>
 * - <Text regular>fontWeight from WEIGHTS.regular</Text>
 * - <Text bold>fontWeight from WEIGHTS.bold</Text>
 * - <Text semibold>fontWeight from WEIGHTS.semibold</Text>
 * - <Text medium>fontWeight from WEIGHTS.medium</Text>
 * - <Text light>fontWeight from WEIGHTS.light</Text>
 * - <Text weight="700">fontWeight from user input</Text>
 *
 * text colors
 * - <Text primary>color from COLORS.primary</Text>
 * - <Text secondary>color from COLORS.secondary</Text>
 * - <Text tertiary>color from COLORS.tertiary</Text>
 * - <Text black>color from COLORS.black</Text>
 * - <Text white>color from COLORS.white</Text>
 * - <Text gray>color from COLORS.gray</Text>
 * - <Text info>color from COLORS.info</Text>
 * - <Text success>color from COLORS.success</Text>
 * - <Text warning>color from COLORS.warning</Text>
 * - <Text error>color from COLORS.error</Text>
 * - <Text color="#DDD">color from user input</Text>
 *
 * custom theme using the src/theme.js data structure
 * - create a custom theme by defining: const customTheme.js
 * - with the following structure to rewrite any value
 * {
 *   COLORS: {
 *     primary: "cyan" or "#8A00D4",
 *     secondary: "fucsia" or "#D527B7",
 *     tertiary: "yellow" or "#FFC46B"
 *   },
 *   SIZES: {
 *     font: 15,
 *     h1: 28
 *     title: 17
 *   }
 * }
 * - include the custom theme to the component props
 * <Text primary theme={customTheme}>primary using new color: #8A00D4</Text>
 *
 * animating text can be used using the "animated" props
 * - <Text animated>will render Animated.Text</Text>
 */

const Typography = (props: any) => {
  const {
    // fonts & sizes
    h1,
    h2,
    h3,
    title,
    subtitle,
    caption,
    small,
    size,
    // styling
    transform,
    regular,
    bold,
    semibold,
    medium,
    weight,
    light,
    center,
    right,
    blackFont,
    italic,
    spacing, // letter-spacing
    height, // line-height
    // colors
    color,
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
    animated,
    style,
    children,
    params = {},
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

    // text style
    underline,
    through,
    ...rest
  } = props;

  // Translations
  const _translate = useTranslate(children, params);
  const i18nText = _translate ? _translate : children;

  // Content
  const content = i18nText || '';

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

  const textStyles = StyleSheet.flatten([
    {
      fontSize: RFValue(SIZES.font, Dimensions.get('window').height),
      color: COLORS,
    },
    h1 && FONTS.h1,
    h2 && FONTS.h2,
    h3 && FONTS.h3,
    title && FONTS.title,
    subtitle && FONTS.subtitle,
    caption && FONTS.caption,
    small && FONTS.small,
    size && {fontSize: RFValue(size, Dimensions.get('window').height)},
    marginSpacing,
    paddingSpacing,
    transform && {textTransform: transform},
    height && {lineHeight: height},
    spacing && {letterSpacing: spacing},
    weight && {fontWeight: weight},
    regular && {fontWeight: WEIGHTS.regular},
    underline && {textDecorationLine: 'underline'},
    through && {textDecorationLine: 'line-through'},

    bold,
    medium,
    semibold,

    light,
    blackFont,
    italic,

    center && styles.center,
    right && styles.right,
    // color shortcuts
    primary && {color: COLORS.primary},
    secondary && {color: COLORS.secondary},
    tertiary && {color: COLORS.tertiary},
    black && {color: COLORS.black},
    white && {color: COLORS.white},
    gray && {color: COLORS.gray},
    error && {color: COLORS.error},
    warning && {color: COLORS.warning},
    success && {color: COLORS.success},
    info && {color: COLORS.info},
    color && {color},
    style, // rewrite predefined styles
  ]);

  if (animated) {
    return (
      <Animated.Text {...rest} style={textStyles}>
        {content}
      </Animated.Text>
    );
  }

  return (
    <Text {...rest} style={textStyles}>
      {content || content !== '' ? content : ''}
    </Text>
  );
};

Typography.defaultProps = {
  // fonts & sizes
  h1: false,
  h2: false,
  h3: false,
  title: false,
  subtitle: false,
  caption: false,
  small: false,
  size: null,
  margin: null,
  padding: null,
  // styling
  transform: null,
  regular: false,
  bold: false,
  semibold: false,
  medium: false,
  weight: false,
  light: false,
  center: false,
  right: false,
  spacing: null, // letter-spacing
  height: null, // line-height
  // colors
  color: null,
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

export default memo(Typography);

const styles = StyleSheet.create({
  // positioning
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},
});
