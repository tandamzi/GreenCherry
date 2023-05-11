/* eslint-disable no-param-reassign */
import axios from 'axios';

import parseCookies from './parseCookies';

export default function createBFFInstance(req) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
  });

  instance.interceptors.request.use(
    async config => {
      // 클라이언트의 쿠키에서 토큰을 가져옵니다.
      const cookies = req.headers.cookie
        ? parseCookies(req.headers.cookie)
        : {};
      const { token } = cookies;
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
