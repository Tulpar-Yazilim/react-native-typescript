import {SelectOptionItemType} from '../Form/types';

export type RadioButtonProps = {
  item: SelectOptionItemType;
  checked: boolean;
  setChecked: () => void;
};
