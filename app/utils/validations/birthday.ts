import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const birthdayValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'birthday') => ({
  [key]: yup.string().required().label(t('labels.birthday')),
});

export {birthdayValidation};
