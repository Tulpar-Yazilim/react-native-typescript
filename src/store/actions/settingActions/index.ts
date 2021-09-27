import {store} from '@store';
import {actionTypes} from '@actions';

const changeLanguage = (lang: string) => {
  store.dispatch({
    type: actionTypes.LANGUAGE_CHANGE,
    payload: lang,
  });
};

export default {changeLanguage};
