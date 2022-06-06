import {actionTypes} from './settings.action-types';

export const changeLanguage = (lang:string) => ({ type: actionTypes.ChangeLanguage, payload:lang }); // prettier-ignore
