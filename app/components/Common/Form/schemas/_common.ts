/* eslint-disable prettier/prettier */
import {ArraySchema, NumberSchema, StringSchema} from 'yup';
import {MixedSchema} from 'yup/lib/mixed';
import yup from './_yup';
import {SelectOptions} from '../types';
import {SchemaField, SchemaInputType} from '../types/dataForm/enums';

type YStringSchema = StringSchema<string, any, string>;
type YNumberSchema = NumberSchema<number, any, number>;
type YArraySchema = ArraySchema<MixedSchema<any, any, any>, any, any[], any[]>;
type YMixedSchema = MixedSchema<any, any, any>;

export const string: any = yup.string().nullable().default('').trim();

export const number: any = yup.number().nullable().meta({
    field: SchemaField.InputText,
    type: SchemaInputType.number,
});

export const currency: any = string.nullable().meta({
    field: SchemaField.InputCurrency,
    type: SchemaInputType.text,
});

export const text: any = string.nullable().meta({
    field: SchemaField.InputText,
    type: SchemaInputType.text,
});

export const textarea: any = string.nullable().meta({
    field: SchemaField.InputText,
    type: SchemaInputType.textarea,
});

export const date: any = string.nullable().meta({field: SchemaField.InputDate});

export const email: any = string.meta({field: SchemaField.InputText, type: SchemaInputType.email}).email();

export const phone: any = string.meta({field: SchemaField.InputPhoneNumber});

export const password: any = string.label('Parola').meta({field: SchemaField.InputPassword, type: SchemaInputType.password});

export const url: any = string.meta({
    field: SchemaField.InputText,
    type: SchemaInputType.url,
});

export const radio: any = (options: SelectOptions, type: string | number, displayProp?: string, valueProp?: string) => {
    return yup?.array().nullable().meta({
        field: SchemaField.RadioButton,
        options,
        displayProp,
        valueProp,
    });
};

export const select: any = (options: SelectOptions, type: string | number, displayProp?: string, valueProp?: string): any => {
    const _yup = yup as any;
    return _yup?.[type]().nullable().meta({field: SchemaField.InputSelect, options, displayProp, valueProp});
};

export const autoComplete: any = (options: SelectOptions, type: string | number, displayProp?: string, valueProp?: string) => {
    const _yup = yup as any;
    return _yup?.[type]().nullable().meta({
        field: SchemaField.InputAutoComplete,
        options,
        displayProp,
        valueProp,
    });
};

export const multipleAutoComplete: any = (options: SelectOptions, entries?: [key: string, value: any]) => {
    return yup?.array().nullable().meta({field: SchemaField.InputAutoComplete, options, entries});
};

export const multipleSelect: any = (options: SelectOptions, type: string | number, displayProp?: string, valueProp?: string) => {
    return yup?.array().nullable().meta({
        field: SchemaField.InputMultipleSelect,
        options,
        displayProp,
        valueProp,
    });
};

export const fileBase = yup.mixed().meta({
    field: SchemaField.InputFile,
    type: SchemaInputType.file,
    accept: '*',
});

interface Fields {
    url: YStringSchema;
    date: YStringSchema;
    text: YStringSchema;
    currency: YStringSchema;
    email: YStringSchema;
    textarea: YStringSchema;
    name: YStringSchema;
    password: YStringSchema;
    select: (options: SelectOptions, type: number | string, displayProp?: string, valueProp?: string) => YStringSchema;
    fileBase: YMixedSchema;
    autoComplete: (options: SelectOptions, type: number | string, displayProp?: string, valueProp?: string) => YStringSchema;
    multipleAutoComplete: (options: SelectOptions, entries?: [key: string, value: string]) => any;
    multipleSelect: (options: SelectOptions, type: number | string, displayProp?: string, valueProp?: string) => any;
    phone: YStringSchema;
    number: YNumberSchema;
    radio: (options: SelectOptions, entries?: [key: string, value: string]) => any;
}

export const fields: Fields = {
    url,
    date,
    text,
    currency,
    email,
    textarea,
    number,
    autoComplete,
    name: text,
    password,
    select,
    fileBase,
    phone,
    multipleSelect,
    multipleAutoComplete,
    radio,
};
