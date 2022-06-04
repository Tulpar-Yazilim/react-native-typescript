import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  language: 'tr',
  darkMode: false,
  user: null,
};

export const settingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.USER_CHANGE:
      return {
        ...state,
        user: action.payload,
      };

    case actionTypes.LANGUAGE_CHANGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};
