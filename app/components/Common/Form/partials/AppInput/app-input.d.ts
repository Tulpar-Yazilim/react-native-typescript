import {TextInputProps} from 'react-native';

export interface Props extends TextInputProps {
  placeholder?: string;
  value?: string | number;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
  inputProps;
}
