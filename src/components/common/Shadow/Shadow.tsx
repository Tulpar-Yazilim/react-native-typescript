import React, {FC} from 'react';
import DropShadow from 'react-native-drop-shadow';
import {defaultShadows} from './shadow.style';

type Props = {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  shadowColor?: any;
  shadowOpacity?: any;
  shadowRadius?: any;
  shadowOffset?: any;
  children?: any;
};

export const Shadow: FC<Props> = ({children, ...props}) => {
  const {
    xs,
    sm,
    md,
    lg,
    xl,
    shadowColor,
    shadowOpacity,
    shadowRadius,
    shadowOffset,
  } = props;

  return (
    <DropShadow
      style={[
        xs && defaultShadows.xs,
        sm && defaultShadows.sm,
        md && defaultShadows.md,
        lg && defaultShadows.lg,
        xl && defaultShadows.xl,
        shadowColor && {shadowColor},
        shadowOpacity && {shadowOpacity},
        shadowRadius && {shadowRadius},
        shadowOffset && {shadowOffset},
      ]}>
      {children}
    </DropShadow>
  );
};
