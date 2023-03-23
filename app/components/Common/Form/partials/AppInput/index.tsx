import React, {FC, memo} from 'react';
import {TextInputProps} from 'react-native';

import {Controller, UseFormReturn} from 'react-hook-form';

import {AppInput as Input} from '@/components';

interface AppInputProps extends TextInputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  handleBlur?: () => void;
  onFocus?: () => void;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
  label?: string;
  form: UseFormReturn;
  name: string;
}

const AppInput: FC<AppInputProps> = props => {
  const {label,form,name,secureTextEntry, ...rest} = props; // prettier-ignore

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange, ref, value}, fieldState: {error}}) => (
        <Input form={form} name={name} secureTextEntry={secureTextEntry} onChangeText={onChange} animatedPlaceholder={label} error={error?.message} value={value} reference={ref} {...rest} />
      )}
    />
  );
};

export default memo(AppInput);
