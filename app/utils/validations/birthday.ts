import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const birthdayValidation = (key = 'birthday') => ({
  [key]: yup.string().required().label(t('labels.birthday')),
});

export {birthdayValidation};
