import {AxiosRequestConfig} from 'axios';

const multiForm: AxiosRequestConfig = {
  headers: {'Content-Type': 'multipart/formdata'},
};

export {multiForm};
