import React, {FC, memo} from 'react';

import {Controller} from 'react-hook-form';

import {Props} from './app-radio-button';
import Block from '../../../Block';
import RadioButton from '../../../RadioButton';
import Text from '../../../Text';

const AppRadioButton: FC<Props | never> = props => {
  const {options = [], name = '', form} = props;

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <React.Fragment>
          {options?.map((item, index: number) => (
            <RadioButton
              key={index}
              item={item}
              checked={value === item.value}
              setChecked={() => {
                onChange?.(item.value);
              }}
            />
          ))}
          {error && (
            <Block px={10}>
              <Text error md>
                * {error?.message ?? ' '}
              </Text>
            </Block>
          )}
        </React.Fragment>
      )}
    />
  );
};

export default memo(AppRadioButton);
