import React, {FC, memo} from 'react';
import Block from '../../../Block';
import Text from '../../../Text';
import RadioButton, {RadioButtonItem} from '../../../RadioButton';
import {Controller} from 'react-hook-form';
import {Props} from './app-radio-button';

const AppRadioButton: FC<Props | any> = props => {
    const {form, name, options} = props; // prettier-ignore

    return (
        <Controller
            name={name}
            control={form?.control}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <React.Fragment>
                    {options?.map((item: RadioButtonItem, index: number) => (
                        <RadioButton
                            key={index}
                            item={item}
                            checked={value === item.value}
                            setChecked={() => {
                                onChange(item.value);
                            }}
                        />
                    ))}
                    {error && (
                        <Block px={10}>
                            <Text error md>
                                * {error}
                            </Text>
                        </Block>
                    )}
                </React.Fragment>
            )}
        />
    );
};

export default memo(AppRadioButton);
