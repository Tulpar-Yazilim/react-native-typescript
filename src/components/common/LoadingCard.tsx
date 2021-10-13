import React from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

const LoadingCard = ({height, width, ...props}: any) => {
  return (
    <Placeholder
      Animation={Fade}
      Left={PlaceholderMedia}
      Right={PlaceholderMedia}
      {...props}>
      <PlaceholderLine width={width} height={height} />
    </Placeholder>
  );
};

export default LoadingCard;
