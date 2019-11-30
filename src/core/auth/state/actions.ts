import { Action } from 'redux';

import { Token } from '../types';
export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  payload: Token;

  constructor(token: Token) {
    this.payload = token;
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login | Logout;
