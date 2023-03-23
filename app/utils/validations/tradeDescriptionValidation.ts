import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeDescriptionValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'description') => ({
  [key]: yup.string().required().min(50).label(t('common.description')),
});

export {tradeDescriptionValidation};
