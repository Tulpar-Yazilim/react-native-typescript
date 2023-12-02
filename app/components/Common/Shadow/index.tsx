import React, {FC, memo} from 'react';

import DropShadow from 'react-native-drop-shadow';

import {ShadowProps} from './shadow';
import {defaultShadows} from './styles';

const Shadow: FC<ShadowProps> = ({children, ...props}) => {
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
