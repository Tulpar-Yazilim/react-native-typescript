import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const authorizedTitleValidation = (key = 'authorized_title') => ({
  [key]: yup.string().required().label(t('labels.authorized_title')),
});

export {authorizedTitleValidation};
