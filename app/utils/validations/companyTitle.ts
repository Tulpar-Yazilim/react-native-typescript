import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const companyTitleValidation = (key = 'company_title_id') => ({
  [key]: yup.string().required().label(t('labels.company_title_id')),
});

export {companyTitleValidation};
