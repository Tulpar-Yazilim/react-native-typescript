import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const priceValidation = (key = 'price') => ({
  [key]: yup.number().positive().min(1).label(t('common.price')),
});

export {priceValidation};
