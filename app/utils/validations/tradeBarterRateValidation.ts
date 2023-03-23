import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeBarterRateValidation = (t: TFunction<'translation', undefined, 'translation'>, min: number, category: string, key = 'barter_rate') => ({
  barter: yup.object().shape({
    price: yup.number().positive().min(1).label(t('common.price')),
    [key]: yup.number().required().min(min, `${category} kategorisi için minimum takas oranı ${min} olarak belirlenmiştir. Lütfen takas oranını değiştirin.`).label(t('common.barter_rate')),
  }),
});

export {tradeBarterRateValidation};
