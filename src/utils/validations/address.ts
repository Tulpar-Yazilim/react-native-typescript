import * as yup from 'yup';

// Validation
const addressDetailValidation = (t, key = 'address_detail') => ({
  [key]: yup.string().required().label(t('labels.address_detail')),
});

const fullAddressValidation = (t, key = 'full_address') => ({
  [key]: yup.string().required().label(t('labels.full_address')),
});

const addressTitleValidation = (t, key = 'name') => ({
  [key]: yup.string().required().label(t('labels.adress_title')),
});

const addressBuildNo = (t, key = 'build_no') => ({
  [key]: yup.string().required().label(t('labels.build_no')),
});

const addressAptNo = (t, key = 'apt_no') => ({
  [key]: yup.string().required().label(t('labels.apt_no')),
});

export {
  addressDetailValidation,
  addressTitleValidation,
  addressBuildNo,
  addressAptNo,
  fullAddressValidation,
};
