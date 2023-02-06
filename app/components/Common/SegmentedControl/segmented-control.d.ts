interface Segments {
  label: string;
}

export interface Props extends SegmentProps {
  segments: Array<Segments>;
  currentIndex: number;
  onChange?: (index: number) => void;
  containerMargin?: number;
  tabColor?: string | any;
  activeColor?: string | any;
  titleColor?: string | any;
  activeTitleColor?: string | any;
  width?: number;
}
