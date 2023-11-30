import React, {FC, memo} from 'react';

import {useTranslation} from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {useAppSelector, useTheme, useThemeMode} from '@/hooks';

import {DateTimePickerProps} from './date-time-picker';

const DateTimePicker: FC<DateTimePickerProps> = props => {
  const {visible, mode = 'date', minimumDate, maximumDate, date, onDateChange, onClose} = props;

  const language = useAppSelector(state => state.settings.language);
  const themeMode = useThemeMode();
  const theme = useTheme();

  const {t} = useTranslation();

  const handleConfirm = (_date: Date) => {
    onClose?.(_date);
    onDateChange?.(_date);
  };

  return (
    <DateTimePickerModal
      confirmTextIOS={t('confirm')}
      cancelTextIOS={t('close')}
      date={date}
      locale={language}
      isVisible={visible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={() => onClose?.()}
      onHide={_date => onClose?.(_date)}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      buttonTextColorIOS={theme.colors.defaultTextColor}
      isDarkModeEnabled={themeMode === 'dark'}
      textColor={themeMode === 'dark' ? 'white' : 'auto'}
      themeVariant={themeMode === 'dark' ? 'dark' : 'light'}
      display={mode === 'time' ? 'spinner' : 'inline'}
    />
  );
};

export default memo(DateTimePicker);
