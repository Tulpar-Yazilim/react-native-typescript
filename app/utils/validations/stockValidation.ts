import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const stockValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'stock') => ({
  [key]: yup.string().required().label(t('tradeDetail.productAmount')),
});

export {stockValidation};
