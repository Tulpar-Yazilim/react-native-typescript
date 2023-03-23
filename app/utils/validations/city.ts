import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const cityValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'city_id') => ({
  [key]: yup.number().required().label(t('labels.city_id')),
});

export {cityValidation};
