import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const townValidation = (key = 'town_id') => ({
  [key]: yup.number().required().label(t('labels.town_id')),
});

export {townValidation};
