import {store} from '../index';
import * as actionTypes from '../action-types';
import {i18next} from '@lang';

export const changeLanguage = (lang: string) => {
  i18next.changeLanguage(lang);
  store.dispatch({
    type: actionTypes.CHANGE_APP_LANGUAGE,
    payload: lang,
  });
};

export const changeLoadingState = (payload: boolean) => {
  store.dispatch({
    type: actionTypes.CHANGE_APP_LOADER,
    payload,
  });
};
