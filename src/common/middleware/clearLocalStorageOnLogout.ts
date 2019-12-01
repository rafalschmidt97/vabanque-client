import { LogoutRequest } from './../../home/login/external-auth/types';
import { Middleware } from 'redux';
import { AuthActionTypes } from '../../core/auth/state/actions';
import localStorageService from '../../core/auth/localStorageService';
import authApi from '../../core/auth/api';

const clearLocalStorageOnLogout: Middleware = () => next => action => {
  if (action.type === AuthActionTypes.Logout) {
    const logoutRequest: LogoutRequest = {
      refreshToken: localStorageService.getRefreshToken(),
    };
    authApi.logout(logoutRequest).then(() => {
      localStorageService.clear();
      window.location.reload();
    });
  }
  next({ ...action });
};

export default clearLocalStorageOnLogout;
