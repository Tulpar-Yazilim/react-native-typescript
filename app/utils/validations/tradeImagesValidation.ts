import * as yup from 'yup';

// Validation
const tradeImagesValidation = (t, key = 'images') => ({
  [key]: yup.array().min(1).max(4).label(t('labels.images')),
});

export { tradeImagesValidation };
