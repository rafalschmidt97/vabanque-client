import { LogoutRequest } from '../../home/login/external-auth/types';
import { Middleware } from 'redux';
import { AuthActionTypes } from '../../core/auth/state/actions';
import localStorageService from '../../core/auth/localStorageService';
import authApi from '../../core/auth/api';
import history from '../history';

const clearLocalStorageOnLogout: Middleware = () => next => action => {
  if (action.type === AuthActionTypes.Logout) {
    const logoutRequest: LogoutRequest = {
      refreshToken: localStorageService.getRefreshToken(),
    };
    authApi
      .logout(logoutRequest)
      .then(() => {
        localStorageService.clear();
        history.push('/');
      })
      .catch(() => {
        localStorageService.clear();
        history.push('/');
      });
  }
  next({ ...action });
};

export default clearLocalStorageOnLogout;
