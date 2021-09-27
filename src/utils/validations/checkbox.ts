import * as yup from 'yup';

// Validation
const checkBoxValidations = (key: string, t) => ({
  [key]: yup
    .boolean()
    .oneOf([true], t(`labels.${key}`))
    .label(t(`labels.${key}`)),
});

export { checkBoxValidations };
