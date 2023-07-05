import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

import {IStyleShortcuts} from '../../../utils/style-shortcuts';
export interface Props extends IStyleShortcuts {
  placeholder?: string;
  onChange?: ((text: string) => void) | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: never;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
}
