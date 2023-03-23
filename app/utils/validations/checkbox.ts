import * as yup from 'yup';
import {TFunction} from 'i18next';

// Validation
const checkBoxValidations = (t: TFunction<'translation', undefined, 'translation'>, key: string) => ({
  [key]: yup
    .boolean()
    .oneOf([true], t(`labels.${key}`).toString())
    .label(t(`labels.${key}`)),
});

export {checkBoxValidations};
