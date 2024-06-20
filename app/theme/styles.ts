import {StyleSheet} from 'react-native';

import {fontPixel, IStyles, IStyleShortcuts, ITextStyles, rgba} from '@/utils';

import {COLORS, FONTS, SCREEN, SIZES, themeColors} from './Config';

export const generalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  overflow: {overflow: 'hidden'},
  noMargin: {margin: 0},
  noPadding: {padding: 0},
  noSpacing: {padding: 0, margin: 0},
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  },
  fullMinHeight: {
    minHeight: '100%',
  },
  relative: {position: 'relative'},
  absolute: {position: 'absolute'},
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9991,
  },
});

export const getPredefinedStyles = (t: 'light' | 'dark') => {
  const colors = themeColors[t || 'light'];

  const predefinedStyles: IStyleShortcuts = {
    'bg-primary': {
      backgroundColor: colors.backgroundPrimary,
    },
    'bg-secondary': {
      backgroundColor: colors.secondary,
    },
    'bg-card': {
      backgroundColor: colors.cardBg,
    },
    'bg-white': {
      backgroundColor: colors.white,
    },
    'bg-error': {
      backgroundColor: colors.error,
    },
    'bg-warning': {
      backgroundColor: colors.warning,
    },
    'bg-success': {
      backgroundColor: colors.success,
    },
    px: {
      paddingHorizontal: SCREEN.offset,
    },
    block: {
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    center: {
      alignItems: 'center',
    },
    middle: {
      justifyContent: 'center',
    },
    left: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    right: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    top: {
      justifyContent: 'flex-start',
    },
    bottom: {
      justifyContent: 'flex-end',
    },
    wrap: {flexWrap: 'wrap'},
    border: {
      borderWidth: 1,
      borderColor: 'gray',
    },
    borderBottom: {
      borderBottomWidth: 0.3,
      borderBottomColor: rgba(colors.defaultTextColor, 0.35),
    },
    overflow: {
      overflow: 'hidden',
    },
    'justify-between': {
      justifyContent: 'space-between',
    },
    'justify-end': {
      justifyContent: 'flex-end',
    },
    'align-between': {
      alignItems: 'stretch',
    },
    'align-end': {
      alignItems: 'flex-end',
    },
    'mt-auto': {
      marginTop: 'auto',
    },
    'mb-auto': {
      marginBottom: 'auto',
    },
    'mr-auto': {
      marginRight: 'auto',
    },
    'ml-auto': {
      marginLeft: 'auto',
    },
    'm-auto': {
      margin: 'auto',
    },
  };
  return predefinedStyles;
};

export const getStyles = (t: 'light' | 'dark') => {
  const styles: IStyles = {
    shortcutStyles: {},
    predefinedStyles: getPredefinedStyles(t),
  };
  return styles;
};

export const getTextStyles = (t: 'light' | 'dark') => {
  const colors: typeof COLORS = themeColors[t || 'light'];
  const styles: ITextStyles = {
    fullWidth: {
      width: '100%',
    },
    xs: {
      fontSize: fontPixel(SIZES.extraSmall),
      letterSpacing: 0.15,
    },
    sm: {
      fontSize: fontPixel(SIZES.small),
      letterSpacing: 0,
    },
    md: {
      fontSize: fontPixel(SIZES.medium),
      letterSpacing: 0.15,
    },
    header: {
      fontSize: fontPixel(SIZES.header),
      fontFamily: 'Poppins-Bold',
      letterSpacing: 0.15,
    },
    subheader: {
      fontSize: fontPixel(SIZES.subheader),
      fontFamily: 'Poppins-Regular',
      letterSpacing: 0.15,
    },
    title: {
      fontSize: fontPixel(SIZES.title),
      fontFamily: 'Poppins-Regular',
      letterSpacing: 0.15,
    },
    subtitle: {
      fontSize: fontPixel(SIZES.subtitle),
      fontFamily: 'Poppins-Regular',
    },
    caption: {
      fontSize: fontPixel(SIZES.caption),
      fontFamily: 'Poppins-Regular',
      letterSpacing: 0.4,
    },
    small: {
      fontSize: fontPixel(SIZES.small),
      fontFamily: 'Poppins-Regular',
      letterSpacing: 1.5,
    },
    input: {
      fontFamily: 'Poppins-Regular',
    },
    placeholder: {
      fontFamily: 'Poppins-Regular',
    },
    button: {
      fontFamily: 'Poppins-Regular',
    },
    default: {
      color: colors.defaultTextColor,
    },
    primary: {
      color: colors.primary,
    },
    black: {
      color: colors.black,
    },
    secondary: {
      color: colors.secondary,
    },
    success: {
      color: colors.successText,
    },
    white: {
      color: colors.white,
    },
    error: {
      color: colors.error,
    },
    light: {
      fontFamily: FONTS.light,
    },
    medium: {
      fontFamily: FONTS.medium,
    },
    bold: {
      fontFamily: FONTS.bold,
    },
    italic: {
      fontFamily: FONTS.italic,
    },
  };
  return styles;
};
