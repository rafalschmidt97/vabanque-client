import { Logout } from '../core/auth/state/actions';
import { store } from '../app';
import { RefreshRequest } from '../home/login/external-auth/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import isProduction from './util/is-production';
import localStorageService from '../core/auth/localStorageService';
import authApi from '../core/auth/api';
import AppConstants from './constants';

const refreshTokenEndpoint = '/auth/refresh';
const loginEndpoint = '/auth/sign-in';
const unauthorized = 401;
const forbidden = 403;

const httpClient = axios.create({
  baseURL: isProduction ? 'https://example.com/api' : `${AppConstants.appUrl}`,
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
  async (error: AxiosError) => {
    if (error.response !== undefined) {
      if (error.response.status !== forbidden && error.response.status !== unauthorized) {
        return Promise.reject(error);
      }
    }

    if (error.config.url === refreshTokenEndpoint) {
      localStorageService.clear();
      return Promise.reject(error);
    }

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const refreshToken = localStorageService.getRefreshToken();

      if (refreshToken == null) {
        return Promise.reject(error);
      }
      const refreshRequest: RefreshRequest = {
        refreshToken: refreshToken,
      };

      removeAuthorizationHeader();

      try {
        const tokens = await authApi.refreshToken(refreshRequest);
        isAlreadyFetchingAccessToken = false;
        setAuthorizationHeader(error.config, tokens.accessToken);
        localStorageService.setTokens(tokens);
        return error.config;
      } catch (error) {
        store.dispatch(new Logout());
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

httpClient.interceptors.request.use(config => {
  const accessToken = localStorageService.getAccessToken();

  if (config.url !== refreshTokenEndpoint && config.url !== loginEndpoint && accessToken !== null) {
    setAuthorizationHeader(config, accessToken);
  }
  return config;
});

export default httpClient;
