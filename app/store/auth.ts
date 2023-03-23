import {createSlice} from '@reduxjs/toolkit';

export interface IAuthState {
  user?: never;
  token?: string;
}

export const initialState: IAuthState = {
  user: undefined,
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
      state.user = undefined;
      state.token = '';
    },
  },
});

const {actions, reducer} = authSlice;
export const {login, logout} = actions;

export default reducer;
