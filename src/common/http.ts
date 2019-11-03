import { Logout } from './../core/auth/state/actions';
import { store } from './../app';
import { RefreshRequest } from './../home/sign-in/external-auth/types';
import { Token } from './../core/auth/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import isProduction from './utils/is-production';
import localStorageService from '../core/auth/localStorageService';
import authApi from '../core/auth/api';

const refreshTokenEndpoint = 'http://localhost:8080/auth/refresh';
const forbidden = '403';

const httpClient = axios.create({
  baseURL: isProduction ? 'https://example.com/api' : 'http://localhost:8080',
});

let isAlreadyFetchingAccessToken = false;

function setAuthorizationHeader(config: AxiosRequestConfig, accessToken: string) {
  config.headers.Authorization = `Bearer: ${accessToken}`;
}

function removeAuthorizationHeader() {
  axios.defaults.headers.common = {};
  axios.defaults.headers.common.accept = 'application/json';
}

httpClient.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.code !== forbidden) {
      Promise.reject(error);
    }

    if (error.config.url === refreshTokenEndpoint) {
      localStorageService.clear();
      Promise.reject(error);
    }

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const refreshToken = localStorageService.getRefreshToken();

      if (refreshToken == null) {
        Promise.reject(error);
      }
      const refreshRequest: RefreshRequest = {
        refreshToken: refreshToken,
      };

      removeAuthorizationHeader();

      return authApi
        .refreshToken(refreshRequest)
        .then((token: Token) => {
          isAlreadyFetchingAccessToken = false;
          setAuthorizationHeader(error.config, token.accessToken);
          localStorageService.setTokens(token);
          return error.config;
        })
        .catch((error: AxiosError) => {
          Promise.reject(error);
          store.dispatch(new Logout());
        });
    }
    Promise.reject(error);
  },
);

httpClient.interceptors.request.use(
  config => {
    const accessToken = localStorageService.getAccessToken();
    if (accessToken && !isAlreadyFetchingAccessToken) {
      setAuthorizationHeader(config, accessToken);
    }
    return config;
  },
  error => Promise.reject(error),
);

export default httpClient;
