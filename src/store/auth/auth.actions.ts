import * as actionTypes from '../action-types';

export const actions = {
  login: (accessToken: string) => ({
    type: actionTypes.LOGIN_USER,
    payload: accessToken,
  }),
};
