import * as yup from 'yup';
import {TFunction} from 'i18next';

const max = 15;
// Validation
const landPhoneValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'land_phone') => ({
  [key]: yup
    .string()
    .required()
    .max(max)
    .label(t('labels.land_phone'))
    .test('phone', t('validations.phone.valid').toString(), value => {
      const phoneRegex = /^(\+91-|\+91|0)?\d{11}$/;
      const isValidPhone = phoneRegex.test(value || '');
      if (!isValidPhone) return false;
      return true;
    }),
});

export {landPhoneValidation};
