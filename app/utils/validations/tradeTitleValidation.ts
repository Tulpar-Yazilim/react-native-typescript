import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const tradeTitleValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'title') => ({
  [key]: yup.string().required().min(10).label(t('common.title')),
});

export {tradeTitleValidation};
