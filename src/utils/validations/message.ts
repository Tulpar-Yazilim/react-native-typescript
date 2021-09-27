import * as yup from 'yup';
// Constants
const min = 20;

// Validation
const messageValidation = (t, key = 'message') => ({
  [key]: yup.string().required().label(t('common.message')).min(min),
});

export { messageValidation };
