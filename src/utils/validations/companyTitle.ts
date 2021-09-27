import * as yup from 'yup';

// Validation
const companyTitleValidation = (t, key = 'company_title_id') => ({
  [key]: yup.string().required().label(t('labels.company_title_id')),
});

export { companyTitleValidation };
