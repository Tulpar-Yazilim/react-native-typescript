import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeConditionsValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'conditions') => ({
  [key]: yup.boolean().oneOf([true], t('tradeDetail.conditions').toString()).label(t('tradeDetail.conditions')),
});

export {tradeConditionsValidation};
