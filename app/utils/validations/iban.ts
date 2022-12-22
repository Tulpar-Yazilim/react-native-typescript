import * as yup from 'yup';

const min = 26;
const max = 26;

// Validation
const ibanValidation = (t, key = 'iban') => ({
  [key]: yup
    .string()
    .required(t('validations.iban.required'))
    .min(min, t('validations.iban.min', {min}))
    .max(max, t('validations.iban.max', {max}))
    .label(t('labels.phone'))
    .test('iban', t('validations.iban.valid'), value => {
      const ibanRegex =
        /TR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?/;
      return ibanRegex.test(value);
    }),
});

export {ibanValidation};
