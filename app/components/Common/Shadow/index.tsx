import React, {FC, memo, ReactElement} from 'react';
import {AnimatableNumericValue, ColorValue, StyleProp, ViewStyle} from 'react-native';

import DropShadow from 'react-native-drop-shadow';

import {defaultShadows} from './style';

type Offset = {
  width: number;
  height: number;
};

type Props = {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  shadowColor?: ColorValue;
  shadowOpacity?: AnimatableNumericValue;
  shadowRadius?: number;
  shadowOffset?: Offset;
  children?: ReactElement;
  style?: StyleProp<ViewStyle>;
};

const Shadow: FC<Props> = ({children, ...props}) => {
  const {xs, sm, md, lg, xl, shadowColor, shadowOpacity, shadowRadius, shadowOffset, style} = props;

  return (
    <DropShadow
      style={[
        xs && defaultShadows.xs,
        sm && defaultShadows.sm,
        md && defaultShadows.md,
        lg && defaultShadows.lg,
        xl && defaultShadows.xl,
        {
          ...(shadowColor && {shadowColor}),
          ...(shadowOpacity && {shadowOpacity}),
          ...(shadowRadius && {shadowRadius}),
          ...(shadowOffset && {shadowOffset}),
        },
        style,
      ]}>
      {children}
    </DropShadow>
  );
};

export default memo(Shadow);
