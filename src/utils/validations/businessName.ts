import * as yup from 'yup';

// Validation
const businessNameValidation = (t, key = 'business_name') => ({
  [key]: yup.string().required().label(t('labels.business_name')),
});

export { businessNameValidation };
