import * as yup from 'yup';

// Validation
const authorizedTitleValidation = (t, key = 'authorized_title') => ({
  [key]: yup.string().required().label(t('labels.authorized_title')),
});

export { authorizedTitleValidation };
