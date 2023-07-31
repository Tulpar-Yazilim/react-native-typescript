import {ReactNode} from 'react';
import {GestureResponderEvent, TextStyle, ViewStyle} from 'react-native';

import {IStyleShortcuts} from '../../../utils/style-shortcuts';

export interface Props extends IStyleShortcuts {
  onPress?: (event: GestureResponderEvent) => void;
  type?: EnumButtonType;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  icon?: keyof typeof ICONS;
  iconColor?: string;
  children?: ReactNode;
  titleColor?: ColorValue;
  width?: number | string;
  height?: number | string;
  loadingTitle?: string;
  style?: ReactNode;
  iconSize?: number;
}

export interface IButtonTypes {
  primary: IButtonTypeItem;
  secondary: IButtonTypeItem;
  outline: IButtonTypeItem;
  icon: IButtonTypeItem;
}

export interface IButtonTypeItem {
  container?: ViewStyle;
  text?: TextStyle;
}

export type EnumButtonType = 'primary' | 'secondary' | 'outline' | 'icon';
