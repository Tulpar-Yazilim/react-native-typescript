import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const businessNameValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'business_name') => ({
  [key]: yup.string().required().label(t('labels.business_name')),
});

export {businessNameValidation};
