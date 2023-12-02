import React, {memo} from 'react';
import {Switch} from 'react-native';

import {COLORS} from '@/theme';

import {Props} from './app-switch';

function AppSwitch(props: Readonly<Props>) {
  const {
    value,
    onChange,
    trackColor = {
      false: COLORS.gray, // supported android only
      true: COLORS.primary,
    },
    thumbColor = {
      true: COLORS.white,
      false: COLORS.white,
    },
    iosBackgroundColor = '',
    ...otherProps
  } = props;
  return (
    <Switch
      {...otherProps}
      trackColor={trackColor ?? {}}
      thumbColor={value ? thumbColor.true : thumbColor.false}
      ios_backgroundColor={iosBackgroundColor ?? ''}
      onValueChange={onChange}
      value={value}
    />
  );
}

export default memo(AppSwitch);
