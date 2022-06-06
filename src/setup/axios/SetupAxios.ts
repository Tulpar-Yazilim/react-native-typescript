export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.defaults.baseURL = 'https://localhost:3000/';

  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {accessToken},
      } = store.getState();

      if (accessToken) {
        config.headers.Authorization = accessToken;
      }

      return config;
    },
    (err: any) => {
      console.log(err);
    },
  );
  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (err: any) => {
      return err.response;
    },
  );
}
