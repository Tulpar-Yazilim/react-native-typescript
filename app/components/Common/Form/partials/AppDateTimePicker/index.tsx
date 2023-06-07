import React, {useState} from 'react';

import moment from 'moment';
import {Controller, UseFormReturn} from 'react-hook-form';

import {AppInput, Block, DateTimePicker} from '@/components';
import {useAppSelector} from '@/hooks';

interface AppDateTimePickerProps {
  label: string;
  form: UseFormReturn;
  name: string;
  skipNext?: boolean;
}

export const AppDateTimePicker = (props: AppDateTimePickerProps) => {
  const {label, form, name, skipNext = false} = props;
  const [open, setOpen] = useState<boolean>(false);
  const [inputDate, setInputDate] = useState<string>('');
  const [_value, setValue] = useState<Date>(new Date());
  const theme = useAppSelector(state => state.settings.theme);

  const goToNextInput = () => {
    const values = Object.keys(form.getValues());
    const currentIndex = values.indexOf(name);
    const nextInput = values?.[currentIndex + 1];

    nextInput && form.setFocus(nextInput);
  };

  return (
    <Block {...props}>
      <Controller
        name={name}
        control={props.form.control}
        render={({field: {onChange, ref}, fieldState: {error}}) => (
          <>
            <AppInput
              onChangeText={() => {}}
              reference={ref}
              onPress={() => {
                setOpen(true);
              }}
              onFocus={() => {
                setOpen(true);
              }}
              editable={!open}
              animatedPlaceholder={label}
              disabled
              value={inputDate}
              onClear={() => {
                setInputDate('');
                onChange(null);
              }}
              error={error?.message}
            />
            <DateTimePicker
              onDateChange={date => {
                setInputDate(moment(date).format('DD MMMM YYYY'));
                setValue(new Date(date));
                onChange(date);
                skipNext && goToNextInput();
              }}
              isDarkModeEnabled={theme === 'dark'}
              date={_value}
              visible={open}
              onClose={() => setOpen(false)}
            />
          </>
        )}
      />
    </Block>
  );
};
