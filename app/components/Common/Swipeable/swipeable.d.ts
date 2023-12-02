import Swipeable from 'react-native-gesture-handler/Swipeable';

import {ICONS} from '@/utils';

export type SwipeIcon = {
  name: keyof typeof ICONS;
  size?: number;
  color?: string;
};

export type SwipItem = {
  text: string;
  textColor?: string;
  icon: Icon;
  background: string;
  titleStyle?: never;
  onPress?: () => void;
};

export type SwipeProps = {
  leftItems: Array<SwipItem>;
  rightItems: Array<SwipItem>;
  children: ReactElement;
} & Swipeable;
