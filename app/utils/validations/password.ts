import {TFunction} from 'i18next';
import * as yup from 'yup';

// Constants
const min = 6;

// Ardışık arka arkaya 3 adet sayı girilemez.
// En az altı karakterden oluşmalı.
// En az bir büyük harf içermeli.
// En az bir özel karakter içermeli (-?.*-+!+&/ vb)
// En az bir sayı içermelidir.

// Validation
const passwordValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'password') => ({
  [key]: yup
    .string()
    .required()
    .min(min)
    .test('passwordStrong', t('validations.password').toString(), value => {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]');
      const isValid = regex.test(value || '');
      if (!isValid) {
        return false;
      }
      return true;
    })
    .label(t('labels.password')),
});

// Validation
const passwordConfirmationValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'password_confirmation', ref = 'password') => ({
  [key]: yup
    .string()
    .required()
    .oneOf([yup.ref(ref), ''], t('validations.password.not_match').toString())
    .label(t('labels.password')),
});

export {passwordValidation, passwordConfirmationValidation};
