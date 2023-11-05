import {t} from 'i18next';
import * as yup from 'yup';

// Constants

// Validation
const genderValidation = (key = 'gender') => ({
  [key]: yup.string().required().label(t('labels.gender')),
});

export {genderValidation};
