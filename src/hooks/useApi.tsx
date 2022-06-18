import {useState} from 'react';
import {AxiosResponse} from 'axios';
import {ApiResult} from '../api/api-result';
import {settingsRedux} from '@store';

interface IConfig {
  useAppLoader: boolean;
}

const useApi = (
  apiFunc: {(): Promise<AxiosResponse>; (arg0: any): any},
  config?: IConfig,
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]): Promise<ApiResult<any>> => {
    setLoading(true);

    config?.useAppLoader && settingsRedux.actions.changeLoadingState(true);

    const response = await apiFunc(args);
    setError(!response?.status);
    if (response?.status !== 200) {
      console.info(response?.data?.message);
    }
    setData(response?.data);
    setLoading(false);

    config?.useAppLoader && settingsRedux.actions.changeLoadingState(false);

    const result: ApiResult<any> = {
      isSuccess: response?.status === 200,
      message: response?.data?.message,
      data: response?.data,
    };
    return result;
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
