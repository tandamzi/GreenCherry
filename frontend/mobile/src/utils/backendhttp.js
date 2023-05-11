/* eslint-disable no-param-reassign */
import axios from 'axios';

import parseCookies from './parseCookies';

export default function createHttpInstance(req) {
  const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
  const instance = axios.create({
    baseURL: SERVER_API_URL,
  });

  instance.interceptors.request.use(
    async config => {
      const token = req.headers.authorization;
      if (token) {
        // 헤더에 인증 토큰을 추가합니다.
        config.headers.Authorization = token;
        // console.log(config.headers);
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
}
