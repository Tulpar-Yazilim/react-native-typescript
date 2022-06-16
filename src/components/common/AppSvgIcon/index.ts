import React, {FC, memo} from 'react';
import {Icons, IconTypes} from '@assets';

type Props = {
  name: string;
  style?: any;
  color?: string;
  stroke?: any;
  width?: number | string;
  height?: number | string;
};

const AppSvgIcon: FC<Props> = ({
  name,
  style,
  color = '#000',
  stroke,
  width = 16,
  height = 16,
}) =>
  React.createElement(Icons[name], {
    style,
    height,
    width,
    fill: color,
    stroke,
  });

export default memo(AppSvgIcon);
