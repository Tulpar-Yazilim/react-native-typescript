/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {AppScreen, Form, fields, AppButton} from '@components';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

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
  name: 'asdfasdf',
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
    multipleSelect: fields.multipleSelect(users, 'string', 'name.first', 'name.first').label('Multiple Select') // prettier-ignore
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
      <AppButton
        mt-10
        type="secondary"
        onPress={form.handleSubmit(onSubmit)}
        title="Submit"
      />
    </AppScreen>
  );
};

export default FormPage;
