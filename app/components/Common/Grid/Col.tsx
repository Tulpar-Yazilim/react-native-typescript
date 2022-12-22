import {Block} from '@components';
import React, {FC, memo, ReactNode} from 'react';

type Props = {
  children: ReactNode;
  col: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

const Col: FC<Props | any> = props => {
  const {children, col} = props;

  return (
    <Block w={`${(100 / 12) * col}%`} {...props}>
      {children}
    </Block>
  );
};

export default memo(Col);
