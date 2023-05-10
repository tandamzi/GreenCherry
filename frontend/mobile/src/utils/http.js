/* eslint-disable no-param-reassign */
import axios from 'axios';

import parseCookies from './parseCookies';

// const http = axios.create({
//   baseURL: 'http://k8C207.p.ssafy.io:5000',
// });

export default function createHttpInstance(req) {
  const instance = axios.create({
    baseURL: 'http://greencherry.store/api',
  });

  instance.interceptors.request.use(
    async config => {
      const token = req.headers.authorization;

      if (token) {
        // 헤더에 인증 토큰을 추가합니다.
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
}
