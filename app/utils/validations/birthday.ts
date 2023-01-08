import * as yup from 'yup';

// Validation
const birthdayValidation = (t, key = 'birthday') => ({
  [key]: yup.string().required().label(t('labels.birthday')),
});

export { birthdayValidation };
