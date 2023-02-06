import React from 'react';
import {AppButton, AppScreen, Form, fields} from '@/components';
import {yupResolver} from '@hookform/resolvers/yup';
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
  username: '',
  password: '',
};

const LoginPage = () => {
  const schema = Yup.object({
    username: fields.text.label('Username').required('Bu alan zorunludur'),
    password: fields.password.label('Password').min(6, 'En az 6 karakter olmalı').required('Lütfen parola giriniz'),
  });

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

export default LoginPage;
