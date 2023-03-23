import * as yup from 'yup';
import {TFunction} from 'i18next';

// Constants
const min = 11;
const max = 11;

// Validation
const phoneValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'phone') => ({
  [key]: yup
    .string()
    .required(t('validations.phone.required').toString())
    .min(min, t('validations.phone.min', {min}).toString())
    .max(max, t('validations.phone.max', {max}).toString())
    .label(t('labels.phone'))
    .test('phone', t('validations.phone.valid').toString(), value => {
      const phoneRegex = /^(\+91-|\+91|0)?\d{11}$/;
      const isValidPhone = phoneRegex.test(value || '');
      if (!isValidPhone) {
        return false;
      }
      return true;
    }),
});

export {phoneValidation};
