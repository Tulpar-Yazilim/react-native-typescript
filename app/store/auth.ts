import {createSlice} from '@reduxjs/toolkit';

export interface IAuthState {
  user?: any;
  token?: string;
}

export const initialState: IAuthState = {
  user: '',
  token: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
  },
});

const {actions, reducer} = authSlice;
export const {login} = actions;

export default reducer;
