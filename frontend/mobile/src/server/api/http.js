import axios from 'axios';

axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: 'http://k8C207.p.ssafy.io:5000',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjgyNDcwMzI2LCJleHAiOjE2OTExMTAzMjZ9.0dOcLi1Jgf5LoJzRwWSJ2JTxKCEMpxWwF86ERnyg48aYlhOqFQ_1Otg24IO5zyCuQb1DRW7TUlaYbZ9Gz_mJ-w',
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
