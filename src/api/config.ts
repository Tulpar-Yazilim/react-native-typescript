import {AxiosRequestConfig} from 'axios';

const ApiVersion = 'api/';
export const baseURL = `https://api-url.com/${ApiVersion}`;
export const Crypto = false;

const multiForm: AxiosRequestConfig = {
  headers: {'Content-Type': 'multipart/formdata'},
};

export {multiForm};
