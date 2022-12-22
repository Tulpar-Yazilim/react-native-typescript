import * as yup from 'yup';

// Validation
const tradeTitleValidation = (t, key = 'title') => ({
  [key]: yup.string().required().min(10).label(t('common.title')),
});

export { tradeTitleValidation };
