import {ReactNode, RefObject} from 'react';
import {FlatListProps, FlatList as FList, ImageStyle, TextStyle, ViewStyle} from 'react-native';

export interface IFListProps<T> extends FlatListProps<T> {
  data: ReadonlyArray<T>;
  usePagination?: boolean;
  loading?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
  preloader?: ReactNode;
  preloaderLength?: number;
  preloaderWidth?: number;
  preloaderHeight?: number;
  preloaderContainerStyle?: ViewStyle | TextStyle | ImageStyle;
  contentContainerStyle?: ViewStyle | TextStyle | ImageStyle;
  horizontal?: boolean;
  sticky?: boolean;
  index?: number;
  removeClippedSubviews?: boolean;
  flex?: boolean;
  reference?: RefObject<FList>;
  onRefreshData?: () => void | Promise<void>;
}
