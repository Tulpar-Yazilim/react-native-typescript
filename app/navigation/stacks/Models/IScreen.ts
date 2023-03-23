import {FunctionComponent} from 'react';

export interface IScreen<T> {
  title?: string;
  name: keyof T;
  icon?: string;
  label?: string;
  component: FunctionComponent;
  headerShown?: boolean;
  props?: never;
}
