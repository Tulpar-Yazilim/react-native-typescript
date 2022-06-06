import {persistReducer} from 'redux-persist';
import Async from '@react-native-async-storage/async-storage';
import {actionTypes} from './auth.action-types';
import {ActionWithPayload} from '../redux-helper';
import {AuthState} from './auth.state';
import {AnyAction, Reducer} from 'redux';

export const reducer = persistReducer<Reducer<any, AnyAction>>(
  {
    storage: Async,
    key: 'user',
    whitelist: ['user', 'accessToken', 'userProfile'],
  },
  (state: any = AuthState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.token;
        return {accessToken};
      }
      case actionTypes.Test: {
        return {...AuthState, test: action.payload};
      }
      default:
        return state;
    }
  },
);
