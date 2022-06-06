import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import {ApiResult} from './api-result';
import {baseURL} from './config';
import {getUser} from '@utils';

// Config
const config: AxiosRequestConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

// Instance
const axiosInstance = axios.create(config);

//  Interceptor Request
axiosInstance.interceptors.request.use(async requestConfig => {
  const headers: AxiosRequestHeaders = {};
  const user = await getUser();
  if (user && user?.access_token) {
    headers.Authorization = `Bearer ${user?.access_token}`;
  }

  requestConfig.headers = {...requestConfig.headers, ...headers};
  return requestConfig;
});

// on Ful Filled
const onFulFilled = async (response: AxiosResponse) => {
  return response;
};

// on Rejected
const onRejected = async (error: AxiosError) => {
  console.warn('onRejected', error.code);
  const apiResult: ApiResult<any> = {
    message: error?.message,
    isSuccess: false,
    data: null,
  };
  return apiResult;
};

//  Interceptor response
axiosInstance.interceptors.response.use(onFulFilled, onRejected);

export default axiosInstance;

//export default function setupAxios(axios: any, store: any) {
//  axios.defaults.headers.Accept = 'application/json';
//  axios.defaults.baseURL = 'https://localhost:3000/';
//
//  axios.interceptors.request.use(
//    (config: any) => {
//      const {
//        auth: {accessToken},
//      } = store.getState();
//
//      if (accessToken) {
//        config.headers.Authorization = accessToken;
//      }
//
//      return config;
//    },
//    (err: any) => {
//      console.log(err);
//    },
//  );
//  axios.interceptors.response.use(
//    (response: any) => {
//      return response;
//    },
//    (err: any) => {
//      return err.response;
//    },
//  );
//}
//
