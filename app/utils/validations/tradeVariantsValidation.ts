import * as yup from 'yup';
import _ from 'lodash';
import { tradeDeliverValidation } from './tradeDeliverValidation';
import { tradeVariantSubValidation } from './tradeVariantSubValidation';

// Validation
const tradeVariantsValidation = (t, key = 'variants', variants = {}) => {
  let extraValidation = {};

  extraValidation = _.assign(extraValidation, tradeDeliverValidation(t));

  _.forEach(_.keys(variants), (o) => {
    const { pivot = {}, title = '' } = variants[o] || {};

    if (pivot?.is_required === '1') {
      extraValidation = _.assign(extraValidation, tradeVariantSubValidation(t, o, title));
    }
  });

  return {
    [key]: yup.object().shape({ ...extraValidation }),
  };
};

export { tradeVariantsValidation };
