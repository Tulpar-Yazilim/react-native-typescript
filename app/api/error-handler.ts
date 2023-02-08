import {isRejectedWithValue, Middleware} from '@reduxjs/toolkit';

import * as RootNavigation from '@/navigation/RootNavigation';
import Routes from '@/navigation/Routes';
import {authRedux} from '@/store';

export const rtkQueryErrorHandler: Middleware =
    ({dispatch}) =>
    next =>
    action => {
        if (isRejectedWithValue(action)) {
            if (action.payload.status === 401) {
                dispatch(authRedux.logout());
                if (RootNavigation.navigationRef?.getCurrentRoute()?.name !== Routes.LOGIN_SCREEN) {
                    RootNavigation.replace(Routes.LOGIN_SCREEN as never);
                }
            }
        }
        return next(action);
    };
