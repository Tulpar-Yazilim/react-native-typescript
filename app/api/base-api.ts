import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

import type {RootState} from '../store';

const baseURL = Config.API_URL;

const baseApi = createApi({
  reducerPath: 'baseApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        headers.set('Authorization', 'Bearer ' + token);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export {baseApi};
