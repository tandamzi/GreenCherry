/* eslint-disable no-param-reassign */
import axios from 'axios';

import parseCookies from './parseCookies';

export default function createHttpInstance(req) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_API_URL}`,
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

export function createHttpFormInstance(req) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_API_URL}`,
    headers: { 'Content-Type': 'multipart/form-data' },
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
