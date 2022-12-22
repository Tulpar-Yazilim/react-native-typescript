import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore} from 'redux-persist';

import * as authRedux from './auth';
import * as settingsRedux from './settings';

export {authRedux, settingsRedux};

export const rootReducer = combineReducers({
  auth: authRedux.reducer.reducer,
  settings: settingsRedux.reducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
