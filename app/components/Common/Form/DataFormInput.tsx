/* eslint-disable no-duplicate-case */
import * as React from 'react';
import {SchemaField} from './types/dataForm/enums';
import {SchemaMeta, SelectOptions} from './types/dataForm/types';

import AppAutoComplete from './partials/AppAutoComplete';
import {AppDateTimePicker} from './partials/AppDateTimePicker/index';
import AppInput from './partials/AppInput/index';
import AppMultipleSelect from './partials/AppMultipleSelect';
import AppRadioButton from './partials/AppRadioButton';
import AppSelector from './partials/AppSelector';

interface IDataFormInput {
  name?: string;
  meta: SchemaMeta;
  mb?: number;
  form: any;
  errors?: Record<string, any>;
  categories?: SelectOptions;
}

export default function DataFormInput({name, meta, form, mb}: IDataFormInput) {
  const inputName = name || meta.name;
  switch (meta.field) {
    case SchemaField.InputText:
      return (
        <AppInput
          {...meta}
          key={inputName}
          name={inputName}
          form={form}
          mb={mb}
        />
      );
    case SchemaField.InputDate:
      return (
        <AppDateTimePicker
          {...meta}
          key={inputName}
          name={inputName}
          form={form}
          mb={mb}
        />
      );
    case SchemaField.InputPassword:
      return (
        <AppInput
          {...meta}
          secureTextEntry
          key={inputName}
          name={inputName}
          form={form}
          mb={mb}
        />
      );
    case SchemaField.InputAutoComplete:
      return (
        <AppAutoComplete
          {...meta}
          key={inputName}
          name={inputName}
          form={form}
          mb={mb}
        />
      );
    case SchemaField.InputMultipleSelect:
      return (
        <AppMultipleSelect
          {...meta}
          key={inputName}
          name={inputName}
          form={form}
          mb={mb}
        />
      );
    case SchemaField.RadioButton:
      return (
        <AppRadioButton
          {...meta}
          key={inputName}
          name={inputName}
          form={form}
          mb={mb}
        />
      );
    case SchemaField.InputSelect:
      return <AppSelector {...meta} form={form} />;
    default:
      //console.error(`${inputName} is empty`);
      return null;
  }
}
