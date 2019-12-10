import { Action } from 'redux';
import { Game, startedAt, Progression } from './types';

export enum GameActionTypes {
  Create = '[Game] Create',
  Join = '[Game] Join',
  Start = '[Game] Start',
  Pause = '[Game] Pause',
  Resume = '[Game] Resume',
  Leave = '[Game] Leave',
  Sync = '[Game] Sync',
  Raise = '[Game] Raise',
  Finish = '[Game] Finish',
  Disconnect = '[Game] Disconnect',
  FailedJoin = '[Game] Failed Join',
  MarkInGameAsDisconnnected = '[Game] MarkInGameAsDisconnnected',
}

export class Create implements Action {
  readonly type = GameActionTypes.Create;

  constructor(public payload: Game) {}
}

export class Join implements Action {
  readonly type = GameActionTypes.Join;

  constructor(public payload: Game) {}
}

export class Start implements Action {
  readonly type = GameActionTypes.Start;

  constructor(public payload: startedAt) {}
}

export class Pause implements Action {
  readonly type = GameActionTypes.Pause;
}

export class Resume implements Action {
  readonly type = GameActionTypes.Resume;
}

export class Leave implements Action {
  readonly type = GameActionTypes.Leave;
}

export class Sync implements Action {
  readonly type = GameActionTypes.Sync;

  constructor(public payload: Game) {}
}

export class Raise implements Action {
  readonly type = GameActionTypes.Raise;

  constructor(public payload: Progression[]) {}
}

export class Finish implements Action {
  readonly type = GameActionTypes.Finish;
}

export class Disconnect implements Action {
  readonly type = GameActionTypes.Disconnect;
}

export class FailedJoin implements Action {
  readonly type = GameActionTypes.FailedJoin;
}

export class MarkInGameAsDisconnnected implements Action {
  readonly type = GameActionTypes.MarkInGameAsDisconnnected;
}

export type GameActions =
  | Create
  | Finish
  | FailedJoin
  | Join
  | Leave
  | MarkInGameAsDisconnnected
  | Pause
  | Raise
  | Resume
  | Start
  | Sync
  | Disconnect;
