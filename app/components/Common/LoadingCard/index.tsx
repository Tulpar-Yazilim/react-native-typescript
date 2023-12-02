import React, {memo} from 'react';

import {Fade, Placeholder, PlaceholderLine} from 'rn-placeholder';

import {COLORS} from '@/theme';

import {LoadingCardProps} from './loading-card';

const LoadingCard = (props: LoadingCardProps) => {
  const {height, color = COLORS.lightGray, style, ...otherProps} = props;
  return (
    <Placeholder Animation={Fade} {...otherProps}>
      <PlaceholderLine height={height} color={color as string} style={style} />
    </Placeholder>
  );
};

export default memo(LoadingCard);
