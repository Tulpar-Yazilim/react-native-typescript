import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const authorizedTitleValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'authorized_title') => ({
  [key]: yup.string().required().label(t('labels.authorized_title')),
});

export {authorizedTitleValidation};
