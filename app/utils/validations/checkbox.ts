import {t} from 'i18next';
import * as yup from 'yup';

// Validation
const checkBoxValidations = (key: string) => ({
  [key]: yup
    .boolean()
    .oneOf([true], t(`labels.${key}`).toString())
    .label(t(`labels.${key}`)),
});

export {checkBoxValidations};
