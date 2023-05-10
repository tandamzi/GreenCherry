import axios from 'axios';

axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const httpForm = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export { httpForm };
export default http;
