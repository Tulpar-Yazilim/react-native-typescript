import * as React from 'react';

import {UseFormReturn} from 'react-hook-form';

import AppAutoComplete from './partials/AppAutoComplete';
import {AppDateTimePicker} from './partials/AppDateTimePicker/index';
import AppInput from './partials/AppInput/index';
import AppMultipleSelect from './partials/AppMultipleSelect';
import AppRadioButton from './partials/AppRadioButton';
import AppSelector from './partials/AppSelector';
import {SchemaField} from './types/dataForm/enums';
import {SchemaMeta, SelectOptions} from './types/dataForm/types';

interface IDataFormInput<T> {
  name?: string;
  meta: SchemaMeta;
  mb?: number;
  form: UseFormReturn;
  errors?: Array<T>;
  categories?: SelectOptions;
  options?: Array<T>;
  displayProp?: string;
  valueProp?: string;
}

export default function DataFormInput({name, meta, form}: IDataFormInput<unknown>) {
  const inputName = name ?? meta.name;
  switch (meta.field) {
    case SchemaField.InputText:
      return <AppInput {...meta} key={inputName} name={inputName} form={form} />;
    case SchemaField.InputDate:
      return <AppDateTimePicker {...meta} key={inputName} name={inputName} form={form} />;
    case SchemaField.InputPassword:
      return <AppInput {...meta} secureTextEntry key={inputName} name={inputName} form={form} />;
    case SchemaField.InputAutoComplete:
      return <AppAutoComplete {...meta} key={inputName} name={inputName} form={form} />;
    case SchemaField.InputMultipleSelect:
      return <AppMultipleSelect {...meta} key={inputName} name={inputName} form={form} />;
    case SchemaField.RadioButton:
      return <AppRadioButton {...meta} key={inputName} name={inputName} form={form} />;
    case SchemaField.InputSelect:
      return <AppSelector {...meta} key={inputName} name={inputName} form={form} />;
    default:
      return null;
  }
}
