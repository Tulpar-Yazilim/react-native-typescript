import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeAddressValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'address_ids') => ({
  [key]: yup.array().min(1).label(t('tradeDetail.address')),
});

export {tradeAddressValidation};
