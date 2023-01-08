import * as yup from 'yup';

// Validation
const tradeConditionsValidation = (t, key = 'conditions') => ({
  [key]: yup.boolean().oneOf([true], t('tradeDetail.conditions')).label(t('tradeDetail.conditions')),
});

export { tradeConditionsValidation };
