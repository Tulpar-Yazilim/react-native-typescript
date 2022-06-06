import {persistReducer} from 'redux-persist';
import {ActionWithPayload} from '../redux-helper';
import * as actionTypes from '../action-types';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface IAuthState {
  user?: any;
  token?: string;
}

export const initialState: IAuthState = {
  user: '',
  token: '',
};

export const reducer = persistReducer(
  {
    storage: EncryptedStorage,
    key: 'settings',
    whitelist: ['language'],
  },
  (state: IAuthState = initialState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.LOGIN_USER: {
        return {...initialState, token: action.payload};
      }
      default:
        return state;
    }
  },
);
