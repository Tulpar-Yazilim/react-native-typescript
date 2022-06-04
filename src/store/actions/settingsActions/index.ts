import {store} from '../../index';
import * as actionTypes from '../actionTypes';

const changeUser = (user: any) => {
  store.dispatch({
    type: actionTypes.USER_CHANGE,
    payload: user,
  });
};

const changeLanguage = (lang: string) => {
  store.dispatch({
    type: actionTypes.LANGUAGE_CHANGE,
    payload: lang,
  });
};

export default {
  changeUser,
  changeLanguage,
};
