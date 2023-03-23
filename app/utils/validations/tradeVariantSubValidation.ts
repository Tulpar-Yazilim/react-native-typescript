import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeVariantSubValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'title', label = '') => ({
  [key]: yup.string().required().label(label),
});

export {tradeVariantSubValidation};
