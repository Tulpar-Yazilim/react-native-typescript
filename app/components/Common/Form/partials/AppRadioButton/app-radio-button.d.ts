import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

import {UseFormReturn} from 'react-hook-form';

import {IStyleShortcuts} from '../../../utils/style-shortcuts';
import {SelectOptions} from '../../types';
export interface Props extends IStyleShortcuts {
  placeholder?: string;
  name?: string;
  form?: UseFormReturn;
  options?: SelectOptions;
  onChange?: ((text: string) => void) | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: never;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
}
