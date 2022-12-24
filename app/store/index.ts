import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import EncryptedStorage from 'react-native-encrypted-storage';

import {setupListeners} from '@reduxjs/toolkit/dist/query';

import * as authRedux from './auth';
import * as settingsRedux from './settings';

import {characterApi} from '../api/character-api';

export {authRedux, settingsRedux};

const persistConfig = {
  key: 'root',
  version: 1,
  storage: EncryptedStorage,
};

export const rootReducer = combineReducers({
  auth: authRedux.default,
  settings: settingsRedux.default,
  [characterApi.reducerPath]: characterApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(characterApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;