import { GameSettings, code as Code, gameId as GameId, accessToken, Ranks } from './types';
import { Action } from 'redux';

export enum SocketActionTypes {
  Connect = '[Socket] Connect',
  Connected = '[Socket] Connected',
  Create = '[Socket] Create',
  Join = '[Socket] Join',
  Start = '[Socket] Start',
  Pause = '[Socket] Pause',
  Resume = '[Socket] Resume',
  Leave = '[Socket] Leave',
  Sync = '[Socket] Sync',
  Raise = '[Socket] Raise',
  Remove = '[Socket] Remove',
  Finish = '[Socket] Finish',
  Rank = '[Socket] Rank',
  Disconnect = '[Socket] Disconnect',
  Disconnected = '[Socket] Disconnected',
}

export class Connect implements Action {
  readonly type = SocketActionTypes.Connect;
  constructor(public payload: accessToken) {}
}

export class Connected implements Action {
  readonly type = SocketActionTypes.Connected;
}

export class Create implements Action {
  readonly type = SocketActionTypes.Create;
  constructor(public payload: GameSettings) {}
}

export class Join implements Action {
  readonly type = SocketActionTypes.Join;
  constructor(public payload: Code) {}
}

export class Start implements Action {
  readonly type = SocketActionTypes.Start;
  constructor(public payload: GameId) {}
}

export class Pause implements Action {
  readonly type = SocketActionTypes.Pause;
  constructor(public payload: GameId) {}
}

export class Resume implements Action {
  readonly type = SocketActionTypes.Resume;
  constructor(public payload: GameId) {}
}

export class Leave implements Action {
  readonly type = SocketActionTypes.Leave;
  constructor(public payload: GameId) {}
}

export class Sync implements Action {
  readonly type = SocketActionTypes.Sync;
  constructor(public payload: GameId) {}
}

export class Raise implements Action {
  readonly type = SocketActionTypes.Raise;
  constructor(public payload: GameId) {}
}

export class Remove implements Action {
  readonly type = SocketActionTypes.Remove;
  constructor(public payload: GameId) {}
}

export class Finish implements Action {
  readonly type = SocketActionTypes.Finish;
  constructor(public payload: GameId) {}
}

export class Rank implements Action {
  readonly type = SocketActionTypes.Rank;
  constructor(public payload: Ranks) {}
}

export class Disconnect implements Action {
  readonly type = SocketActionTypes.Disconnect;
}

export class Disconnected implements Action {
  readonly type = SocketActionTypes.Disconnected;
}
