import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';
import {rootReducer, rootSaga} from './RootReducer';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
}) as any;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
