import React, {FC, memo, ReactNode} from 'react';

import {Block} from '@/components';

type Props = {
  children: ReactNode;
};

const Row: FC<Props> = props => {
  const {children} = props;

  return (
    <Block w="100%" row {...props}>
      {children}
    </Block>
  );
};

export default memo(Row);
