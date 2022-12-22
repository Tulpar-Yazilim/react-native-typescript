import * as yup from 'yup';

// Validation
const tradeCargoValidation = (t, key = 'cargo_size_id') => ({
  [key]: yup.string().required().label(t('tradeDetail.cargo_size_id')),
});

export { tradeCargoValidation };
