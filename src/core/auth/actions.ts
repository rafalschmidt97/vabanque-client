import { Action } from 'redux';

export enum AuthActionTypes {
  SignIn = '[Auth] Login',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.SignIn;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login | Logout;
