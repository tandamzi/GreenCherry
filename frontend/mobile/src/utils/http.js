/* eslint-disable no-param-reassign */
import axios from 'axios';

const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
export default function createHttpInstance(req) {
  const instance = axios.create({
    baseURL: SERVER_API_URL,
  });

  instance.interceptors.request.use(
    async config => {
      // console.log('http.js: ' + req.cookies.token);
      const { token } = req.cookies;

      if (token) {
        // console.log('헤더에 인증 토큰을 추가합니다.');
        config.headers.Authorization = `Bearer ${token}`;
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
