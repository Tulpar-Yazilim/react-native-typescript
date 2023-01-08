import * as yup from 'yup';

// Validation
const priceValidation = (t, key = 'price') => ({
  [key]: yup.number().positive().min(1).label(t('common.price')),
});

export { priceValidation };
