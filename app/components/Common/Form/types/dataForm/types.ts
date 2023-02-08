import {SchemaField, SchemaInputType} from './enums';

export type SelectOptions = {label: string; value: string}[] | [] | any;

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
}

export interface IControl {
    value?: any;
    onChange?: (...event: any[]) => void;
}

export interface IInput {
    name: string;
    form: any;
    label?: string;
    mb?: number;
}

export interface IInputSelect extends IInput {
    options: {label: string; value: any}[] | [];
}

export interface IInputText extends IInput {
    accept?: string;
    setValue?: any;
    type?: React.InputHTMLAttributes<unknown>['type'];
    minRows?: number;
    maxRows?: number;
    readonly?: boolean;
    size?: 'medium' | 'small';
}
