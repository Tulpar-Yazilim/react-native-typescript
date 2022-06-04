import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const platform = Platform.OS;

const COLORS = {
  // default font color
  font: '#000000',

  // base colors
  primary: '#318AC3',
  secondary: '#044571',
  tertiary: '#FFE358',

  // non-colors
  black: '#000000',
  white: '#FFFFFF',

  // color variations
  gray: '#535453',
  lightGray: '#EFF1F3',
  error: '#DC3545',
  warning: '#FFE358',
  success: '#4CD964',
  info: '#4DA1FF',

  //ios statusbar color
  statusbar_dark: 'light-content',
  statusbar_light: 'dark-content',

  // app colors
  selectedCheckboxBackground: '#48586E',
  unselectedCheckboxBorder: '#D4D4D4',
  placeholder: '#7E7E7E',
};

const SIZES = {
  // global sizes
  base: 8,
  font: 16,
  radius: 8,
  padding: 16,
  radiusBtn: 8,

  inputHeight: 45,
  iconSize: 24,

  // font sizes
  h1: platform === 'android' ? 35 : 34,
  h2: 24,
  h3: 20,
  title: 18,
  subtitle: 14,
  caption: 12,
  small: 10,

  inputText: 15,
  inputLabel: 14,
  inputError: 13,
  // app dimensions
  width,
  height,

  // header
  header: 50,

  // bottom tab
  tabText: width * 0.035,
  tabIcon: width * 0.04,
  bottomTabHeight: 60,

  // product detail header
  headerIconSize: 24,

  // buttonHeight
  buttonHeight: 45,

  starSize: width * 0.045,

  shadow: {
    shadowColor: 'rgba(0,0,0,0.075)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
};
const FONTS = {
  fontFamily: 'Roboto',
  h1: {
    fontSize: SIZES.h1,
    fontFamily: 'Roboto',
    letterSpacing: 0.15,
  },
  h2: {
    fontSize: SIZES.h2,
    fontFamily: 'Roboto',
    letterSpacing: 0,
  },
  h3: {
    fontSize: SIZES.h3,
    fontFamily: 'Roboto',
    letterSpacing: 0.15,
  },
  title: {
    fontSize: SIZES.title,
    fontFamily: 'Roboto',
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: SIZES.subtitle,
    fontFamily: 'Roboto',
  },
  caption: {
    fontSize: SIZES.caption,
    fontFamily: 'Roboto',
    letterSpacing: 0.4,
  },
  small: {
    fontSize: SIZES.small,
    fontFamily: 'Roboto',
    letterSpacing: 1.5,
  },
  input: {
    fontFamily: 'Roboto',
  },
  placeholder: {
    fontFamily: 'Roboto',
  },
  button: {
    fontFamily: 'Roboto',
  },
};

const WEIGHTS = {
  regular: {fontFamily: 'Roboto-Regular'},
  bold: {fontFamily: 'Roboto-Bold'},
  semibold: {fontFamily: 'Roboto-SemiBold'},
  medium: {fontFamily: 'Roboto-Medium'},
  light: {fontFamily: 'Roboto-Light'},
};

export {COLORS, SIZES, FONTS, WEIGHTS};