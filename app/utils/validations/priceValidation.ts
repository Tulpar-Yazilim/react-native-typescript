import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const priceValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'price') => ({
  [key]: yup.number().positive().min(1).label(t('common.price')),
});

export {priceValidation};
