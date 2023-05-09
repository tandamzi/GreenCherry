/* eslint no-param-reassign:"error" */
import axios from 'axios';
import { parseCookies } from 'nookies';

axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: 'http://k8C207.p.ssafy.io:5000',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
const httpForm = axios.create({
  baseURL: 'http://k8C207.p.ssafy.io:5000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// accessToken이 있을 경우 처리 headers에 삽입
http.interceptors.request.use(
  config => {
    const { accessToken } = parseCookies();

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

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
