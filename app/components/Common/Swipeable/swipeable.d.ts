interface Icon {
  name: string;
  size?: number;
  color?: string | any;
}

export interface SwipItem {
  text: string;
  textColor?: string;
  icon: Icon;
  background: string | any;
  titleStyle?: any;
  onPress?: () => void;
}

export interface Props extends Swipeable {
  leftItems: Array<SwipItem>;
  rightItems: Array<SwipItem>;
  children: ReactElement;
}
