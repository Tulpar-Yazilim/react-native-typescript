import {FlatListProps} from 'react-native';

export type DataItem = string | object | number;

export type DotProps = {
  index?: number;
};

export type AppSwipeCarouselProps<T> = {
  data: ReadonlyArray<T>;
} & FlatListProps<T>;
