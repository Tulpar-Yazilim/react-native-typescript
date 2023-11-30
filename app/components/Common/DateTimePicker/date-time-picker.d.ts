export type DateTimePickerProps = {
  visible: boolean;
  mode?: 'date' | 'time' | 'datetime';
  date?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  onDateChange?: (_date: Date) => void;
  onClose?: (_date?: Date) => void;
};
