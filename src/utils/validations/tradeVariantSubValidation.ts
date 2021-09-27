import * as yup from 'yup';

// Validation
const tradeVariantSubValidation = (t, key = 'title', label) => ({
  [key]: yup.string().required().label(label),
});

export { tradeVariantSubValidation };
