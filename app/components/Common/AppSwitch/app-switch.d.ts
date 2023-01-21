interface TrackColor {
  true: string | any;
  false: string | any;
}

export interface Props extends AppSwitch {
  value: boolean;
  onChange: EventEmitter;
  trackColor?: TrackColor;
  thumbColor?: TrackColor;
  iosBackgroundColor?: string | any;
}
