import * as yup from 'yup';
import {TFunction} from 'i18next';

// Constants

// Validation
const genderValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'gender') => ({
  [key]: yup.string().required().label(t('labels.gender')),
});

export {genderValidation};
