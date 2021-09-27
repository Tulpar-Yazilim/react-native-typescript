import * as yup from 'yup';

// Validation
const tradeBarterRateValidation = (t, min = 0, category, key = 'barter_rate') => ({
  barter: yup.object().shape({
    price: yup.number().positive().min(1).label(t('common.price')),
    [key]: yup
      .number()
      .required()
      .min(
        min,
        `${category} kategorisi için minimum takas oranı ${min} olarak belirlenmiştir. Lütfen takas oranını değiştirin.`,
      )
      .label(t('common.barter_rate')),
  }),
});

export { tradeBarterRateValidation };
