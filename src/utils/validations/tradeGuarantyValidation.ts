import * as yup from 'yup';

// Validation
const tradeGuarantyValidation = (t, key = 'guaranty') => ({
  [key]: yup.string().required().label(t('tradeDetail.guarantee')),
});

export { tradeGuarantyValidation };
