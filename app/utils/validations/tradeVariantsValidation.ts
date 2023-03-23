import * as yup from 'yup';
import {TFunction} from 'i18next';
import _ from 'lodash';
import {tradeDeliverValidation} from './tradeDeliverValidation';
import {tradeVariantSubValidation} from './tradeVariantSubValidation';

// Validation
const tradeVariantsValidation = (t: TFunction<'translation', undefined, 'translation'>, key = 'variants', variants: any = {}) => {
  let extraValidation = {};

  extraValidation = _.assign(extraValidation, tradeDeliverValidation(t));

  _.forEach(_.keys(variants), (o: any) => {
    const {pivot = {}, title = ''} = variants[o] || {};

    if (pivot?.is_required === '1') {
      extraValidation = _.assign(extraValidation, tradeVariantSubValidation(t, o, title));
    }
  });

  return {
    [key]: yup.object().shape({...extraValidation}),
  };
};

export {tradeVariantsValidation};
