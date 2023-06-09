import {UseFormReturn} from 'react-hook-form';

import {SchemaField, SchemaInputType} from './enums';

export type SelectOptions =
  | Record<string, never>
  | {
      label: string;
      value: string | number;
    }[]
  | [];

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
}
