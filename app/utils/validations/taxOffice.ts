import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const taxOfficeValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'tax_office') => ({
  [key]: yup.string().required().label(t('labels.tax_office')),
});

export {taxOfficeValidation};
