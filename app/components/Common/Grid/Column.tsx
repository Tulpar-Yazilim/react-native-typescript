import React, {FC, memo, ReactNode} from 'react';

import {Block} from '@/components';
import {IStyleShortcuts} from '@/utils';

interface Props extends IStyleShortcuts {
  children: ReactNode;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const Column: FC<Props> = props => {
  const {children, col} = props;

  const s = col ? `w-${(100 / 12) * col}%` : undefined;

  return (
    <Block s={s} {...props}>
      {children}
    </Block>
  );
};

export default memo(Column);
