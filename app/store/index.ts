import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import EncryptedStorage from 'react-native-encrypted-storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import {baseApi, rtkQueryErrorHandler, rtkQueryLoaderHandler} from '@/api';

import * as authRedux from './auth';
import * as settingsRedux from './settings';

export {authRedux, settingsRedux};

const rootPersistConfig = {
  key: 'root',
  version: 1,
  blacklist: [baseApi.reducerPath],
  storage: EncryptedStorage,
};

const settingsPersistConfig = {
  key: 'settings',
  version: 1,
  blacklist: ['appLoader'],
  storage: EncryptedStorage,
};

export const rootReducer = combineReducers({
  auth: authRedux.default,
  settings: persistReducer(settingsPersistConfig, settingsRedux.default),
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(baseApi.middleware, rtkQueryErrorHandler, rtkQueryLoaderHandler),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
