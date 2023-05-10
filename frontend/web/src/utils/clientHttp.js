import axios from 'axios';

const clientHttp = axios.create({
  baseURL: '/api',
});

export default clientHttp;
