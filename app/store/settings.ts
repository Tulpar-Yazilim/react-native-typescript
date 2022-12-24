import {createSlice} from '@reduxjs/toolkit';
import {i18next} from '@lang';

interface ISettingsState {
  language: string;
  appLoader: boolean;
}

const initialState: ISettingsState = {
  language: 'tr',
  appLoader: false,
};

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      i18next.changeLanguage(action.payload);
      state.language = action.payload;
    },
    changeLoadingState: (state, action) => {
      state.appLoader = action.payload;
    },
  },
});

const {actions, reducer} = settingsSlice;
export const {changeLanguage, changeLoadingState} = actions;

export default reducer;
