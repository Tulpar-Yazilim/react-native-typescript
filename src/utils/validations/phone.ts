import * as yup from 'yup';
// Constants
// const min = 11;
const max = 15;

// Validation
const phoneValidation = (t, key = 'phone') => ({
  [key]: yup
    .string()
    .required()
    .max(max)
    .label(t('labels.phone'))
    .test('phone', t('validations.phone.valid'), (value) => {
      const phoneRegex = /^(\+91-|\+91|0)?\d{11}$/;
      const isValidPhone = phoneRegex.test(value);
      if (!isValidPhone) return false;
      return true;
    }),
});

export { phoneValidation };
