import {combineReducers, applyMiddleware, createStore} from 'redux';
import {authReducer} from './reducers/authReducer';
import {settingReducer} from './reducers/settingReducer';

import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  authReducer,
  settingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
