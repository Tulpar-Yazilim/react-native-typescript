import React from 'react';

import AppIcon from '../AppIcon';
import Block from '../Block';

import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';

interface ICheckBox {
  checked: boolean;
  onPress: () => void;
}

const AppCheckbox = (props: ICheckBox) => {
  const {checked, onPress} = props;
  const Checkbox = useStyledTag(Block, 'w-18 h-18 rounded-4 center middle border ', {
    borderWidth: 1.5,
    borderColor: checked ? COLORS.primary : COLORS.gray,
    backgroundColor: checked ? COLORS.primary : '',
  });

  return (
    <Checkbox {...props} pressable onPress={onPress}>
      <React.Fragment>{checked && <AppIcon name={'checkCircle'} size={14} color={COLORS.white} />}</React.Fragment>
    </Checkbox>
  );
};

export default AppCheckbox;
