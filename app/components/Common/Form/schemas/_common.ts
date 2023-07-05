import {AnyObject, ArraySchema, MixedSchema, NumberSchema, StringSchema} from 'yup';

import yup from './_yup';
import {SelectOptions} from '../types';
import {SchemaField, SchemaInputType} from '../types/dataForm/enums';

type YStringSchema = StringSchema<string | null | undefined, yup.AnyObject, '', 'd'>;
type YNumberSchema = NumberSchema<number | null | undefined, AnyObject, undefined, ''>;
type YMixedSchema = MixedSchema<yup.AnyObject | undefined, AnyObject, undefined, ''>;
type YArraySchema = ArraySchema<yup.AnyObject[] | null | undefined, AnyObject, undefined, ''>;

export const string = yup.string().nullable().default('').trim();

export const number = yup.number().nullable().meta({
  field: SchemaField.InputText,
  type: SchemaInputType.number,
});

export const currency = string.nullable().meta({
  field: SchemaField.InputCurrency,
  type: SchemaInputType.text,
});

export const text = string.nullable().meta({
  field: SchemaField.InputText,
  type: SchemaInputType.text,
});

export const textarea = string.nullable().meta({
  field: SchemaField.InputText,
  type: SchemaInputType.textarea,
});

export const date = string.nullable().meta({field: SchemaField.InputDate});

export const email = string.meta({field: SchemaField.InputText, type: SchemaInputType.email}).email();

export const phone = string.meta({field: SchemaField.InputPhoneNumber});

export const password = string.label('Parola').meta({field: SchemaField.InputPassword, type: SchemaInputType.password});

export const url = string.meta({
  field: SchemaField.InputText,
  type: SchemaInputType.url,
});

export const radio = (options: SelectOptions, displayProp?: string, valueProp?: string) => {
  return yup?.mixed().nullable().meta({
    field: SchemaField.RadioButton,
    options,
    displayProp,
    valueProp,
  }) as YMixedSchema;
};

export const select = (options: SelectOptions, type: string | number, displayProp?: string, valueProp?: string) => {
  return (yup[type as keyof typeof type]() as YStringSchema).nullable().meta({field: SchemaField.InputSelect, options, displayProp, valueProp});
};

export const autoComplete = (options: SelectOptions, type: string | number, displayProp?: string, valueProp?: string) => {
  return (yup[type as keyof typeof type]() as YStringSchema).nullable().meta({
    field: SchemaField.InputAutoComplete,
    options,
    displayProp,
    valueProp,
  });
};

export const multipleAutoComplete = (options: SelectOptions, entries?: [key: string, value: string]) => {
  return yup?.array().nullable().meta({field: SchemaField.InputAutoComplete, options, entries});
};

export const multipleSelect = (options: SelectOptions, type: string | number, displayProp?: string, valueProp?: string) => {
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
  multipleAutoComplete: (options: SelectOptions, entries?: [key: string, value: string]) => YArraySchema;
  multipleSelect: (options: SelectOptions, type: number | string, displayProp?: string, valueProp?: string) => YArraySchema;
  phone: YStringSchema;
  number: YNumberSchema;
  radio: (options: SelectOptions, displayProp?: string, valueProp?: string) => YMixedSchema;
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
