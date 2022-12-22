import React, {FC, memo, SetStateAction} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  visible: boolean;
  setVisible: SetStateAction<any>;
};

const DateTimePicker: FC<Props> = ({visible, setVisible}) => {
  const handleConfirm = () => {
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

export default memo(DateTimePicker);
