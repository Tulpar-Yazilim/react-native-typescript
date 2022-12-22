import * as yup from 'yup';

// Validation
const townValidation = (t, key = 'town_id') => ({
  [key]: yup.number().required().label(t('labels.town_id')),
});

export { townValidation };
