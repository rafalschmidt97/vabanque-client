import { Middleware } from 'redux';
import { AuthActionTypes } from '../../core/auth/state/actions';
import localStorageService from '../../core/auth/localStorageService';

const setTokens: Middleware = () => next => action => {
  if (action.type === AuthActionTypes.Login) {
    localStorageService.setTokens(action.payload);
  }
  next({ ...action });
};

export default setTokens;
