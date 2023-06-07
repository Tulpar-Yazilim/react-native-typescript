/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import DataFormInput from './DataFormInput';
import {formitMeta} from './formit';
import {SchemaMeta} from './types/dataForm/types';
import Block from '../Block';

interface DataFormProps {
  form: any;
  schema: any;
}

export default function DataForm({form, schema}: DataFormProps) {
  const schemaMetas = Object.keys(schema?.fields).map(name => formitMeta(schema, name));
  return (
    <Block>
      {schemaMetas.map((meta: SchemaMeta, index: number) => {
        const fields = meta?.fields || null;

        if (!fields) {
          return <DataFormInput key={index} meta={meta} form={form} name={`${meta.name}`} mb={meta.mb ?? 0} />;
        }

        return fields.map((item, fieldIndex: number) => <DataFormInput key={`${fieldIndex}_field`} name={`${meta.name}.${item.name}`} meta={item} form={form} mb={meta.mb ?? 0} />);
      })}
    </Block>
  );
}
