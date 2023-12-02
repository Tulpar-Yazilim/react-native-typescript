import React from 'react';

import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

import {CheckBoxProps} from './app-checkbox';
import AppIcon from '../AppIcon';
import Block from '../Block';

const AppCheckbox = (props: CheckBoxProps) => {
  const {checked, onPress} = props;
  const Checkbox = useStyledTag(Block, 'w-18 h-18 rounded-4 center middle border ', {
    borderWidth: 1.5,
    borderColor: checked ? props.checkedBorderColor ?? COLORS.primary : props.borderColor ?? COLORS.gray,
    backgroundColor: checked ? props.checkedBackgroundColor ?? COLORS.primary : props.backgroundColor ?? undefined,
  });

  return (
    <Checkbox {...props} pressable onPress={onPress}>
      {checked && <AppIcon name={props.icon ?? 'checkCircle'} size={props.iconSize ?? 14} color={(props.iconColor as keyof typeof ICONS) ?? COLORS.white} />}
    </Checkbox>
  );
};

export default AppCheckbox;
