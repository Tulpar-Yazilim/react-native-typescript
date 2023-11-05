import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const emailValidation = (key = 'email') => ({
  [key]: yup.string().required(t('validations.email.required').toString()).email(t('validations.email.valid').toString()).label(t('labels.email')),
});

export {emailValidation};
