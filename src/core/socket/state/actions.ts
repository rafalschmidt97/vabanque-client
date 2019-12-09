import { GameSettings, code, gameId, accessToken } from './types';
import { Action } from 'redux';

export enum SocketActionTypes {
  Connect = '[Socket] Connect',
  Join = '[Socket] Join',
  Create = '[Socket] Create',
  Start = '[Socket] Start',
  Connected = '[Socket] Connected',
  Disconnect = '[Socket] Disconnect',
  Disconnected = '[Socket] Disconnected',
}

export class SocketConnect implements Action {
  readonly type = SocketActionTypes.Connect;
  constructor(public payload: accessToken) {}
}

export class SocketJoin implements Action {
  readonly type = SocketActionTypes.Join;
  constructor(public payload: code) {}
}

export class Create implements Action {
  readonly type = SocketActionTypes.Create;
  constructor(public payload: GameSettings) {}
}

export class Start implements Action {
  readonly type = SocketActionTypes.Start;
  constructor(public payload: gameId) {}
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
