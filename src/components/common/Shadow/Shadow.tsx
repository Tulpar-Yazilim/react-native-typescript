import React, {FC} from 'react';
import DropShadow from 'react-native-drop-shadow';
import {Block} from '../Block/Block';
import {Text} from '../Text/Text';

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

const defaultShadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
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
