import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const districtValidation = (key = 'district_id') => ({
  [key]: yup.number().required().label(t('labels.district_id')),
});

export {districtValidation};
