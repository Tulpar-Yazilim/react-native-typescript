import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';
import * as authRedux from './auth-redux';
import * as settingsRedux from './setting-redux';

export const rootReducer = combineReducers<any>({
  auth: authRedux.reducer.reducer,
  settings: settingsRedux.reducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([]);
}
