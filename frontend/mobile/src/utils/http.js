import axios from 'axios';

const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

axios.defaults.withCredentials = true;
const http = axios.create({
  baseURL: SERVER_API_URL,
});

export default http;
