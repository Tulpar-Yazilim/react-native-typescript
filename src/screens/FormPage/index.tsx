import React, {useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {
  AppButton,
  Block,
  Text,
  AppInput,
  Row,
  Col,
  AppScreen,
} from '@components';

import {useNavigation} from '@react-navigation/native';

import {Formik} from 'formik';
import * as Yup from 'yup';

const ExampleSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçersiz mail adresi !')
    .required('Email zorunlu bir alan !'),
  password: Yup.string()
    .min(5, 'Parola en az 5 karakter olmalıdır !')
    .max(12, 'Parola 12 karakterden uzun olamaz !')
    .required('Bu alan zorunludur'),
});

const HeaderRight = ({setCount = () => {}, count = 0}) => {
  return (
    <Block>
      <Pressable style={styles.headerRight} onPress={setCount}>
        <Text ml={10}>Count: {count}</Text>
      </Pressable>
    </Block>
  );
};

const FormPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  // Page specific header options !
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight count={count} setCount={() => setCount(count + 1)} />
      ),
    });
  }, [navigation, count]);

  return (
    <AppScreen keyboardScroll>
      <Formik
        validationSchema={ExampleSchema}
        validateOnMount
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            console.log(values);
          }, 3000);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Block>
            <Row pt={10}>
              <Col col={12}>
                <AppInput
                  name="email"
                  animatedPlaceholder="Username"
                  value={values.email}
                  handleBlur={handleBlur('email')}
                  onChange={handleChange('email')}
                  errorMessage={errors.email && touched.email && errors.email}
                />
              </Col>
            </Row>

            <Row pt={10}>
              <Col col={12}>
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
              </Col>
            </Row>

            <Row pt={10}>
              <Col col={12}>
                <AppButton
                  type="primary"
                  title="login"
                  onPress={(e: any) => handleSubmit(e)}
                  disabled={loading || errors.email || errors.password}
                  loading={loading}
                />
              </Col>
            </Row>
          </Block>
        )}
      </Formik>
    </AppScreen>
  );
};

export default FormPage;

const styles = StyleSheet.create({
  headerRight: {
    padding: 16,
  },
});
