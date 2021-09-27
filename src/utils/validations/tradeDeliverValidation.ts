import * as yup from 'yup';

// Validation
const tradeDeliverValidation = (t, key = 'delivery_method_id') => ({
  [key]: yup.array().min(1).label(t('labels.delivery_method_id')),
});

export { tradeDeliverValidation };
