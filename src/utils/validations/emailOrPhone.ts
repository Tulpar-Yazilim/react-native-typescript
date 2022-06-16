import * as yup from 'yup';
// Constants
// const min = 6;

// Validation
const emailOrPhoneValidation = (t, key = 'email') => ({
  [key]: yup
    .string()
    .required()
    .test('emailOrPhone', t('validations.email_or_phone.valid'), value => {
      const emailRegex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
      const isValidEmail = emailRegex.test(value);
      const isValidPhone = phoneRegex.test(value);
      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    })
    .label(t('labels.email_or_phone')),
});

export {emailOrPhoneValidation};
