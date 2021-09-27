import {AxiosResponse} from 'axios';
import {useState} from 'react';

const useApi = (apiFunc: {
  (): Promise<AxiosResponse<any>>;
  (arg0: any): any;
}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    const response = await apiFunc(args);
    setError(!response.isSuccess);
    setLoading(false);
    if (!response.isSuccess) {
      console.info(response.data?.message);
    }
    setData(response.data);
    return response;
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
