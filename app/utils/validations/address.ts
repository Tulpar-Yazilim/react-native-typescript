import {TFunction} from 'i18next';
import * as yup from 'yup';

// Validation
const addressDetailValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'address_detail') => ({
  [key]: yup.string().required().label(t('labels.address_detail')),
});

const fullAddressValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'full_address') => ({
  [key]: yup.string().required().label(t('labels.full_address')),
});

const addressTitleValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'name') => ({
  [key]: yup.string().required().label(t('labels.adress_title')),
});

const addressBuildNo = (t: TFunction<'translation', undefined, 'translation'>, key = 'build_no') => ({
  [key]: yup.string().required().label(t('labels.build_no')),
});

const addressAptNo = (t: TFunction<'translation', undefined, 'translation'>, key = 'apt_no') => ({
  [key]: yup.string().required().label(t('labels.apt_no')),
});

export {addressDetailValidation, addressTitleValidation, addressBuildNo, addressAptNo, fullAddressValidation};
