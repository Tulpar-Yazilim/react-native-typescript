import React, {FC} from 'react';
import {Text as T} from 'react-native';
import {COLORS as c, FONTS as f} from '@theme';

type Props = {
  ff?: string;
  fs?: number;
  color?: string;
  style?: any;
  children?: any;
};

export const Text: FC<Props> = ({children, ...props}) => {
  const {ff, fs, color, style} = props;

  return (
    <T
      style={{
        fontFamily: ff || f.regular,
        color: color || c.black,
        fontSize: fs || 16,
        ...style,
      }}
      allowFontScaling={false}
      {...props}>
      {children}
    </T>
  );
};
