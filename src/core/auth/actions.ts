import { Action } from 'redux';

export enum AuthActionTypes {
  SignIn = '[Auth] Sign In',
  Logout = '[Auth] Logout',
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SignIn;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions = SignIn | Logout;
