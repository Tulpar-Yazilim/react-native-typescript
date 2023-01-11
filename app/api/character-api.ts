import {baseApi as api} from './base-api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getCharacters: build.query({
      query: (page = 1, count = 10) => `character/?page=${page}&count=${count}`,
    }),
  }),
});

export const {useGetCharactersQuery} = injectedRtkApi;
