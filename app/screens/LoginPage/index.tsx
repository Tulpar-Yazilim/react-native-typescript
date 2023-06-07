import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

import {AppButton, AppScreen, fields, Form} from '@/components';

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

  const onSubmit = (values: typeof initial) => {
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
