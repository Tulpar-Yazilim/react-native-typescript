import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const stockValidation = (key = 'stock') => ({
  [key]: yup.string().required().label(t('tradeDetail.productAmount')),
});

export {stockValidation};
