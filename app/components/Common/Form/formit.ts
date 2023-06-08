import {AnyObject, Maybe, ObjectSchema, SchemaObjectDescription} from 'yup';

import {SchemaInputType, SchemaMeta} from './types/dataForm';

import {FormitMeta} from '@/utils';

const _formitMeta = (description: Record<string, FormitMeta>, name: string): SchemaMeta => {
  const meta = description?.meta;
  const col = meta?.col || 12;
  const label = (description?.label as string) || '';
  const fieldType = (description?.type as unknown as SchemaInputType) || SchemaInputType.text;
  return {name, col, fieldType, label, ...meta} as SchemaMeta;
};

export const formitMeta = (schema: ObjectSchema<Maybe<AnyObject>>, name: string): SchemaMeta => {
  const description = schema.describe().fields[name] as SchemaObjectDescription;
  const meta = description?.meta as FormitMeta;
  const col = meta?.col || 12;
  const label = description?.label || '';
  const fieldType = description?.type || SchemaInputType.text;
  const fields = description?.fields || null;

  if (fields) {
    const fieldsKeys = Object.keys(fields);
    return {
      col,
      name,
      fieldType,
      label,
      ...meta,
      fields: fieldsKeys.map(key => _formitMeta(fields[key] as unknown as Record<string, FormitMeta>, key)),
    } as SchemaMeta;
  }

  return _formitMeta(description as unknown as Record<string, FormitMeta>, name);
};

interface FormitFormData {
  data?: Record<string, never>;
  additions?: Record<string, never>;
}

export const formitFormData = async ({data = {}, additions = {}}: FormitFormData) => {
  const formData = {};

  const incomingData = {...data, ...additions};
  const incomingKeys = Object.keys(incomingData);

  for (const key of incomingKeys) {
    formData[key as never] = incomingData[key];
  }

  return formData;
};
