import * as yup from 'yup';

// Validation
const tradeEstimatedDeliveryDateValidation = (t, key = 'estimated_delivery_date') => ({
  [key]: yup.string().required().label(t('tradeDetail.estimatedDeliveryDate')),
});

export { tradeEstimatedDeliveryDateValidation };
