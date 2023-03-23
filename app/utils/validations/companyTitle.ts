import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const companyTitleValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'company_title_id') => ({
  [key]: yup.string().required().label(t('labels.company_title_id')),
});

export {companyTitleValidation};
