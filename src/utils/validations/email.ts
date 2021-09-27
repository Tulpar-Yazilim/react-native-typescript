import * as yup from 'yup';
// Constants
// const min = 11;

// Validation
const emailValidation = (t, key = 'email') => ({ [key]: yup.string().required().email().label(t('labels.email')) });

export { emailValidation };
