import {actionTypes} from '@actions';

const initialState = {
  isLoggedIn: false,
  language: 'en',
};

export const authReducer = (state = initialState, action: {type: any}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};
