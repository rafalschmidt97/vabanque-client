import { Action } from 'redux';

export enum SocketActionTypes {
  Connect = '[Socket] Connect',
  Join = '[Socket] Join',
  Connected = '[Socket] Connected',
  Disconnect = '[Socket] Disconnect',
  Disconnected = '[Socket] Disconnected',
}

export class SocketConnect implements Action {
  readonly type = SocketActionTypes.Connect;
  payload: string;

  constructor(accessToken: string) {
    this.payload = accessToken;
  }
}

export class SocketJoin implements Action {
  readonly type = SocketActionTypes.Join;

  payload: string;

  constructor(code: string) {
    this.payload = code;
  }
}

export class SocketConnected implements Action {
  readonly type = SocketActionTypes.Connected;
}

export class SocketDisconnect implements Action {
  readonly type = SocketActionTypes.Disconnect;
}

export class SocketDisconnected implements Action {
  readonly type = SocketActionTypes.Disconnected;
}

export type SocketActions =
  | SocketConnect
  | SocketJoin
  | SocketConnected
  | SocketDisconnect
  | SocketDisconnected;
