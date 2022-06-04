import React, {memo} from 'react';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import {COLORS} from '@theme';

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
