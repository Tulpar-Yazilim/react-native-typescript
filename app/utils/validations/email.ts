import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const emailValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'email') => ({
  [key]: yup.string().required(t('validations.email.required').toString()).email(t('validations.email.valid').toString()).label(t('labels.email')),
});

export {emailValidation};
