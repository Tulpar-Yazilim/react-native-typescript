import {ReactElement} from 'react';
import {AnimatableNumericValue, ColorValue, StyleProp, ViewStyle} from 'react-native';

export type ShadowOffset = {
  width: number;
  height: number;
};

export type ShadowProps = {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  shadowColor?: ColorValue;
  shadowOpacity?: AnimatableNumericValue;
  shadowRadius?: number;
  shadowOffset?: ShadowOffset;
  children?: ReactElement;
  style?: StyleProp<ViewStyle>;
};
