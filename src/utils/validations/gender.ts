import * as yup from 'yup';
// Constants

// Validation
const genderValidation = (t, key = 'gender') => ({
  [key]: yup.string().required().label(t('labels.gender')),
});

export { genderValidation };
