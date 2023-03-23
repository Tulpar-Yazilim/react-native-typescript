import * as yup from 'yup';
import {TFunction} from 'i18next';

const min = 26;
const max = 26;

// Validation
const ibanValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'iban') => ({
  [key]: yup
    .string()
    .required(t('validations.iban.required').toString())
    .min(min, t('validations.iban.min', {min}).toString())
    .max(max, t('validations.iban.max', {max}).toString())
    .label(t('labels.phone'))
    .test('iban', t('validations.iban.valid').toString(), value => {
      const ibanRegex = /TR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?/;
      return ibanRegex.test(value || '');
    }),
});

export {ibanValidation};
