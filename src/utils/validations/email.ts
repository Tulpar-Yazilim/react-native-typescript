import * as yup from 'yup';

// Validation
const emailValidation = (t, key = 'email') => ({
  [key]: yup
    .string()
    .required(t('validations.email.required'))
    .email(t('validations.email.valid'))
    .label(t('labels.email')),
});

export {emailValidation};
