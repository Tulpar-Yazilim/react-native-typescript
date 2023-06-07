import React, {FC, memo} from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import useTheme from '../../../hooks/useTheme';

import {useAppSelector} from '@/hooks';
import {i18next} from '@/lang';

type Props = {
  visible: boolean;
  mode?: 'date' | 'time' | 'datetime';
  date?: Date;
  isDarkModeEnabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  onDateChange?: (_date: Date) => void;
  onClose?: (_date: Date) => void;
};

const DateTimePicker: FC<Props> = ({visible, mode = 'date', isDarkModeEnabled, minimumDate, maximumDate, date, onDateChange, onClose}) => {
  const language = useAppSelector(state => state.settings.language);
  const theme = useTheme();
  const handleConfirm = (_date: Date) => {
    onClose?.(_date);
    onDateChange?.(_date);
  };

  return (
    <DateTimePickerModal
      confirmTextIOS={i18next.t('save').toString()}
      cancelTextIOS={i18next.t('close').toString()}
      date={date}
      locale={language}
      isVisible={visible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={_date => onClose?.(_date)}
      onHide={_date => onClose?.(_date)}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      buttonTextColorIOS={theme.colors.defaultTextColor}
      isDarkModeEnabled={isDarkModeEnabled}
      textColor={isDarkModeEnabled ? 'white' : 'auto'}
      themeVariant={isDarkModeEnabled ? 'dark' : 'light'}
      display={mode === 'time' ? 'spinner' : 'inline'}
    />
  );
};

export default memo(DateTimePicker);
