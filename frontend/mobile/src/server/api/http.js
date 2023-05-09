import axios from 'axios';

// axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: 'http://k8C207.p.ssafy.io:5000',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization:
      'Bearer JhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwiaWF0IjoxNjgzNTI2Mzk5LCJleHAiOjE2OTIxNjYzOTl9.xdKP9z53RZpCTlQSlykP126u-zy0fBNvqmF9BKBY2EL47SjffG48fbgzB9MIO_3b1slSv2PKErPBmy8eyVj3Ew',
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
