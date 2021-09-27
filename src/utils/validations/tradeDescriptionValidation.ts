import * as yup from 'yup';

// Validation
const tradeDescriptionValidation = (t, key = 'description') => ({
  [key]: yup.string().required().min(50).label(t('common.description')),
});

export { tradeDescriptionValidation };
