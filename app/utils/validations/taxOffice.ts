import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const taxOfficeValidation = (key = 'tax_office') => ({
  [key]: yup.string().required().label(t('labels.tax_office')),
});

export {taxOfficeValidation};
