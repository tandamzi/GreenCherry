/* eslint no-param-reassign:"error" */
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // Authorization: 'ABABAB',
  },
});

http.interceptors.request.use(
  config => {
    // console.log('\n\nInterceptor');
    const accessToken = Cookies.get('accessToken');
    // console.log(accessToken);
    if (config.headers && accessToken) {
      config.headers.Authorization = accessToken;
      // console.log('1 HTTP.js ' + config.headers);
      return config;
    }
    // console.log('2 HTTP.js ' + config.headers);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const httpForm = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
// accessToken이 있을 경우 처리 headers에 삽입
httpForm.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');

      if (config.headers && accessToken) {
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

export { httpForm };
export default http;
