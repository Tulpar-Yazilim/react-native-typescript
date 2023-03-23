import {isFulfilled, isPending, isRejected, isRejectedWithValue, Middleware} from '@reduxjs/toolkit';

import {config} from '@/config';
import {settingsRedux} from '@/store';

export const rtkQueryLoaderHandler: Middleware =
  ({dispatch, getState}) =>
  next =>
  action => {
    if (config.USE_APP_LOADER && isPending(action)) {
      dispatch(settingsRedux.changeLoadingState(true));
    }

    if ((config.USE_APP_LOADER || getState().settings.appLoader) && (isFulfilled(action) || isRejected(action) || isRejectedWithValue(action))) {
      dispatch(settingsRedux.changeLoadingState(false));
    }

    return next(action);
  };
