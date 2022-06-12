import {ReactNode} from 'react';
import {GestureResponderEvent, TextStyle, ViewStyle} from 'react-native';
import {IStyleShortcuts} from '../../../utils/StyleShortcut';

export interface Props extends IStyleShortcuts {
  onPress: (event: GestureResponderEvent) => void;
  type: EnumButtonType;
  disabled?: boolean | any;
  loading?: boolean;
  title?: string;
  icon?: ReactNode;
  children?: any;
}

export interface IButtonTypes {
  primary: IButtonTypeItem;
  secondary: IButtonTypeItem;
  outline: IButtonTypeItem;
  icon: IButtonTypeItem;
}

export interface IButtonTypeItem {
  container: ViewStyle;
  text: TextStyle;
}

export type EnumButtonType = 'primary' | 'secondary' | 'outline' | 'icon';
