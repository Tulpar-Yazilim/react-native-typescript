import React from 'react';

const useStyledTag = (Tag: any, style?: any): any => {
  const Component = {
    element: ({children, ...props}: any) => <Tag s={style} {...props}>{children}</Tag>,
  };
  return Component.element;
};

export default useStyledTag;
