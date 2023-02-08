import React, {NamedExoticComponent} from 'react';

const useStyledTag = (tag: React.ReactNode | React.ComponentType | NamedExoticComponent, style?: string) => {
    const Component = {
        element: ({children = <React.Fragment />, ...props}): React.ReactElement => {
            const ReactComponent = tag as React.ElementType;
            return (
                <ReactComponent s={style} {...props}>
                    {children && children}
                </ReactComponent>
            );
        },
    };
    return Component.element;
};

export default useStyledTag;
