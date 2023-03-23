import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const townValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'town_id') => ({
  [key]: yup.number().required().label(t('labels.town_id')),
});

export {townValidation};
