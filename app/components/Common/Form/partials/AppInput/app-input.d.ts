import {FocusEvent} from 'react';
import {TextInputProps} from 'react-native';

export interface Props extends TextInputProps {
  placeholder?: string;
  onChange?: ((text: string) => void) | undefined;
  handleBlur?: ((event) => void) | undefined;
  onFocus?: ((event: FocusEvent) => void) | undefined;
  value?: string | number;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
  inputProps;
}
