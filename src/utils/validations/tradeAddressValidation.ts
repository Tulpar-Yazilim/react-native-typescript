import * as yup from 'yup';

// Validation
const tradeAddressValidation = (t, key = 'address_ids') => ({
  [key]: yup.array().min(1).label(t('tradeDetail.address')),
});

export { tradeAddressValidation };
