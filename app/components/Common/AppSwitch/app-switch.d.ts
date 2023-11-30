import {SwitchProps} from 'react-native';

export type TrackColor = {
  true: string;
  false: string;
};

export type Props = {
  value: boolean;
  onChange: EventEmitter;
  trackColor?: TrackColor;
  thumbColor?: TrackColor;
  iosBackgroundColor?: string;
} & SwitchProps;
