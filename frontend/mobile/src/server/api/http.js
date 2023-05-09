/* eslint no-param-reassign:"error" */
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: 'http://greencherry.store/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
// accessToken이 있을 경우 처리 headers에 삽입
http.interceptors.request.use(
  config => {
    const accessToken = Cookies.get('accessToken');

    if (config.headers && accessToken) {
      config.headers.Authorization = accessToken;
    }

    console.error(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const httpForm = axios.create({
  baseURL: 'http://k8C207.p.ssafy.io:5000',
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
