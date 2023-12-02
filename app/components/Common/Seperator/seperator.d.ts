import {ColorValue} from 'react-native';

import {IStyleShortcuts, SetupSizeTypes} from '@/utils';

export type SeperatorProps = {
  color?: ColorValue;
  isVertical?: boolean;
} & SetupSizeTypes &
  IStyleShortcuts;
