import React from 'react';

const useTag = (name: any): React.ElementType => {
  const Component = name as React.ElementType;
  return Component;
};

export default useTag;
