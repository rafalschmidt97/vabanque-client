import axios from 'axios';
import isProduction from './utils/is-production';

const httpClient = axios.create({
  baseURL: isProduction ? 'https://example.com/api' : 'http://localhost:8080',
});

httpClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer: ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default httpClient;
