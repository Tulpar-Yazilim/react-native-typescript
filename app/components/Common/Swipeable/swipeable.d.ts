import {ICONS} from '@/utils';

interface Icon {
  name: keyof typeof ICONS;
  size?: number;
  color?: string;
}

export interface SwipItem {
  text: string;
  textColor?: string;
  icon: Icon;
  background: string;
  titleStyle?: never;
  onPress?: () => void;
}

export interface Props extends Swipeable {
  leftItems: Array<SwipItem>;
  rightItems: Array<SwipItem>;
  children: ReactElement;
}
