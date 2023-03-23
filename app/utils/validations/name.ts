import * as yup from 'yup';
import {TFunction} from 'i18next';

// Constants
const min = 3;

// Validation
const nameValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'name') => ({
  [key]: yup.string().required().label(t('labels.name_surname')).min(min),
});

const nameSurnameValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'name_surname') => ({
  [key]: yup.string().required().label(t('labels.name_surname')).min(min),
});

export {nameValidation, nameSurnameValidation};
