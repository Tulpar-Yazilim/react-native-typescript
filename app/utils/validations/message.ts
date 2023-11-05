import {t} from 'i18next';
import * as yup from 'yup';
// Constants
const min = 20;

// Validation
const messageValidation = (key = 'message') => ({
  [key]: yup.string().required().label(t('common.message')).min(min),
});

export {messageValidation};
