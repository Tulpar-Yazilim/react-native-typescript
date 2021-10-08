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
  error: '#DC3545',
  warning: '#FFE358',
  success: '#4CD964',
  info: '#4DA1FF',
};

const SIZES = {
  // global sizes
  base: 8,
  font: 16,
  radius: 8,
  padding: 16,
  radiusBtn: 8,
  // font sizes
  h1: platform === 'android' ? 35 : 34,
  h2: 24,
  h3: 20,
  title: 18,
  subtitle: 14,
  caption: 12,
  small: 10,

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
};
const FONTS = {
  h1: {fontSize: SIZES.h1, letterSpacing: 0.15},
  h2: {fontSize: SIZES.h2, letterSpacing: 0},
  h3: {fontSize: SIZES.h3, letterSpacing: 0.15},
  title: {fontSize: SIZES.title, letterSpacing: 0.15},
  subtitle: {fontSize: SIZES.subtitle},
  caption: {fontSize: SIZES.caption, letterSpacing: 0.4},
  small: {fontSize: SIZES.small, letterSpacing: 1.5},
};
const WEIGHTS = {
  regular: 'normal',
  bold: 'bold',
  semibold: '500',
  medium: '400',
  light: '300',
};

export {COLORS, SIZES, FONTS, WEIGHTS};
