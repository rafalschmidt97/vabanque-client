import { LogoutRequest } from '../../home/login/external-auth/types';
import { Middleware } from 'redux';
import { AuthActionTypes } from '../../core/auth/state/actions';
import localStorageService from '../../core/auth/localStorageService';
import authApi from '../../core/auth/api';
import history from '../history';

const clearLocalStorageOnLogout: Middleware = () => next => async action => {
  if (action.type === AuthActionTypes.Logout) {
    const logoutRequest: LogoutRequest = {
      refreshToken: localStorageService.getRefreshToken(),
    };
    await authApi
      .logout(logoutRequest)
      .then(() => {
        localStorageService.clear();
        history.push('/login');
      })
      .catch(() => {
        localStorageService.clear();
        history.push('/login');
      });
  }
  next({ ...action });
};

export default clearLocalStorageOnLogout;
