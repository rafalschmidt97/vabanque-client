import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes } from './actions';
import localStorageService from './localStorageService';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const AuthReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SignIn: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.Logout: {
      localStorageService.clear();
      return {
        ...state,
        isAuthenticated: false,
      };
    }
  }

  return state;
};
