import axios from 'axios';
import isProduction from './utils/is-production';

const httpClient = axios.create({
  baseURL: isProduction ? 'https://example.com/api' : 'http://localhost:5000',
});

export default httpClient;
