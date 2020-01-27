import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes } from './actions';
import { AuthState } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
};

export const AuthReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.Logout: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
