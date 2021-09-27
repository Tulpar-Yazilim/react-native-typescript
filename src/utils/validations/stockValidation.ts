import * as yup from 'yup';

// Validation
const stockValidation = (t, key = 'stock') => ({
  [key]: yup.string().required().label(t('tradeDetail.productAmount')),
});

export { stockValidation };
