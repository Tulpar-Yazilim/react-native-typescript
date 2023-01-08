import React, {FC, memo} from 'react';
import {Props} from './app-input';
import {Controller} from 'react-hook-form';
import {AppInput as Input} from '@components';

const AppInput: FC<Props | any> = props => {
  const {label,form,name,secureTextEntry} = props; // prettier-ignore

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <Input
          secureTextEntry={secureTextEntry}
          onChange={onChange}
          animatedPlaceholder={label}
          error={error?.message}
          value={value}
        />
      )}
    />
  );
};

export default memo(AppInput);
