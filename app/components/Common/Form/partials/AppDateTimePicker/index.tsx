import React, {useState} from 'react';
import {AppInput, Block, DateTimePicker, Text} from '@components';
import moment from 'moment';
import {Controller} from 'react-hook-form';
import {useAppSelector} from '@hooks';

export const AppDateTimePicker = (props: any) => {
  const {label} = props;
  const [open, setOpen] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [_value, setValue] = useState(new Date()) as any;
  const theme = useAppSelector(state => state.settings.theme);

  return (
    <Block {...props}>
      <Controller
        name={props.name}
        control={props.form.control}
        render={({field: {onChange}, fieldState: {error}}) => (
          <>
            <AppInput
              onPress={() => {
                setOpen(true);
              }}
              editable={false}
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
