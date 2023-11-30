export type SegmentsProps = {
  label: string;
};

export type SegmentedControlProps = {
  segments: SegmentsProps[];
  currentIndex: number;
  onChange?: (index: number) => void;
  containerMargin?: number;
  tabColor?: string;
  activeColor?: string;
  titleColor?: string;
  activeTitleColor?: string;
  width?: number;
};
