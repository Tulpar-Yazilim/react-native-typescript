import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeEstimatedDeliveryDateValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'estimated_delivery_date') => ({
  [key]: yup.string().required().label(t('tradeDetail.estimatedDeliveryDate')),
});

export {tradeEstimatedDeliveryDateValidation};
