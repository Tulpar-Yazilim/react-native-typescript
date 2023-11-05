import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const cityValidation = (key = 'city_id') => ({
  [key]: yup.number().required().label(t('labels.city_id')),
});

export {cityValidation};
