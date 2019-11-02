import { Middleware } from 'redux';
import { AuthActionTypes } from '../../core/auth/state/actions';
import localStorageService from '../../core/auth/state/localStorageService';

const clearLocalStorageOnLogout: Middleware = () => next => action => {
  if (action.type === AuthActionTypes.Logout) {
    localStorageService.clear();
  }
  next({ ...action });
};

export default clearLocalStorageOnLogout;
