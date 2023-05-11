/* eslint-disable no-param-reassign */
import axios from 'axios';

import parseCookies from './parseCookies';

export default function createHttpInstance(req) {
  const instance = axios.create({
    baseURL: 'http://greencherry.store/api',
  });

  instance.interceptors.request.use(
    async config => {
      // 클라이언트의 쿠키에서 토큰을 가져옵니다.

      const token = req.headers.authorization;
      if (token) {
        // 헤더에 인증 토큰을 추가합니다.
        config.headers.Authorization = token;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
}
