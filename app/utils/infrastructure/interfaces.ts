import {FunctionComponent} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

import {ICONS} from '../icon-enums';

export interface IScreen<T> {
  title?: string;
  name: keyof T;
  icon?: keyof typeof ICONS;
  label?: string;
  component: FunctionComponent;
  headerShown?: boolean;
  props?: never;
}

export interface IThemeImageObject {
  [image: string]: string | number;
}

export interface IStyleShortcuts {
  w?: number | string;
  h?: number | string;
  mx?: number;
  my?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  px?: number;
  py?: number;
  p?: number;
  pl?: number;
  pb?: number;
  pt?: number;
  pr?: number;
  bg?: string;
  fs?: number;
  bw?: number;
  align?: string;
  justify?: string;
  direction?: string;
  backgroundColor?: string;
  borderBottom?: boolean | number;
  flex?: boolean | number;
  block?: boolean | number;
  border?: number | boolean;
  radius?: number;
  borderRadius?: number;
  color?: string;
  s?: string;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  right?: boolean;
  left?: boolean;
  wrap?: boolean;
  sm?: boolean;
}

export interface ITextStyles {
  fullWidth: StyleProp<TextStyle>;
  xs: StyleProp<TextStyle>;
  sm: StyleProp<TextStyle>;
  md: StyleProp<TextStyle>;
  header: StyleProp<TextStyle>;
  subheader: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  caption: StyleProp<TextStyle>;
  small: StyleProp<TextStyle>;
  input: StyleProp<TextStyle>;
  placeholder: StyleProp<TextStyle>;
  button: StyleProp<TextStyle>;
  default: StyleProp<TextStyle>;
  primary: StyleProp<TextStyle>;
  black: StyleProp<TextStyle>;
  secondary: StyleProp<TextStyle>;
  success: StyleProp<TextStyle>;
  white: StyleProp<TextStyle>;
  error: StyleProp<TextStyle>;
  light: StyleProp<TextStyle>;
  medium: StyleProp<TextStyle>;
  bold: StyleProp<TextStyle>;
  italic: StyleProp<TextStyle>;
}

export interface IPredefinedStyles {
  'bg-primary': StyleProp<ViewStyle>;
  'bg-secondary': StyleProp<ViewStyle>;
  'bg-card': StyleProp<ViewStyle>;
  'bg-white': StyleProp<ViewStyle>;
  px: StyleProp<ViewStyle>;
  block: StyleProp<ViewStyle>;
  flex: StyleProp<ViewStyle>;
  row: StyleProp<ViewStyle>;
  column: StyleProp<ViewStyle>;
  center: StyleProp<ViewStyle>;
  middle: StyleProp<ViewStyle>;
  overflow: StyleProp<ViewStyle>;
  left: StyleProp<ViewStyle>;
  right: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
  wrap: StyleProp<ViewStyle>;
  border: StyleProp<ViewStyle>;
  borderBottom: StyleProp<ViewStyle>;
  'justify-between': StyleProp<ViewStyle>;
  'justify-end': StyleProp<ViewStyle>;
  'align-between': StyleProp<ViewStyle>;
  'align-end': StyleProp<ViewStyle>;
  'mt-auto': StyleProp<ViewStyle>;
  'mb-auto': StyleProp<ViewStyle>;
  'mr-auto': StyleProp<ViewStyle>;
  'ml-auto': StyleProp<ViewStyle>;
  'm-auto': StyleProp<ViewStyle>;
}

export interface IStyles {
  shortcutStyles: IStyleShortcuts;
  predefinedStyles: IPredefinedStyles;
}

export interface DialogAction {
  text: string;
  onPress?: (_promptText?: string | null) => void;
  style: 'cancel' | 'default' | 'confirm';
}

export interface DialogOption {
  cancelable: boolean;
  backgroundClose: boolean;
}

export interface DialogProps {
  type: 'success' | 'warning' | 'error';
  position: 'top' | 'bottom' | 'left' | 'right';
  placeholder?: string;
  title: string;
  message: string;
  option?: DialogOption;
  alertType?: 'confirm' | 'alert' | 'prompt';
  action?: Array<DialogAction>;
}
