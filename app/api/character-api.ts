import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {baseURL} from './config';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({baseUrl: baseURL}),
  endpoints: builder => ({
    getCharacters: builder.query({
      query: (page = 1, count = 10) => `character/?page=${page}&count=${count}`,
    }),
  }),
});

export const {useGetCharactersQuery} = characterApi;
