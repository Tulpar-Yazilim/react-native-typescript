import {AppButton, AppScreen, fields, Form, Text} from '@/components';
import {HomeStackNavigationRouteType} from '@/navigation/stacks/HomeStack/types';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRoute} from '@react-navigation/native';
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
    const route = useRoute<HomeStackNavigationRouteType<'FORM_SCREEN'>>();
    const {detailId} = route.params;

    const schema = Yup.object({
        name: fields.text.label('Text Example').required('Bu alan zorunludur'),
        date: fields.date.label('Date Picker').required('Tarih alanı zorunludur'),
        password: fields.password.label('Password').min(6, 'En az 6 karakter olmalı').required('Lütfen parola giriniz'),
        select: fields.select(SelectOptions, 'string', 'name', 'id').label('Select').required('select required message'),
        autoComplete: fields.autoComplete(users, 'string', 'name.first', 'name.first').label('Auto Complete'),
        multipleSelect: fields.multipleSelect(users, 'string', 'name.first', 'name.first').label('Multiple Select'),
        radio: fields.radio([
            {label: 'radio-1', value: 1},
            {label: 'radio 2', value: 2},
        ]),
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

    const onSubmit = (values: typeof initial) => {
        console.log(values);
    };

    return (
        <AppScreen keyboardScroll>
            <Text>{detailId}</Text>
            <Form schema={schema} form={form} />
            <AppButton mt-10 type="secondary" onPress={form.handleSubmit(onSubmit)} title="Submit" />
        </AppScreen>
    );
};

export default FormPage;
