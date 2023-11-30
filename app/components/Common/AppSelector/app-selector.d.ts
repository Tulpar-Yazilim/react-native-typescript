import {ReactElement, ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {ICONS} from '@/utils';

export interface ItemProp {
  title: string;
  value: string | number;
  icon?: ReactNode | ReactElement | null;
  isIcon?: boolean;
  iconColor?: string;
  iconName?: keyof typeof ICONS;
}

export interface AppSelectorProps {
  headerTitle?: string;
  isVisible: boolean;
  onClose?: () => void;
  onSelect?: (_value: ItemProp) => void;
  itemsList: ItemProp[];
  selectedItem?: ItemProp;
  containerStyle?: StyleProp<ViewStyle>;
}
