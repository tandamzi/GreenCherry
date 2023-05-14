import axios from 'axios';

const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const clientHttp = axios.create({
  baseURL: '/api',
});
const clientHttpForm = axios.create({
  baseURL: SERVER_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

clientHttpForm.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('token');

      if (config.headers && accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = accessToken;
        return config;
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default clientHttp;
export { clientHttpForm };
