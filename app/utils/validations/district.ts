import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const districtValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'district_id') => ({
  [key]: yup.number().required().label(t('labels.district_id')),
});

export {districtValidation};
