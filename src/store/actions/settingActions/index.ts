import {store} from '../../index';
import * as actionTypes from '../actionTypes';

const changeLanguage = (lang: string) => {
  store.dispatch({
    type: actionTypes.LANGUAGE_CHANGE,
    payload: lang,
  });
};

export default {changeLanguage};
