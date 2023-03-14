import React, {NamedExoticComponent} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

const useStyledTag = (tag: React.ReactNode | React.ComponentType | NamedExoticComponent, style?: string, objectStyle: TextStyle | ViewStyle | ImageStyle = {}) => {
  const Component = {
    element: ({children = <React.Fragment />, ...props}): React.ReactElement => {
      const ReactComponent = tag as React.ElementType;
      return (
        <ReactComponent s={style} style={objectStyle} {...props}>
          {children && children}
        </ReactComponent>
      );
    },
  };
  return Component.element;
};

export default useStyledTag;
