import {Block} from '@/components';
import {COLORS} from '@/theme';
import React, {memo} from 'react';
import {Switch} from 'react-native';
import {Props} from './app-switch';

function AppSwitch({
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
  ...props
}: Props) {
  return (
    <Block>
      <Switch
        {...props}
        trackColor={trackColor ?? {}}
        thumbColor={value ? thumbColor.true : thumbColor.false}
        ios_backgroundColor={iosBackgroundColor ?? ''}
        onValueChange={onChange}
        value={value}
      />
    </Block>
  );
}

export default memo(AppSwitch);
