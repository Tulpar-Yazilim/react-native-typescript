import {UseFormReturn} from 'react-hook-form';

import {SchemaField, SchemaInputType} from './enums';

export type SelectOptionItemType = {
  label: string;
  value: string | number;
  icon?: React.ReactNode | React.ReactElement | null;
  isIcon?: boolean;
  iconColor?: string;
  iconName?: string;
};

export type SelectOptions = Record<string, never> | SelectOptionItemType[] | [];

export interface SchemaMeta {
  name: string;
  col: number;
  label: string;
  field: SchemaField;
  fields?: SchemaMeta[] | [];
  fieldType: string;
  type?: SchemaInputType;
  maxRows?: number;
  accept?: string;
  iconSize?: number;
  width?: number;
  height?: number;
  mb?: number;
  options?: SelectOptions;
  readonly?: boolean;
  mask?: string;
  addLabel?: string;
  valueProp?: string;
  displayProp?: string;
  form?: UseFormReturn;
  isVisible?: boolean;
}
