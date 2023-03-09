import {AppInput as Input} from '@/components';
import React, {FC, memo} from 'react';
import {Controller} from 'react-hook-form';
import {Props} from './app-input';

const AppInput: FC<Props | any> = props => {
  const {label,form,name,secureTextEntry,inputProps, ...rest} = props; // prettier-ignore

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange, ref, value}, fieldState: {error}}) => (
        <Input
          form={form}
          name={name}
          secureTextEntry={secureTextEntry}
          onChange={onChange}
          animatedPlaceholder={label}
          error={error?.message}
          value={value}
          reference={ref}
          inputProps={inputProps}
          {...rest}
        />
      )}
    />
  );
};

export default memo(AppInput);
