import axios from 'axios';

axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const httpForm = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export { httpForm };
export default http;
