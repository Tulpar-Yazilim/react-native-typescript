import * as yup from 'yup';

// Validation
const districtValidation = (t, key = 'district_id') => ({
  [key]: yup.number().required().label(t('labels.district_id')),
});

export { districtValidation };
