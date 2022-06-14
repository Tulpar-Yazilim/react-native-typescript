import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AppButton, Block, AppInput} from '@components';

const ExampleSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçersiz mail adresi !')
    .required('Email zorunlu bir alan !'),
  password: Yup.string()
    .min(5, 'Parola en az 5 karakter olmalıdır !')
    .max(12, 'Parola 12 karakterden uzun olamaz !')
    .required('Bu alan zorunludur'),
});

export const ExampleForm = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      validationSchema={ExampleSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={values => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          console.log(values);
        }, 3000);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <Block>
          <AppInput
            name="email"
            animatedPlaceholder="Username"
            value={values.email}
            handleBlur={handleBlur('email')}
            onChange={handleChange('email')}
            errorMessage={errors.email && touched.email && errors.email}
          />
          <AppInput
            name="password"
            animatedPlaceholder="Password"
            value={values.password}
            handleBlur={handleBlur('password')}
            onChange={handleChange('password')}
            secureTextEntry
            errorMessage={
              errors.password && touched.password && errors.password
            }
          />
          <AppButton
            type="primary"
            title="AppButton Title"
            onPress={(e: any) => handleSubmit(e)}
            disabled={loading || errors.email || errors.password}
            loading={loading}
          />
        </Block>
      )}
    </Formik>
  );
};
