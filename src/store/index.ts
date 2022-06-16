import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

import * as authRedux from './auth';
import * as settingsRedux from './settings';

export {authRedux, settingsRedux};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const rootReducer = combineReducers({
  auth: authRedux.reducer.reducer,
  settings: settingsRedux.reducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

function* rootSaga() {
  yield all([authRedux.saga.saga(), settingsRedux.saga.saga()]);
}

sagaMiddleware.run(rootSaga);
