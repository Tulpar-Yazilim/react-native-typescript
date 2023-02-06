/* eslint-disable prettier/prettier */
import {AppButton, AppScreen, Form, fields} from '@/components';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const SelectOptions = [
  {
    id: 1,
    name: 'Armut',
  },
  {
    id: 2,
    name: 'Elma',
  },
  {
    id: 3,
    name: 'Karpuz',
  },
];

const initial = {
  name: '',
  date: null,
  password: '',
  select: '1',
  autoComplete: '',
  multipleSelect: [],
};

const FormPage = () => {
  const [users, setUsers] = useState([]);

  const schema = Yup.object({
    name: fields.text.label('Text Example').required('Bu alan zorunludur'),
    date: fields.date.label('Date Picker').required('Tarih alanı zorunludur'),
    password: fields.password.label('Password').min(6,'En az 6 karakter olmalı').required('Lütfen parola giriniz'), // prettier-ignore
    select: fields.select(SelectOptions, 'string', 'name', 'id').label('Select').required('select required message'), // prettier-ignore
    autoComplete: fields.autoComplete(users, 'string', 'name.first', 'name.first').label('Auto Complete'), // prettier-ignore
    multipleSelect: fields.multipleSelect(users, 'string', 'name.first', 'name.first').label('Multiple Select'), // prettier-ignore
    radio: fields.radio([{label: 'radio-1', value: 1},{label: 'radio 2', value: 2}]), // prettier-ignore
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await fetch('https://randomuser.me/api?results=100');
    const data = await res.json();
    setUsers(data.results);
  };

  const form = useForm({
    defaultValues: initial,
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AppScreen keyboardScroll>
      <Form schema={schema} form={form} />
      <AppButton mt-10 type="secondary" onPress={form.handleSubmit(onSubmit)} title="Submit" />
    </AppScreen>
  );
};

export default FormPage;
