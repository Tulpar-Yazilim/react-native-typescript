import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeCargoValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'cargo_size_id') => ({
  [key]: yup.string().required().label(t('tradeDetail.cargo_size_id')),
});

export {tradeCargoValidation};
