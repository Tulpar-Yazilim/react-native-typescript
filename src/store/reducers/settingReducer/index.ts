import {actionTypes} from '@actions';

const initialState = {
  language: 'en',
  darkmode: false,
};

export const settingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LANGUAGE_CHANGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};
