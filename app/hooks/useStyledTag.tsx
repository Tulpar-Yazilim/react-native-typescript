/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {NamedExoticComponent, ReactElement} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

const useStyledTag = (tag: React.ReactNode | React.ComponentType | NamedExoticComponent, style?: string, objectStyle?: TextStyle | ViewStyle | ImageStyle | object) => {
  const Component = {
    element: ({children = <React.Fragment />, ...props}: {children?: ReactElement | string} | any): React.ReactElement => {
      const ReactComponent = tag as React.ElementType;
      return (
        <ReactComponent s={style} {...props} style={objectStyle}>
          {children}
        </ReactComponent>
      );
    },
  };
  return Component.element;
};

export default useStyledTag;
