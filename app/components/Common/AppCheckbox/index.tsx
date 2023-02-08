import {useStyledTag} from '@/hooks';
import React from 'react';
import Block from '../Block';

const AppCheckbox = (props: any) => {
    const {checked} = props;
    const Checkbox = useStyledTag(Block, 'w-25 h-25 bg-primary rounded-6 center middle'); // prettier-ignore
    const CheckboxInner = useStyledTag(Block, 'w-13 h-13 bg-card rounded-3');

    return (
        <Checkbox pressable {...props}>
            {checked && <CheckboxInner />}
        </Checkbox>
    );
};

export default AppCheckbox;
