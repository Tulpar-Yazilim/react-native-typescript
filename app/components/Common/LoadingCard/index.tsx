import React, {memo} from 'react';
import {ColorValue, StyleProp, ViewStyle} from 'react-native';

import {Fade, Placeholder, PlaceholderLine} from 'rn-placeholder';

import {COLORS} from '@/theme';

type Props = {
  height?: number;
  color: ColorValue | string;
  style: StyleProp<ViewStyle>;
};

const LoadingCard = ({height, color = COLORS.lightGray, style, ...props}: Props) => {
  return (
    <Placeholder Animation={Fade} {...props}>
      <PlaceholderLine height={height} color={color as string} style={style} />
    </Placeholder>
  );
};

export default memo(LoadingCard);
