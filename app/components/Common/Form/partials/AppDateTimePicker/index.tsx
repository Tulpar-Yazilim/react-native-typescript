import {AppInput, Block, DateTimePicker} from '@/components';
import {useAppSelector} from '@/hooks';
import moment from 'moment';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';

export const AppDateTimePicker = (props: any) => {
  const {label, form, name, skipNext = false} = props;
  const [open, setOpen] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [_value, setValue] = useState(new Date()) as any;
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
              onDateChange={(date: string) => {
                setInputDate(moment(date).format('DD MMMM YYYY'));
                setValue(new Date(date));
                onChange(date);
                skipNext && goToNextInput();
              }}
              isDarkModeEnabled={theme === 'dark'}
              date={_value}
              visible={open}
              setVisible={setOpen}
            />
          </>
        )}
      />
    </Block>
  );
};
