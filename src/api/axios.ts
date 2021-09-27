import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResult } from "./api-result";
import { decrypt } from "./crypto-service";

export const ApiVersion = "api/";
export const baseURL = `https://api-url.com/${ApiVersion}`;
export const Crypto = true;

// Config
const config: AxiosRequestConfig = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

// Instance
const axiosInstance = axios.create(config);

//  Interceptor Request
axiosInstance.interceptors.request.use(async (requestConfig) => {
  const token = "[USER_TOKEN]";
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});

// on Ful Filled
const onFulFilled = async (response: AxiosResponse) => {
  const apiResult = new ApiResult(
    response.data?.message,
    response.data?.isSuccess,
    Crypto ? decrypt(response.data.data) : response.data.data
  );

  return apiResult;
};

// on Rejected
const onRejected = async (error: AxiosError) => {
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
