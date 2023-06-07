import {IStyleShortcuts} from '../../../utils/style-shortcuts';

export interface Props extends IStyleShortcuts {
  placeholder?: string;
  onChange?: ((text: string) => void) | undefined;
  handleBlur?: ((event: never) => void) | undefined;
  onFocus?: ((event: never) => void) | undefined;
  value?: never;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
}
