import {CommonActions} from '@react-navigation/native';
import {isRejectedWithValue, Middleware} from '@reduxjs/toolkit';

import {rootNavigationRef, Routes} from '@/navigation';
import {authRedux} from '@/store';

export const rtkQueryErrorHandler: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        dispatch(authRedux.logout());
        if (rootNavigationRef?.getCurrentRoute()?.name !== Routes.LOGIN_SCREEN) {
          rootNavigationRef.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: Routes.LOGIN_SCREEN,
                },
              ],
            }),
          );
        }
      }
    }
    return next(action);
  };
