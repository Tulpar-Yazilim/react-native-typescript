import {config} from '@/config';
import {settingsRedux} from '@/store';
import {
  Middleware,
  isFulfilled,
  isPending,
  isRejected,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

export const rtkQueryLoaderHandler: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (config.USE_APP_LOADER && isPending(action)) {
      dispatch(settingsRedux.changeLoadingState(true));
      console.info('rtkQueryLoaderHandler loading start: ', action);
    }

    if (
      config.USE_APP_LOADER &&
      (isFulfilled(action) || isRejected(action) || isRejectedWithValue(action))
    ) {
      dispatch(settingsRedux.changeLoadingState(false));
      console.info('rtkQueryLoaderHandler loading end: ', action);
    }

    return next(action);
  };
