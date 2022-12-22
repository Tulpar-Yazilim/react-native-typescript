import React, {FC, memo, SetStateAction} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  visible: boolean;
  mode?: 'date' | 'time' | 'datetime';
  setVisible: SetStateAction<any>;
  isDarkModeEnabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
};

const DateTimePicker: FC<Props> = ({
  visible,
  setVisible,
  mode = 'date',
  isDarkModeEnabled,
  minimumDate,
  maximumDate,
}) => {
  const handleConfirm = () => {
    setVisible(false);
  };

  return (
    <DateTimePickerModal
      isVisible={visible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={() => setVisible(false)}
      isDarkModeEnabled={isDarkModeEnabled}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
    />
  );
};

export default memo(DateTimePicker);
