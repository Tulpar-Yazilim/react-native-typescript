import React, {FC, SetStateAction, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  visible: boolean;
  setVisible: SetStateAction<any>;
};

export const DateTimePicker: FC<Props> = ({visible, setVisible}) => {
  const handleConfirm = (date: any) => {
    setVisible(false);
  };

  return (
    <DateTimePickerModal
      isVisible={visible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={() => setVisible(false)}
    />
  );
};
