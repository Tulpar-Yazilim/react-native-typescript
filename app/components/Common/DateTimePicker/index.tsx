import React, {FC, SetStateAction, memo} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useTheme from '../../../hooks/useTheme';

type Props = {
  visible: boolean;
  mode?: 'date' | 'time' | 'datetime';
  setVisible: SetStateAction<any>;
  isDarkModeEnabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  onDateChange?: any;
  date?: any;
};

const DateTimePicker: FC<Props> = ({
  visible,
  setVisible,
  mode = 'date',
  isDarkModeEnabled,
  onDateChange,
  minimumDate,
  maximumDate,
  date,
}) => {
  const theme = useTheme();
  const handleConfirm = (date: any) => {
    setVisible(false);
    onDateChange(date);
  };

  return (
    <DateTimePickerModal
      isVisible={visible}
      mode={mode}
      date={date}
      textColor={isDarkModeEnabled ? 'white' : 'auto'}
      onConfirm={handleConfirm}
      onCancel={() => setVisible(false)}
      isDarkModeEnabled={isDarkModeEnabled}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      confirmTextIOS="Onayla"
      cancelTextIOS="Vazgeç"
      buttonTextColorIOS={theme.colors.defaultTextColor}
    />
  );
};

export default memo(DateTimePicker);
