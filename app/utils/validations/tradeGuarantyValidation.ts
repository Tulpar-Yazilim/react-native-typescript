import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeGuarantyValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'guaranty') => ({
  [key]: yup.string().required().label(t('tradeDetail.guarantee')),
});

export {tradeGuarantyValidation};
