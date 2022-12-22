import {Block} from '@components';
import React, {FC, ReactNode, memo} from 'react';

type Props = {
  children: ReactNode;
};

const Row: FC<Props | any> = props => {
  const {children} = props;

  return (
    <Block w="100%" fd="row" {...props}>
      {children}
    </Block>
  );
};

export default memo(Row);
