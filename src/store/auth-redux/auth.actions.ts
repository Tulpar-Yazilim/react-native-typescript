import {actionTypes} from './auth.action-types';

export const actions = {
  login: (accessToken: string) => ({ type: actionTypes.Login, payload: {accessToken} }), // prettier-ignore
  setTest: (text: string) => ({type: actionTypes.Test, payload: text}),
};
