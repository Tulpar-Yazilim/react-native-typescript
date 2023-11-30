import React, {FC, memo} from 'react';

import {Block} from '@/components';

import {RowProps} from './grid';

const Row: FC<RowProps> = props => {
  const {children} = props;

  return (
    <Block w="100%" row {...props}>
      {children}
    </Block>
  );
};

export default memo(Row);
