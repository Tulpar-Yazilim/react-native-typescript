import {persistReducer} from 'redux-persist';
import Async from '@react-native-async-storage/async-storage';
import {actionTypes} from './settings.action-types';
import {ActionWithPayload} from '../redux-helper';
import {initialState} from './settings.state';

export const reducer = persistReducer(
  {
    storage: Async,
    key: 'settings',
    whitelist: [],
  },
  (state: any = initialState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.ChangeLanguage: {
        return {...initialState, language: action.payload};
      }
      default:
        return state;
    }
  },
);
