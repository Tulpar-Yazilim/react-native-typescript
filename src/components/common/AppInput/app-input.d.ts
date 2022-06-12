import {IStyleShortcuts} from '../../../utils/StyleShortcut';

export interface Props extends IStyleShortcuts {
  placeholder?: string;
  onChange?: ((text: string) => void) | undefined;
  handleBlur?: ((event: any) => void) | undefined;
  onFocus?: ((event: any) => void) | undefined;
  value?: any;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
}
