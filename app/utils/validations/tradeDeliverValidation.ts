import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeDeliverValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'delivery_method_id') => ({
  [key]: yup.array().min(1).label(t('labels.delivery_method_id')),
});

export {tradeDeliverValidation};
