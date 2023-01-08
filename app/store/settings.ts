import {createSlice} from '@reduxjs/toolkit';
import {i18next} from '@lang';

interface ISettingsState {
  language: string;
  appLoader: boolean;
  theme: 'light' | 'dark';
}

const initialState: ISettingsState = {
  language: 'tr',
  appLoader: false,
  theme: 'light',
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
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

const {actions, reducer} = settingsSlice;
export const {changeLanguage, changeLoadingState, setTheme} = actions;

export default reducer;
