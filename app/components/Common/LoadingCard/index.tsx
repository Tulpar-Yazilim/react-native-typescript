import {COLORS} from '@/theme';
import React, {memo} from 'react';
import {Fade, Placeholder, PlaceholderLine} from 'rn-placeholder';

const LoadingCard = ({
  height,
  color = COLORS.lightGray,
  style,
  ...props
}: any) => {
  return (
    <Placeholder Animation={Fade} {...props}>
      <PlaceholderLine height={height} color={color} style={{...style}} />
    </Placeholder>
  );
};

export default memo(LoadingCard);
