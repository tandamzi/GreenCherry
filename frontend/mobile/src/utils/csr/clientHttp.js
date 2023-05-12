import axios from 'axios';

const clientHttp = axios.create({
  baseURL: '/api',
});
const clientHttpForm = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default clientHttp;
export { clientHttpForm };
