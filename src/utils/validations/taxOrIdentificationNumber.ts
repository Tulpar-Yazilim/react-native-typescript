import * as yup from 'yup';

const min = 11;
const max = 11;
// Validation
const taxOrIdentificationNumberValidation = (t, key = 'tax_or_identification_number') => ({
  [key]: yup.number().required().positive().integer().required().label(t('labels.tax_or_identification_number')),
});

export { taxOrIdentificationNumberValidation };
