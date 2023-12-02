import React, {FC, memo} from 'react';

import {Block} from '@/components';

import {ColumnProps} from './grid';

const Column: FC<ColumnProps> = props => {
  const {children, col} = props;

  const s = col ? `w-${(100 / 12) * col}%` : undefined;

  return (
    <Block s={s} {...props}>
      {children}
    </Block>
  );
};

export default memo(Column);
