import {DateData} from 'react-native-calendars';
import {DayProps} from 'react-native-calendars/src/calendar/day';

export interface AppCalendarProps {
  firstDay?: number;
  enableSwipeMonths?: boolean;
  onSelectDay?: (_date: string) => void;
}

export type DateComponentProps = DayProps & {
  date?: DateData;
};
