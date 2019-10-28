import axios from 'axios';
import isProduction from './utils/is-production';

const httpClient = axios.create({
  baseURL: isProduction ? 'https://example.com/api' : 'http://localhost:8080',
});

export default httpClient;
