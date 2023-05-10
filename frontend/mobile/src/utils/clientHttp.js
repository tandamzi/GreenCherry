import axios from 'axios';

const LOCAL_API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;
const clientHttp = axios.create({
  baseURL: LOCAL_API_URL,
});

export default clientHttp;
