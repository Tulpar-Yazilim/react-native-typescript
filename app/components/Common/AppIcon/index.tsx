import React, {memo} from 'react';

import Icomoon from 'react-native-icomoon';
import type {IconMoonProps} from 'react-native-icomoon';
import selectionJson from '../../../assets/selection.json';

type IconProps = Omit<IconMoonProps, 'iconSet'>;

export enum IconNames {
  home = 'home',
  close = 'close',
}

function AppIcon({name, ...restProps}: IconProps) {
  return <Icomoon iconSet={selectionJson} name={name} {...restProps} />;
}

export default memo(AppIcon);
