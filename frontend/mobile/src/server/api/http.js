import axios from 'axios';

axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: 'http://k8C207.p.ssafy.io:5000',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY4MzU5NTE1MiwiZXhwIjoxNjkyMjM1MTUyfQ.Zo-sgpz98hIOfwZZR2YvD5uo6Vwnq-Ju3UNjIzSd62IxttWci-Dfmp6bqBTnk6rVu4qVd2yaxxs8y59WQuFXXw',
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
