import * as yup from 'yup';
// Constants
const min = 3;

// Validation
const nameValidation = (t, key = 'name') => ({
  [key]: yup.string().required().label(t('labels.name_surname')).min(min),
});

const nameSurnameValidation = (t, key = 'name_surname') => ({
  [key]: yup.string().required().label(t('labels.name_surname')).min(min),
});

export { nameValidation, nameSurnameValidation };
