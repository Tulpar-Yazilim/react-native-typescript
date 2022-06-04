import {combineReducers, applyMiddleware, createStore} from 'redux';
import {settingsReducer} from './reducers/settingsReducer';

import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
