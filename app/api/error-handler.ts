import {authRedux} from '@/store';
import {Middleware, isRejectedWithValue} from '@reduxjs/toolkit';

export const rtkQueryErrorHandler: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      console.warn('API Query Error: ', action);
      if (action.payload.status === 401) {
        dispatch(authRedux.logout());
      }
    }
    return next(action);
  };
