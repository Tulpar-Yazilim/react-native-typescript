import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeImagesValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'images') => ({
  [key]: yup.array().min(1).max(4).label(t('labels.images')),
});

export {tradeImagesValidation};
