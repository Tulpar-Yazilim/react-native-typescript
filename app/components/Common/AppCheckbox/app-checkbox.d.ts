import {ColorValue} from 'react-native';

import {ICONS, SetupSizeTypes} from '@/utils';

export type CheckBoxProps = {
  checked?: boolean;
  checkedBackgroundColor?: ColorValue | string;
  checkedBorderColor?: ColorValue | string;
  backgroundColor?: ColorValue | string;
  borderColor?: ColorValue | string;
  icon?: keyof typeof ICONS;
  iconSize?: number;
  iconColor?: ColorValue | string;
  onPress?: () => void;
} & SetupSizeTypes;
