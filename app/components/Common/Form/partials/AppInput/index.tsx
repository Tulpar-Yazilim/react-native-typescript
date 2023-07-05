import React, {FC, memo} from 'react';
import {TextInputProps} from 'react-native';

import {Controller, UseFormReturn} from 'react-hook-form';

import {AppInput as Input} from '@/components';
import {ICONS} from '@/utils';

interface AppInputProps extends TextInputProps {
  placeholder?: string;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: keyof typeof ICONS;
  label?: string;
  form: UseFormReturn;
  name: string;
}

const AppInput: FC<AppInputProps> = props => {
  const {label, form, name, secureTextEntry, ...rest} = props;
  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange, ref, value}, fieldState: {error}}) => (
        <Input reference={ref} form={form} name={name} secureTextEntry={secureTextEntry} onChangeText={onChange} animatedPlaceholder={label} error={error?.message} value={value} {...rest} />
      )}
    />
  );
};

export default memo(AppInput);
