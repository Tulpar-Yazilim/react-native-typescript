import {createSlice} from '@reduxjs/toolkit';

export interface IAuthState {
  user?: any;
  token?: string;
}

export const initialState: IAuthState = {
  user: null,
  token: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = '';
    },
  },
});

const {actions, reducer} = authSlice;
export const {login, logout} = actions;

export default reducer;
