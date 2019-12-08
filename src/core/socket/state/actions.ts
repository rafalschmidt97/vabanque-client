import { Code, GameSettings } from './types';
import { Action } from 'redux';

export enum SocketActionTypes {
  Connect = '[Socket] Connect',
  Join = '[Socket] Join',
  Create = '[Socket] Create',
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

  payload: Code;

  constructor(payload: Code) {
    this.payload = payload;
  }
}

export class Create implements Action {
  readonly type = SocketActionTypes.Create;

  payload: GameSettings;

  constructor(payload: GameSettings) {
    this.payload = payload;
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
