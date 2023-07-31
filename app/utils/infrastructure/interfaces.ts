import {FunctionComponent} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {EventListenerCallback} from '@react-navigation/native';

import {COLORS} from '@/theme';

import {ICONS} from '../icon-enums';

export interface IScreen<T> {
  title?: string;
  name: keyof T;
  icon?: keyof typeof ICONS;
  label?: string;
  component?: FunctionComponent;
  headerShown?: boolean;
  props?: never;
  tabPress?: EventListenerCallback<BottomTabNavigationEventMap, 'tabPress'> | undefined;
}

export interface IThemeImageObject {
  [image: string]: string | number;
}

export interface IStyleShortcuts {
  'bg-primary'?: StyleProp<ViewStyle> | boolean;
  'bg-secondary'?: StyleProp<ViewStyle> | boolean;
  'bg-card'?: StyleProp<ViewStyle> | boolean;
  'bg-white'?: StyleProp<ViewStyle> | boolean;
  'bg-error'?: StyleProp<ViewStyle> | boolean;
  'bg-success'?: StyleProp<ViewStyle> | boolean;
  'bg-warning'?: StyleProp<ViewStyle> | boolean;
  px?: StyleProp<ViewStyle> | number;
  block?: StyleProp<ViewStyle> | boolean;
  flex?: StyleProp<ViewStyle> | boolean | number;
  row?: StyleProp<ViewStyle> | boolean | number;
  column?: StyleProp<ViewStyle> | boolean | number;
  center?: StyleProp<ViewStyle> | boolean | number;
  middle?: StyleProp<ViewStyle> | boolean | number;
  overflow?: StyleProp<ViewStyle> | string;
  left?: StyleProp<ViewStyle> | boolean | number;
  right?: StyleProp<ViewStyle> | boolean | number;
  top?: StyleProp<ViewStyle> | boolean | number;
  bottom?: StyleProp<ViewStyle> | boolean | number;
  wrap?: StyleProp<ViewStyle> | boolean;
  border?: StyleProp<ViewStyle> | boolean | number;
  borderBottom?: StyleProp<ViewStyle> | boolean | number;
  borderTop?: StyleProp<ViewStyle> | boolean | number;
  borderLeft?: StyleProp<ViewStyle> | boolean | number;
  borderRight?: StyleProp<ViewStyle> | boolean | number;
  'justify-between'?: StyleProp<ViewStyle>;
  'justify-end'?: StyleProp<ViewStyle>;
  'align-between'?: StyleProp<ViewStyle>;
  'align-end'?: StyleProp<ViewStyle>;
  'mt-auto'?: StyleProp<ViewStyle>;
  'mb-auto'?: StyleProp<ViewStyle>;
  'mr-auto'?: StyleProp<ViewStyle>;
  'ml-auto'?: StyleProp<ViewStyle>;
  'm-auto'?: StyleProp<ViewStyle>;
  w?: number | string;
  h?: number | string;
  mx?: number;
  my?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  py?: number;
  p?: number;
  pl?: number;
  pb?: number;
  pt?: number;
  pr?: number;
  bg?: keyof typeof COLORS;
  backgroundColor?: keyof typeof COLORS;
  fs?: number;
  bw?: number;
  align?: string;
  justify?: string;
  direction?: string;
  radius?: number;
  borderRadius?: number;
  color?: string;
  s?: string;
  sm?: boolean;
  rounded?: boolean | number;
}

export interface ITextStyles {
  fullWidth?: StyleProp<TextStyle> | boolean;
  xs?: StyleProp<TextStyle> | boolean;
  sm?: StyleProp<TextStyle> | boolean;
  md?: StyleProp<TextStyle> | boolean;
  header?: StyleProp<TextStyle> | boolean;
  subheader?: StyleProp<TextStyle> | boolean;
  title?: StyleProp<TextStyle> | boolean;
  subtitle?: StyleProp<TextStyle> | boolean;
  caption?: StyleProp<TextStyle> | boolean;
  small?: StyleProp<TextStyle> | boolean;
  input?: StyleProp<TextStyle> | boolean;
  placeholder?: StyleProp<TextStyle> | boolean;
  button?: StyleProp<TextStyle> | boolean;
  default?: StyleProp<TextStyle> | boolean;
  primary?: StyleProp<TextStyle> | boolean;
  black?: StyleProp<TextStyle> | boolean;
  secondary?: StyleProp<TextStyle> | boolean;
  success?: StyleProp<TextStyle> | boolean;
  white?: StyleProp<TextStyle> | boolean;
  error?: StyleProp<TextStyle> | boolean;
  light?: StyleProp<TextStyle> | boolean;
  medium?: StyleProp<TextStyle> | boolean;
  bold?: StyleProp<TextStyle> | boolean;
  italic?: StyleProp<TextStyle> | boolean;
  center?: StyleProp<TextStyle> | boolean;
  s?: string;
  size?: number;
  color?: StyleProp<TextStyle> | string;
}

export interface IStyles {
  shortcutStyles: IStyleShortcuts;
  predefinedStyles: IStyleShortcuts;
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
